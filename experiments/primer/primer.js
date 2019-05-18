import React  from 'react'
import dryRender from './dryrender'

const PrimerContext = React.createContext(null)
let durableStates = [];

export function usePrimer(){
    return React.useContext(PrimerContext)
}

export class Primer extends React.Component {
    
    componentDidMount(){
        if(this.state && this.state.path){
            delKV(durableStates, this.state.path)
        }
    }

    render(){
        let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current

        if(!this.state){
            console.log('creating state', durableStates)
            let path = getFiberPath(rootFiber),
                state = getKV(durableStates, path)

            if(state !== undefined){
                this.state = state
            }else{
                this.state = {
                    fields: {},
                    data: {},
                    path: path
                }
                setKV(durableStates, path, this.state)
            }
        }

        let state = this.state;
        if(state.fetching) throw state.fetching;
        let client = this.props.client;
        let triggerUpdate = () => this.setState({ })


        let query;
        if(state.inception){
            query = field => {
                state.fields[field] = 1
                if(field in state.data) return state.data[field];
                return 'hi'
            }
        }else{
            query = field => {
                if(field in state.data) return state.data[field];
                console.log('cache miss', state.data, field)
                if(!state.fetching){
                    state.fields = {}
                    state.inception = true;
                    console.groupCollapsed('dry render')
                    dryRender(elementFromFiber(rootFiber), rootFiber)    
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
        // on cache misses. generally you do not want to use this. 
        query.peek = field => state.data[field];
        
        let children;
        // children can be a function (render prop) or ordinary jsx
        if(typeof this.props.children === 'function'){
            // use an external runner component so that it can read contexts from within
            children = <Runner query={query}>{this.props.children}</Runner>
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

        if(this.props.fallback === null){
            // if we're explicitly disabling the automatic suspense boundary
            return children
        }else{
            // let fallback = this.props.fallback || ;
            let fallback;

            if(this.props.fallback){
                fallback = this.props.fallback;
            }else{
                fallback = <div>Loading (default)...</div>
            }

            return <React.Suspense fallback={fallback} >{
                children
            }</React.Suspense>
        }
        
    }
}

export default Primer;


function elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}


function Runner(props){
    return props.children(props.query)
}

function getFiberPath(fiber){
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
    return <React.Suspense fallback={
        <PrimerContext.Consumer>{
            query => <PrimerContext.Provider value={field => {
                if(field === '_loading') return true;
                return query.peek(field) || null
            }}>
                {props.children}
            </PrimerContext.Provider>
        }</PrimerContext.Consumer>
    }>{props.children}</React.Suspense>
}

