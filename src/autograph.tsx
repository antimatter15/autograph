import React from 'react'
import * as parser from 'graphql/language/parser'
import _dryRender, { elementFromFiber } from './dryrender/dryrender'
import makeFixedArray from './util/fixarray'
import { hashArguments, shallowCompare, nextFrame } from './util/util'
import accessLogToGraphQL, { SUCCINCT_INTROSPECTION_QUERY } from './graphql'
import convertGQLSchemaToTypescript from './typescript'
import * as eager from './util/eager'

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// console.log(React)

const AutographContext = React.createContext(null)
let lastHandleValue, lastHandlePointer

type BasicClientConfig = {
    url: string
    headers?: { [name: string]: string }
}
export class AutographBasicClient {
    config: BasicClientConfig

    constructor(config: string | BasicClientConfig) {
        if (typeof config === 'string') {
            this.config = {
                url: config,
                headers: {},
            }
        } else {
            this.config = config
        }
    }

    fetchSchema() {
        return this.fetchQuery(SUCCINCT_INTROSPECTION_QUERY).then((data) => data.__schema)
    }

    fetchQuery(query) {
        return fetch(this.config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...this.config.headers,
            },
            body: JSON.stringify({ query: query }),
        })
            .then((resp) => resp.json())
            .then((d) => d.data)
    }
}

class AutographApolloClient {
    client: any
    constructor(client) {
        this.client = client
    }

    fetchSchema() {
        return this.fetchQuery(SUCCINCT_INTROSPECTION_QUERY).then((data) => data.__schema)
    }

    fetchQuery(query) {
        let doc = parser.parse(query, {})

        return this.client
            .query({
                query: doc,
            })
            .then((resp) => {
                return resp.data
            })
    }
}

class AutographModel {
    mounted: boolean
    currentlyDryRendering: boolean
    queries: { [key: string]: AutographQuery }
    mountedFiber: any
    config: { [key: string]: any }
    lastFetchError: any

    constructor(config) {
        if (typeof config.client === 'string') {
            config.client = new AutographBasicClient(config.client)
        } else if (typeof config.client === 'object' && config.client.link && config.client.query) {
            config.client = new AutographApolloClient(config.client)
        }

        this.mounted = false
        this.currentlyDryRendering = false
        this.queries = {}
        this.mountedFiber = null
        this.config = config
    }
    mount() {
        if (this.mounted)
            throw new Error(
                'Autograph Root can only be mounted once. Either create a different root, or unmount this root first. '
            )
        this.mounted = true
    }
    unmount() {
        if (!this.mounted) throw new Error('Can not unmount— root has already been unmounted.')
        this.mounted = false
    }
    getQuery(config) {
        if (typeof config === 'string') config = { id: config }
        if (!(config.id in this.queries)) this.queries[config.id] = new AutographQuery(this, config)
        // if(!shallowEqual(this.queries[config.id].config, config))
        //     console.warn('Different loading group configurations share the same ID');
        return this.queries[config.id]
    }
    dryRender() {
        // prepare dry render
        for (let query of Object.values(this.queries)) {
            query.lastDeps = query.deps
            query.deps = {}
        }
        // execute the dry render
        this.currentlyDryRendering = true
        console.groupCollapsed('Dry Render')
        eager.explore(() => {
            _dryRender(elementFromFiber(this.mountedFiber), this.mountedFiber)
        })
        console.groupEnd()
        lastHandleValue = null
        lastHandlePointer = null
        this.currentlyDryRendering = false

        // fetch what needs to be fetched
        for (let query of Object.values(this.queries)) {
            if (!(JSON.stringify({ type: 'FEAT', name: '_error' }) in query.deps)) {
                console.warn(
                    `It appears that the query "${query.config.id}" does not include an error handler.`
                )
            }
            if (!shallowCompare(query.deps, query.lastDeps)) {
                query.refetch()
            } else {
                console.log('no need to update query')
            }
        }
    }
}

class AutographQuery {
    root: AutographModel
    config: { [key: string]: any }
    callbacks: (() => void)[]
    dataPromise: null | Promise<any>
    dataError: null | any
    data: any

    deps: { [key: string]: any }
    lastDeps: { [key: string]: any }
    version: number

    constructor(root, config) {
        this.root = root
        this.config = config
        this.callbacks = []

        this.dataPromise = null
        this.dataError = null
        this.data = null

        // these are the fields that we need to fetch
        this.deps = {}
        this.lastDeps = {}

        this.version = 1
    }

