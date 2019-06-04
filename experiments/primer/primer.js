import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)
let durableStates = [];

export function usePrimer(loadingGroup, enableSuspense){
    let handle = React.useContext(PrimerContext);

    let [ version, setVersion ] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion(k => k + 1)
        handle.register(loadingGroup, update)
        return () => {
            handle.unregister(loadingGroup, update)
        }
    }, [])

    return field => handle.get(field, loadingGroup, enableSuspense)
}

// TODO: think about what happens if `client` changes
// TODO: think about how to deal with errors in rendering
// TODO: think about how to deal with errors in fetching

export class Primer extends React.Component {
    constructor(props){
        super()

        if(!props.client.state) 
            props.client.state = {
                queries: {

                },
                inception: false
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
        let galaxy = client.state;
        let handle;

        function getGroup(loadingGroup){
            if(!(loadingGroup in galaxy.queries)){
                galaxy.queries[loadingGroup] = {
                    fields: {},
                    lastFields: {},
                    data: {},
                    callbacks: [],
                    error: null,
                    initial: true
                }
            }
            return galaxy.queries[loadingGroup]
        }

        if(galaxy.inception){
            handle = {
                register(){},
                unregister(){},
                get: (field, loadingGroup = 'default') => {
                    if(field === '_virtual') return true;

                    let state = getGroup(loadingGroup)
                    
                    state.fields[field] = 1
                    if(field in state.data) return state.data[field];
                    if(field === '_loading') return false;
                    if(field === '_error') return null;
                    return 'hi'
                }
            }
        }else{
            // let triggerUpdate = () => this.setState({ })
            
            // THIS PART READS FROM REACT INTERNALS
            let _rootFiber = this._reactInternalFiber;

            handle = {
                register(loadingGroup, callback){
                    let state = getGroup(loadingGroup)
                    console.log('register')

                    state.callbacks.push(callback)
                },
                unregister(loadingGroup){
                    let state = getGroup(loadingGroup)
                    console.log('unregister')

                    state.callbacks = state.callbacks
                        .filter(k => k !== callback)
                },
                get: (field, loadingGroup = 'default', enableSuspense = false) => {
                    let state = getGroup(loadingGroup)

                    if(field === '_loading') return !!state.fetching;
                    if(field === '_error') return state.error;
                    if(field === '_virtual') return false;
                    if(field in state.data) return state.data[field];
                    
                    console.log('cache miss', field)

                    if(state.error){
                        if(enableSuspense){
                            throw state.error;
                        }else{
                            console.warn('not fetchign because we last recieved an error')
                            return null;
                        }
                    }

                    if(!state.fetching){
                        for(let q in galaxy.queries){
                            let query = galaxy.queries[q];
                            query.lastFields = query.fields;
                            query.fields = {}
                        }

                        galaxy.inception = true;
                        console.groupCollapsed('dry render')
                        _dryRender(_elementFromFiber(_rootFiber), _rootFiber)    
                        console.groupEnd('dry render')
                        galaxy.inception = false;

                        for(let q in galaxy.queries){
                            let query = galaxy.queries[q];
                            let triggerUpdate = () => {
                                for(let cb of query.callbacks){
                                    cb()
                                }
                            }
                            if(!shallowCompare(query.lastFields, query.fields)){
                                console.log('fetching fields', q, Object.keys(query.fields))
                                query.initial = false;
                                query.fetching = client(Object.keys(query.fields))
                                    .then(data => {
                                        query.data = data
                                        delete query.fetching
                                        triggerUpdate() // re-render dependent components
                                    })
                                    .catch(err => {
                                        query.error = err
                                        delete query.fetching
                                        triggerUpdate() // re-render dependent components
                                    })
                            }
                        }

                        if(enableSuspense){
                            throw state.fetching;
                        }else{
                            throw nextFrame()    
                        }
                        
                    }else{
                        if(enableSuspense){
                            throw state.fetching;
                        }

                        console.error('we tried to fetsh stuff that isnt loaded', field)
                        return null
                    }
                }
            }
        }


        // let children;
        // // children can be a function (render prop) or ordinary jsx
        // if(typeof this.props.children === 'function'){
        //     // use an external runner component so that it can read contexts from within
        //     children = <RenderPropeller query={query}>{this.props.children}</RenderPropeller>
        // }else{
        //     children = this.props.children;
            
        //     if(this.props.context === null){
        //         console.warn('Context is null and render prop is unused. This Autograph root does nothing.')
        //     }
        // }

        // if(this.props.context !== null){
        //     // if we aren't explicitly disabling contexts, inject a context provider into the render tree
        //     const ContextProvider = (this.props.context || PrimerContext).Provider;
        //     children = <ContextProvider value={query}>{children}</ContextProvider>
        // }

        // if(this.props.fallback !== null){
        //     // add implicit suspense boundary unless explicitly disabled
        //     let fallback = this.props.fallback || <div>Loading (default)...</div>;
        //     children = <React.Suspense fallback={fallback}>{children}</React.Suspense>
        // }

        // return children

        return <React.Suspense fallback={<div />}>
            <PrimerContext.Provider value={handle}>
                {this.props.children}
            </PrimerContext.Provider>
        </React.Suspense>
    }
}

function shallowCompare(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}

function nextFrame(){
    return new Promise(resolve => requestAnimationFrame(resolve))
}

function delay(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
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
