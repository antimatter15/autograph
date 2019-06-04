import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)


export function usePrimer(loadingGroup, enableSuspense){
    let handle = React.useContext(PrimerContext);

    let [ version, setVersion ] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion(k => k + 1)
        handle.subscribe(loadingGroup, update)
        return () => {
            handle.unsubscribe(loadingGroup, update)
        }
    }, [])

    return field => handle.get(field, loadingGroup, enableSuspense)
}




// TODO: think about what happens if `client` changes

export class Primer extends React.Component {
    constructor(props){
        super()

        if(!props.client.state) 
            props.client.state = {
                queries: { },
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
                }
            }
            return galaxy.queries[loadingGroup]
        }

        if(galaxy.inception){
            handle = {
                subscribe(){},
                unsubscribe(){},
                get: (field, loadingGroup = 'default') => {
                    if(field === '_dry') return true;
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
                subscribe(loadingGroup, callback){
                    let state = getGroup(loadingGroup)

                    state.callbacks.push(callback)
                },
                unsubscribe(loadingGroup){
                    let state = getGroup(loadingGroup)

                    state.callbacks = state.callbacks
                        .filter(k => k !== callback)
                },
                get: (field, loadingGroup = 'default', enableSuspense = false) => {
                    let state = getGroup(loadingGroup)

                    if(field === '_loading') return !!state.fetching;
                    if(field === '_error') return state.error;
                    if(field === '_dry') return false;
                    if(field in state.data) return state.data[field];
                    
                    console.log('cache miss', field)

                    if(state.error){
                        if(enableSuspense){
                            throw state.error;
                        }else{
                            console.warn('not fetching because we last recieved an error')
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

                        // TODO: consider removing queries/loading groups if they do not
                        // show up during the dry render. otherwise we risk a potential
                        // memory leak....

                        for(let q in galaxy.queries){
                            let query = galaxy.queries[q];
                            let triggerUpdate = () => {
                                for(let cb of query.callbacks){
                                    cb()
                                }
                            }
                            if(!shallowCompare(query.lastFields, query.fields)){
                                console.log('fetching fields', q, Object.keys(query.fields))
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

                        console.error('we tried to fetch stuff that isnt loaded', field)
                        return null
                    }
                }
            }
        }

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

export default Primer;

function _elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}