    subscribe(callback) {
        this.callbacks.push(callback)
        // console.log('subscribe', this.callbacks.length)

        // trigger subscription callback when it mounts
        // because sometimes we have notify-notify-subscribe
        // and then the app never updates.

        // this isn't ideal because it means additional rendering
        // which isn't great if it's not really necessary.
        // requestAnimationFrame(callback)
    }

    unsubscribe(callback) {
        this.callbacks = this.callbacks.filter((k) => k !== callback)
        // console.log('unsubscribe', this.callbacks.length)

        // TODO: consider destroying query when all subscribers have gone
    }

    notify() {
        this.version++
        // console.log('notify', this.callbacks.length)
        for (let cb of this.callbacks) cb()
    }

    get client() {
        let config = { ...this.root.config, ...this.config }
        if (!config.client) {
            throw new Error('No client defined either on query config or root config')
        }
        return config.client
    }

    refetch() {
        let gql = accessLogToGraphQL(this.deps)
        console.groupCollapsed('GraphQL Query')
        console.log(gql)
        console.groupEnd()
        this.version++
        this.dataPromise = this.client
            .fetchQuery(gql)
            .then((data) => {
                this.data = data
                this.dataPromise = null
                this.notify()
            })
            .catch((err) => {
                this.dataError = err
                this.dataPromise = null
                this.notify()
            })
    }

    createHandle(
        handleOptions: {
            error?: boolean
            // suspense?: boolean
            boundary?: boolean
        } = {}
    ) {
        if (handleOptions === true) {
            handleOptions = { boundary: true }
        }

        // get the graphql query root
        let queryRoot = { kind: '__NOSCHEMA' }
        if (this.client.schemaData) {
            let schema = this.client.schemaData
            queryRoot = schema.types.find((k) => k.name === schema.queryType.name)
        }

        if (this.root.currentlyDryRendering) {
            return this._createAccessor(this.deps, queryRoot, {
                isDry: true,
                handleOptions,
                version: this.version,
            })
        } else {
            if (!this.client.schemaData && !this.client.schemaPromise && !this.client.schemaError) {
                this.version++
                this.client.schemaPromise = new Promise((resolve) => {
                    this.client
                        .fetchSchema()
                        .then((data) => {
                            console.groupCollapsed('TypeScript Schema')
                            console.log(convertGQLSchemaToTypescript(data))
                            console.groupEnd()

                            this.client.schemaData = data
                            this.client.schemaPromise = null
                            this.notify()
                            resolve()
                        })
                        .catch((err) => {
                            this.client.schemaError = err
                            this.client.schemaPromise = null
                            this.notify()
                            resolve()
                        })
                })
            }

            // always load schema with suspense
            // because otherwise our loading indicators
            // can't generally be used in conjunction with later updates
            if (this.client.schemaPromise) {
                throw this.client.schemaPromise
            }
            if (handleOptions.error && this.client.schemaError) {
                throw this.client.schemaError
            }
            if (handleOptions.error && this.dataError) {
                throw this.dataError
            }
            return this._createAccessor(this.data, queryRoot, {
                isDry: false,
                handleOptions,
                version: this.version,
            })
        }
    }

