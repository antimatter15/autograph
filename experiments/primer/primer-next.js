import React  from 'react'
import _dryRender from './dryrender'

const PrimerContext = React.createContext(null)


class PrimerClient {
    inception = false;
    mounted = false;
    loadingGroups = {};
    rootFiber = null;
    options = {};
    
    mount(){
        if(this.mounted) throw new Error('already mounted!');
        this.mounted = true;
    }
    unmount(){
        if(!this.mounted) throw new Error('not mounted!');
        this.mounted = false;
    }
    getLoadingGroup(id){
        if(!(id in this.loadingGroups))
            this.loadingGroups[id] = new PrimerLoadingGroup();
        return this.loadingGroups[id]
    }
    refetch(){
        // prepare dry render
        for(let loadingGroup of Object.values(this.loadingGroups)){
            loadingGroup.lastFields = loadingGroup.fields;
            loadingGroup.fields = {}
            loadingGroup.options = {}
        }

        // execute the dry render
        this.inception = true;
        console.groupCollapsed('dry render')
        _dryRender(_elementFromFiber(this.rootFiber), this.rootFiber)    
        console.groupEnd('dry render')
        this.inception = false;

        // trigger fetches for updated loading groups
        for(let loadingGroup of Object.values(this.loadingGroups)){
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
    options = {}

    constructor(client){
        this.client = client
    }

    subscribe(callback){
        this.callbacks.push(callback)
    }
    
    unsubscribe(callback){
        this.callbacks = this.callbacks.filter(k => k !== callback)
    }

    options(options = {}){
        if(this.client.inception){
            Object.assign(this.options, options)
        }
    }

    get(field, enableSuspense = false){
        if(this.client.inception){
            return this.getSentinel(field, enableSuspense)
        }else{
            return this.getActual(field, enableSuspense)
        }
    }
    getSentinel(field, enableSuspense){
        if(field === '_dry') return true;
        if(field === '_loading') return false;
        if(field === '_error') return null;

        this.fields[field] = 1
        if(field in this.data) return this.data[field];
        return 'hi'
    }
    getActual(field, enableSuspense){
        if(field === '_dry') return false;
        if(field === '_loading') return !!this.fetching;
        if(field === '_error') return this.error;
        if(field in this.data) return this.data[field];
        
        if(enableSuspense){
            if(this.error) throw state.error;
            if(!this.fetching) this.client.refetch();
            throw this.fetching;
        }else{
            if(this.error) return null;
            if(!this.fetching){
                this.client.refetch()
                throw nextFrame()
            }
            return null;
        }
    }
    refetch(){
        let options = { ...this.client.options, ...this.options };

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
    }
    changed(){
        for(let cb of this.callbacks) cb();
    }
}

// Hook
export function usePrimer(loadingGroup = 'default', enableSuspense = false, options = {}){
    let client = React.useContext(PrimerContext);
    let loadingGroup = client.getLoadingGroup(loadingGroup);
    loadingGroup.options(options)
    let [ version, setVersion ] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion(k => k + 1)
        loadingGroup.subscribe(update)
        return () => loadingGroup.unsubscribe(update)
    }, [])
    return field => loadingGroup.get(field, enableSuspense)
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
        loadingGroup.options(this.props.options)
        return this.props.children(field => loadingGroup.get(field, this.props.enableSuspense))
    }
}

// HOC
export function withPrimer(loadingGroup = 'default', enableSuspense = false, options = {}){
    return function(BaseComponent){
        function WithPrimer(props){
            return <PrimerConsumer loadingGroup={loadingGroup} enableSuspense={enableSuspense} options={options}>
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
        client.options = this.props.options;
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
