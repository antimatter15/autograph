import React  from 'react'
import _dryRender from './dryrender'

const AutographContext = React.createContext(null)
let durableStates = [];

export function useAutograph(){
    return React.useContext(AutographContext)
}


class AutographClient {
    fields = {}
    data = {}
    mounted = false
    
    mount(){
        if(this.mounted){
            throw new Error('only one client per thingy')
        }else{
            this.mounted = true;
        }
    }

    unmount(){
        if(this.mounted){
            this.mounted = false;
        }else{
            throw new Error('can not unmount when not mounted')
        }
    }

}

// TODO: think about what happens if `client` changes
// TODO: think about how to deal with errors in rendering
// TODO: think about how to deal with errors in fetching

export class Autograph extends React.Component {

    componentDidMount(){
        this.props.client.mount()
    }

    componentWillUnmount(){
        this.props.client.unmount()
    }

    componentDidUpdate(prevProps){
        if(this.props.client !== prevProps.client){
            prevProps.client.unmount()
            this.props.client.mount()
        }
    }

    render(){
        let client = this.props.client;
        // let state = client.state;
        let query;

        if(client.inception){
            query = field => {
                client.fields[field] = 1
                if(field in client.data) return client.data[field];
                return 'hi'
            }
        }else{
            let triggerUpdate = () => this.setState({ })
            
            // THIS PART READS FROM REACT INTERNALS
            let _rootFiber = this._reactInternalFiber;

            query = field => {
                if(field in client.data) return client.data[field];
                console.log('cache miss', client.data, field)
                if(!client.fetching){
                    client.fields = {}
                    client.inception = true;
                    console.groupCollapsed('dry render')
                    _dryRender(_elementFromFiber(_rootFiber), _rootFiber)    
                    console.groupEnd('dry render')
                    delete client.inception
                    client.fetching = client(Object.keys(client.fields))
                        .then(data => {
                            client.data = data
                            delete client.fetching
                            triggerUpdate() // trigger autograph root re-render with new data
                        })
                }
                throw client.fetching;
            }
        }

        // this is a way to read from the current client cache without suspending
        // on cache misses. generally you do not want to use this without being careful

        query.peek = field => client.data[field];
        
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
            const ContextProvider = (this.props.context || AutographContext).Provider;
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


export default Autograph;

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
    let Context = props.context || AutographContext;
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