    _createAccessor(data, type, state, path: Array<string> = []) {
        // this allows directives to work
        let obj = this.__createAccessor(data, type, state, path)
        if (state.isDry) {
            lastHandleValue = obj
            lastHandlePointer = data
        }
        return obj
    }
    __createAccessor(data, type, state, path) {
        let schema = this.client.schemaData
        let { isDry, handleOptions, version } = state

        const subpath = (obj) => {
            if (isDry) {
                let key = JSON.stringify(obj)
                return data[key] || (data[key] = {})
            } else {
                if (data) {
                    if (obj.type === 'AS') {
                        let n = {}
                        for (let key in data) {
                            if (key.startsWith('__AS_' + obj.name)) {
                                n[key.slice(key.indexOf('___') + 3)] = data[key]
                            }
                        }
                        return n
                    } else if (obj.type === 'PROP') {
                        return data[obj.name]
                    } else if (obj.type === 'METHOD') {
                        return data[obj.name + '___' + hashArguments(obj.args)]
                    }
                }

                return undefined
            }
        }

        const isQueryRoot = type.kind === '__NOSCHEMA' || schema.queryType.name === type.name

        if (!isDry) ensureDuringRender()

        if (!isDry && data === undefined && !isQueryRoot) {
            if (handleOptions.cacheOnly) return null

            if (!this.dataPromise) {
                this.root.dryRender()
                if (!this.dataPromise) {
                    console.log(data, type)
                    throw new Error('Some sort of rendering or query generation problem!')
                }
            }

            // if we go from not-loading to loading then we abort the current render
            // and then try again immediately (with the appropriate query loading state
            // configured). otherwise we suspend for the duration of the data fetching
            // process because that means we're trying to use suspense. this allows us
            // to use both the classic `query._loading` style guards as well as the
            // loading guards and falling back to suspense

            this.root.lastFetchError = new Error(
                `No loading boundary found while fetching query.${path.join(
                    '.'
                )}. This may cause the entire application to unmount while the data is loading. To fix this consider adding one of the following: \n\n` +
                    `\n` +
                    `Add a loading guard to a component before you access data: 
            if(query._loading) return <div>Loading...</div>\n\n` +
                    `Add an inline Loading placeholder around a certain subtree: 
            <Loading fallback={<div>Loading...</div>}>{() => }</Loading>\n\n` +
                    `Wrap your component in a suspense boundary: 
            <React.Suspense fallback={<div>Loading...</div>}></React.Suspense>\n`
            )

            if (this.version !== version) {
                throw nextFrame()
            } else {
                throw this.dataPromise
            }
        }

        if (!isDry && data === null && !isQueryRoot) {
            return null
        }

        if (type.kind === 'INTERFACE' || type.kind === 'OBJECT' || isQueryRoot) {
            let handle = {}

            if (schema) {
                let sub = schema.types.find((k) => k.name === type.name)
                if (!sub) throw new Error(`Unable to find type "${type.name}" in schema.`)

                for (let field of sub.fields) {
                    if (field.args.length === 0) {
                        if (!isDry && subpath({ type: 'PROP', name: field.name }) !== undefined) {
                            let next = subpath({ type: 'PROP', name: field.name })
                            handle[field.name] = this._createAccessor(next, field.type, state, [
                                ...path,
                                field.name,
                            ])
                        } else {
                            Object.defineProperty(handle, field.name, {
                                // configurable: true,
                                get: () => {
                                    let next = subpath({ type: 'PROP', name: field.name })
                                    return this._createAccessor(next, field.type, state, [
                                        ...path,
                                        field.name,
                                    ])
                                },
                            })
                        }
                    } else {
                        let run = (args) => {
                            let next = subpath({
                                type: 'METHOD',
                                name: field.name,
                                args: args || {},
                            })
                            return this._createAccessor(next, field.type, state, [
                                ...path,
                                field.name,
                            ])
                        }

                        const SHOW_ARGUMENTS_DEV = true

                        if (SHOW_ARGUMENTS_DEV) {
                            let argStr = `{${field.args
                                .map((k) => k.name)
                                // ensure that the names are within graphql spec to guard against code injection
                                // security issues
                                .filter((k) => /^[_A-Za-z][_0-9A-Za-z]*$/.test(k))
                                .join(', ')}}`
                            handle[field.name] = eval(
                                `(function(${argStr}={}){ return run(arguments[0])} )`
                            )
                        } else {
                            handle[field.name] = run
                        }
                    }
                }

                if (sub.kind === 'INTERFACE') {
                    for (let type of schema.types) {
                        if (type.kind !== 'OBJECT') continue
                        if (!type.interfaces.some((k) => k.name === sub.name)) continue

                        Object.defineProperty(handle, 'as' + type.name, {
                            get: () => {
                                let next = subpath({ type: 'AS', name: type.name })
                                return this._createAccessor(next, type, state, [
                                    ...path,
                                    'as' + type.name,
                                ])
                            },
                        })
                    }
                }

                Object.defineProperty(handle, '__typename', {
                    enumerable: false,
                    value: type.name,
                    // get: () => {
                    //     if(isDry){
                    //         subpath({ type: 'PROP', name: '__typename' }).__get = true;
                    //     }
                    //     return type.name
                    // }
                })
            }

            if (isQueryRoot) {
                // allow functions to distinguish between the dry run and the real execution
                // for instance to specifically gate side effects
                Object.defineProperty(handle, '_dry', {
                    enumerable: false,
                    value: isDry,
                })

                Object.defineProperty(handle, '_loading', {
                    enumerable: false,
                    value: isDry
                        ? // if we are in a dry run and we haven't loaded our schema,
                          // we set loading to true so we don't hit some sort of
                          // error because we don't know which fields to create
                          !!this.client.schemaPromise
                        : // we are either loading the schema or the data for this query
                          !!(this.client.schemaPromise || this.dataPromise),
                })

                // we may have to deal with either schema or data errors

                if (isDry) {
                    Object.defineProperty(handle, '_error', {
                        enumerable: false,
                        get() {
                            data[JSON.stringify({ type: 'FEAT', name: '_error' })] = true
                            return null
                        },
                    })
                } else {
                    Object.defineProperty(handle, '_error', {
                        enumerable: false,
                        value: this.client.schemaError || this.dataError,
                    })
                }

                Object.defineProperty(handle, '_data', {
                    enumerable: false,
                    value: this.data,
                })
            }

            return Object.freeze(handle)
            // For developer experience, delete the getters after the render process
            // has been completed?

            // We could use proxies as well, but proxies get displayed in the
            // chrome console in an ugly way, so that defeats the point

            // Nevermind this doesn't work because some component might later
            // access a field that should trigger a re-render...
            // setTimeout(() => {
            //     for(let prop of Object.getOwnPropertyNames(handle)){
            //         let desc = Object.getOwnPropertyDescriptor(handle, prop);
            //         if(desc.get) delete handle[prop];
            //     }
            // }, 0)
            // return handle
        }

        if (type.kind === 'NON_NULL') return this._createAccessor(data, type.ofType, state, path)

        if (!isDry) {
            // if there is data then we return it
            if (type.kind === 'LIST') {
                return data.map((x) => this._createAccessor(x, type.ofType, state, path))
            }
            return data
        } else {
            if (type.kind === 'LIST')
                return makeFixedArray([this._createAccessor(data, type.ofType, state, path)])
            if (type.kind === 'UNION') {
                let sub = schema.types.find((k) => k.name === type.name)
                if (!sub) throw new Error(`Unable to find type "${type.name}" in schema.`)
                return this._createAccessor(data, sub.possibleTypes[0], state, path)
            }

            data.__get = true
            if (type.name === 'ID') return 'Autograph ID'
            if (type.name === 'String') return 'Autograph String'
            if (type.name === 'Int') return 42
            if (type.name === 'Float') return 17.76
            if (type.name === 'Boolean') return true

            if (type.kind === 'ENUM') {
                let sub = schema.types.find((k) => k.name === type.name)
                if (!sub) throw new Error(`Unable to find type "${type.name}" in schema.`)
                return sub.enumValues[0].name
            }
            if (type.kind === 'SCALAR') return { __gqlScalarName: type.name }
            throw new Error(`Unable to handle ${type.kind} named "${type.name}"`)
        }
    }
}

