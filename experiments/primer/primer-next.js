import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)


class PrimerClient {
    inception = false;
    mounted = false;
    loadingGroups = {};
    rootFiber = null;
    config = {};

    constructor(config){
        this.config = config;
    }
    
    mount(){
        if(this.mounted) throw new Error('already mounted!');
        this.mounted = true;
    }
    unmount(){
        if(!this.mounted) throw new Error('not mounted!');
        this.mounted = false;
    }
    getLoadingGroup(config){
        if(typeof config === 'string') config = { id: config };
        if(!(config.id in this.loadingGroups))
            this.loadingGroups[config.id] = new PrimerLoadingGroup(client, config);
        if(!shallowEqual(this.loadingGroups[config.id].config, config))
            console.warn('Different loading group configurations share the same ID');
        return this.loadingGroups[config.id]
    }
    refetch(){
        // prepare dry render
        for(let loadingGroup of Object.keys(this.loadingGroups)){
            loadingGroup.lastFields = loadingGroup.fields;
            loadingGroup.fields = {}
        }

        // execute the dry render
        this.inception = true;
        console.groupCollapsed('dry render')
        _dryRender(_elementFromFiber(this.rootFiber), this.rootFiber)    
        console.groupEnd('dry render')
        this.inception = false;

        // trigger fetches for updated loading groups
        for(let loadingGroup of Object.keys(this.loadingGroups)){
            if(!shallowCompare(loadingGroup.lastFields, loadingGroup.fields)){
                loadingGroup.fetch()
            }
        }
    }
}

class PrimerLoadingGroup {
    fields = {};
    lastFields = {};
    data = {};
    callbacks = [];
    error = null;
    client = null;
    fetching = false;
    config = {};

    constructor(client, config){
        this.client = client
        this.config = config;
    }

    subscribe(callback){
        this.callbacks.push(callback)
    }
    
    unsubscribe(callback){
        this.callbacks = this.callbacks.filter(k => k !== callback)
    }

    createHandle(handleOptions = {}){
        if(handleOptions === true){
            handleOptions = { suspense: true, boundary: true }
        }
        if(this.client.inception){
            return field => this.getSentinel(field, handleOptions)
        }else{
            
            if(!schemaLoaded && !schemaFetcher){
                schemaFetcher = loadSchema()
            }
            if(handleOptions.suspense && schemaFetcher){
                throw schemaFetcher
            }
            if(handleOptions.boundary && this.error){
                throw this.error;
            }
            return field => this.getActual(field, handleOptions)
        }
    }

    getSentinel(field, handleOptions){
        if(field === '_dry') return true;
        if(field === '_loading') return false;
        if(field === '_error') return null;

        // cacheOnly means that it shouldn't be added
        // to the list of fields that are to be fetched
        
        if(!handleOptions.cacheOnly){
            this.fields[field] = 1    
        }
        
        if(field in this.data) return this.data[field];
        return 'hi'
    }
    getActual(field, handleOptions){
        if(field === '_dry') return false;
        if(field === '_loading') return !!(this.fetching || !this.schemaLoaded);
        if(field === '_error') return this.error;
        if(field in this.data) return this.data[field];
        if(this.error) return null;
        
        if(handleOptions.cacheOnly) return null;

        if(handleOptions.suspense){
            if(!this.fetching) this.client.refetch();
            throw this.fetching;
        }else{
            if(!this.fetching){
                this.client.refetch()
                throw nextFrame()
            }
            return null;
        }
    }

    refetch(){
        let config = { ...this.client.config, ...this.config };

        this.fetching = client(Object.keys(this.fields))
            .then(data => {
                this.data = data;
                this.fetching = false;
                this.changed()
            })
            .catch(err => {
                this.error = err;
                this.fetching = false;
                this.changed()
            })
    }
    changed(){
        for(let cb of this.callbacks) cb();
    }
}

// Hook
export function usePrimer(loadingGroup = 'default', handleOptions){
    let client = React.useContext(PrimerContext);
    let group = client.getLoadingGroup(loadingGroup);
    let [ version, setVersion ] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion(k => k + 1)
        group.subscribe(update)
        return () => group.unsubscribe(update)
    }, [])
    return group.createHandle(handleOptions)
}

// Render Prop
export class PrimerConsumer extends React.Component {
    static contextType = PrimerContext;
    constructor(){
        super()
        this.state = { version: 0 }
        this.update = () => this.setState(s => ({ version: s.version + 1 }))
    }
    componentDidMount(){
        let loadingGroup = this.context.getLoadingGroup(this.props.loadingGroup);
        loadingGroup.subscribe(this.update)
    }
    componentWillUnmount(){
        let loadingGroup = this.context.getLoadingGroup(this.props.loadingGroup);
        loadingGroup.unsubscribe(this.update)
    }
    render(){
        let loadingGroup = this.context.getLoadingGroup(this.props.loadingGroup);
        return this.props.children(loadingGroup.createHandle(this.props.handleOptions))
    }
}

// HOC
export function withPrimer(loadingGroup = 'default', handleOptions){
    return function(BaseComponent){
        function WithPrimer(props){
            return <PrimerConsumer loadingGroup={loadingGroup} handleOptions={handleOptions}>
                {query => <BaseComponent {...props} query={query} />}
            </PrimerConsumer>
        }
        return WithPrimer
    }
}

// Provider
export class Primer extends React.Component {
    render(){
        let client = this.props.client;
        client.rootFiber = this._reactInternalFiber;
        return <React.Suspense fallback={<div />}>
            <PrimerContext.Provider value={client}>
                {this.props.children}
            </PrimerContext.Provider>
        </React.Suspense>
    }
}


// utils

function shallowCompare(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}

function nextFrame(){
    return new Promise(resolve => requestAnimationFrame(resolve))
}

function _elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}
