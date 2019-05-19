import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)
let durableStates = [];

export function usePrimer(){
    return React.useContext(PrimerContext)
}

export class Primer extends React.Component {
    render(){
        // THIS PART READS FROM REACT INTERNALS
        let _rootFiber = this._reactInternalFiber;

        let state = _ensureDurableState(this, _rootFiber, () => ({
            fields: {},
            data: {},
        }));

        if(state.fetching) throw state.fetching;
        let query;

        if(state.inception){
            query = field => {
                state.fields[field] = 1
                if(field in state.data) return state.data[field];
                return 'hi'
            }
        }else{
            let client = this.props.client;
            let triggerUpdate = () => this.setState({ })
            query = field => {
                if(field in state.data) return state.data[field];
                console.log('cache miss', state.data, field)
                if(!state.fetching){
                    state.fields = {}
                    state.inception = true;
                    console.groupCollapsed('dry render')
                    _dryRender(_elementFromFiber(_rootFiber), _rootFiber)    
                    console.groupEnd('dry render')
                    delete state.inception
                    state.fetching = client(Object.keys(state.fields))
                        .then(data => {
                            state.data = data
                            delete state.fetching
                            triggerUpdate() // trigger autograph root re-render with new data
                        })
                }
                throw state.fetching;
            }
        }

        // this is a way to read from the current state cache without suspending
        // on cache misses. generally you do not want to use this without being careful

        query.peek = field => state.data[field];
        
        let children;
        // children can be a function (render prop) or ordinary jsx
        if(typeof this.props.children === 'function'){
            // use an external runner component so that it can read contexts from within
            children = <RenderPropeller query={query}>{this.props.children}</RenderPropeller>
        }else{
            children = this.props.children;
            
            if(this.props.context === null){
                console.warn('Context is null and render prop is unused. This Autograph root does nothing.')
            }
        }

        if(this.props.context !== null){
            // if we aren't explicitly disabling contexts, inject a context provider into the render tree
            const ContextProvider = (this.props.context || PrimerContext).Provider;
            children = <ContextProvider value={query}>{children}</ContextProvider>
        }

        if(this.props.fallback !== null){
            // add implicit suspense boundary unless explicitly disabled
            let fallback = this.props.fallback || <div>Loading (default)...</div>;
            children = <React.Suspense fallback={fallback}>{children}</React.Suspense>
        }

        return children
        
    }
    componentDidMount(){
        // after the component has been mounted for the first time, we know
        // that the state has been properly stored within the component and
        // it will not be unnecessarily throw away, so we can delete it from the
        // durable tuple-value store.
        if(this.durablePath){
            delKV(durableStates, this.durablePath)
            delete this.durablePath
        }
    }
}


export default Primer;


function _elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}


function RenderPropeller(props){
    return props.children(props.query)
}


function _ensureDurableState(instance, _rootFiber, creator){
    if(!instance.state){
        console.log('creating state', durableStates)
        let path = _getFiberPath(_rootFiber),
            state = getKV(durableStates, path)

        if(state !== undefined){
            instance.state = state
        }else{
            instance.state = creator()
            instance.durablePath = path
            setKV(durableStates, path, instance.state)
        }
    }
    return instance.state;
}


function _getFiberPath(fiber){
    let path = [];
    while(fiber.return){
        path.unshift(fiber.type, fiber.key || fiber.index)
        fiber = fiber.return;
    }
    path.unshift(fiber.stateNode)
    return path;
}


// this is basically an implementation of association lists
// with arbitrary custom predicates. this is because javascript
// maps don't support tuple keys. 

function tupleEqual(a, b){
    return a.length === b.length && a.every((k, i) => k === b[i])
}

function getKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    return index < 0 ? undefined : store[index][1]
}

function setKV(store, key, value, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store[index][1] = value;
    else store.push([ key, value ]);
}

function delKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store.splice(index, 1);
}


export function InlineFallback(props){
    let Context = props.context || PrimerContext;
    return <React.Suspense fallback={
        <Context.Consumer>{
            query => <Context.Provider value={field => {
                if(field === '_loading') return true;
                return query.peek(field) || null
            }}>
                {props.children}
            </Context.Provider>
        }</Context.Consumer>
    }>{props.children}</React.Suspense>
}