function ensureDuringRender() {
    const OwnerRef = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentOwner
    if (!OwnerRef.current) {
        // console.log(console.log(new Error))
        if (/beginWork|performUnitOfWork|renderRoot/.test(new Error().stack!.toString())) {
            throw new Error(
                'Autograph query can only be navigated within a react render! You may have multiple versions of React running on this page.'
            )
        }
        throw new Error('Autograph query can only be navigated within a react render!')
    }
}

// graphql query directive helper
export function Directive(directive_string, value) {
    if (lastHandlePointer) {
        if (value === lastHandleValue) {
            // do something with lastHandlePointer
            lastHandlePointer.__directive = directive_string
        } else {
            console.warn(
                'The Autograph directive helper Directive("@client", value) ' +
                    'must be applied directly to an Autograph value without any intervening ' +
                    'logic or variables. \n Good: Directive("@client", query.field.stuff) \n ' +
                    'Bad: let x = query.field.stuff; Directive("@client", x)'
            )
        }
    }
    return value
}

// Essentially the same thing as the <Loading> render prop but with a slightly different API
export function Get(fn: () => any, defaultValue: any = undefined): any {
    if (typeof fn !== 'function') {
        throw new Error(
            `The first argument to "Get" should be a function (with no arguments) returning some value.`
        )
    }
    try {
        return fn()
    } catch (err) {
        if (err instanceof Promise) {
            return defaultValue
        } else {
            throw err
        }
    }
}

