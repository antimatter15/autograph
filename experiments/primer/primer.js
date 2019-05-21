import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)
let durableStates = [];

export function usePrimer(){
    return React.useContext(PrimerContext)
}

// TODO: think about what happens if `client` changes
export class Primer extends React.Component {
    constructor(props){
        super()

        if(!props.client.state) 
            props.client.state = {
                fields: {},
                data: {}
            };
    }

    componentDidMount(){
        let client = this.props.client;
        let state = client.state;
        if(state.mounted){
            throw new Error('only one client per thingy')
        }else{
            state.mounted = true;
        }
    }

    componentWillUnmount(){
        let client = this.props.client;
        let state = client.state;
        state.mounted = false;
    }

    render(){
        let client = this.props.client;
        let state = client.state;
        let query;

        if(state.inception){
            query = field => {
                state.fields[field] = 1
                if(field in state.data) return state.data[field];
                return 'hi'
            }
        }else{
            
            let triggerUpdate = () => this.setState({ })
            
            // THIS PART READS FROM REACT INTERNALS
            let _rootFiber = this._reactInternalFiber;

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