// <Loading>{() => }</Loading>
// Functionally it's a micro-suspense boundary
export function Loading(props: {
    children: () => JSX.Element
    fallback?: JSX.Element
}): JSX.Element {
    return Get(props.children, props.fallback || <div>Loading...</div>)
}

export function Eager(x: boolean): boolean {
    return eager.eager(x)
}

function RootSuspenseFallback({ root }) {
    let initialMount = !root.mounted
    React.useEffect(() => {
        // Ignore the fallback on the initial mount.
        if (initialMount) return undefined

        // The root fallback mounts when the user has
        // failed to manually specify some loading behavior
        // for some component or subtree. Here we should
        // surface which component led to this problem.
        let t = setTimeout(() => {
            console.warn(root.lastFetchError)
        }, 0)

        // React may quickly mount and subsequently
        // unmount a loading fallback. When this happens
        // a loading handler is being specified.
        return () => clearTimeout(t)
    })
    return <div />
}

// Provider
export function createRoot(config): any {
    let root = new AutographModel(config)

    class AutographRootComponent extends React.Component {
        componentDidMount() {
            root.mount()
        }
        componentWillUnmount() {
            root.unmount()
        }
        render() {
            if (!root.currentlyDryRendering) {
                root.mountedFiber = (this as any)._reactInternalFiber
                // console.log(root.mountedFiber)
            }
            // return React.createElement(React.Suspense, { fallback: "Loading..." },
            //     React.createElement(AutographContext.Provider, { value: root } as any,
            //         this.props.children))

            return (
                <React.Suspense fallback={<RootSuspenseFallback root={root} />}>
                    <AutographContext.Provider value={root as any}>
                        {this.props.children}
                    </AutographContext.Provider>
                </React.Suspense>
            )
        }
    }

    ;(AutographRootComponent as any)._root = root
    return AutographRootComponent
}

// Hook
export function useQuery(config = 'default', handleOptions: any = {}) {
    let root: AutographModel = React.useContext(AutographContext) as any
    if (!root)
        throw new Error(
            'Unable to read Autograph context value. Did you forget to add an Autograph provider to your React tree?'
        )

    let query = root.getQuery(config)
    let originalVersion = query.version
    let [version, setVersion] = React.useState(0)
    React.useEffect(() => {
        let update = () => setVersion((k) => k + 1)
        query.subscribe(update)
        if (query.version !== originalVersion) {
            // console.warn('Needed to do an additional render to catch up on stuff')
            update()
        }
        return () => query.unsubscribe(update)
    }, [])
    return query.createHandle(handleOptions)
}

// Render Prop
export class Query extends React.Component<
    {
        config?: any
        children: (e: any) => JSX.Element
        handleOptions?: any
    },
    {
        version: number
    }
> {
    update: any
    lastVersion: number
    static defaultProps = {
        config: 'default',
    }
    constructor(props) {
        super(props)
        this.state = { version: 0 }
        this.update = () => this.setState((s) => ({ version: s.version + 1 }))
    }
    getQuery() {
        if (!this.context) {
            throw new Error(
                'Unable to read Autograph context value. Did you forget to add an Autograph provider to your React tree?'
            )
        }
        return this.context.getQuery(this.props.config)
    }
    componentDidMount() {
        let query = this.getQuery()
        query.subscribe(this.update)
        if (query.version !== this.lastVersion) {
            // console.warn('Needed to do an additional render to catch up on stuff')
            this.update()
        }
    }
    componentWillUnmount() {
        this.getQuery().unsubscribe(this.update)
    }
    render() {
        let query = this.getQuery()
        this.lastVersion = query.version
        return this.props.children(query.createHandle(this.props.handleOptions))
    }
}
Query.contextType = AutographContext

// HOC
export function withQuery(config = 'default', handleOptions) {
    // let mapper = [...arguments].reverse().find(k => typeof k === 'function')
    return function(BaseComponent) {
        function WithQuery(props) {
            return (
                <Query config={config} handleOptions={handleOptions}>
                    {(query) => <BaseComponent {...props} query={query} />}
                </Query>
            )
            // return React.createElement(Query, { config: config, handleOptions: handleOptions },
            //     query => React.createElement(BaseComponent, { ...props, query: query }))
        }
        return WithQuery
    }
}
