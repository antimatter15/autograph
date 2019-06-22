# WIP Query API

Hooks and functional components:

- This is the simplest way with hooks. 
- tends to encourage code with lots of autograph roots, which is potentially a bad thing?
- explicit about suspense boundaries and fallbacks

```
function App(){
    let query = useAutograph(URL)
    let data = query.findPerson({ id: 42 })
    return <div>{data.first_name} {data.last_name}</div>
}

ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
    <App />
</Suspense>, document.getElementById('root'))
```

Render prop (with implicit Suspense):

- This is a common react idiom used in things like Apollo
- No need to explicitly stick a suspense element as the autograph root is implicitly within a suspense wrapper (can disable by passing `fallback={null}`). 

```
ReactDOM.render(
    <Autograph client={URL} fallback={<div>Loading...</div>}>{
        query => {
            let data = query.findPerson({ id: 42 })
            return <div>{data.first_name} {data.last_name}</div>
        }
    }</Autograph>, document.getElementById('root'))
```

Autograph context provider:

- this is familiar to people who use Redux
- this is somewhat similar aesthetically to the hooks and functional components API
- works for react 16.7 as it doesn't require hooks

```
function App(){
    let query = useContext(Autograph.Context)
    let data = query.findPerson({ id: 42 })
    return <div>{data.first_name} {data.last_name}</div>
}
ReactDOM.render(
    <Autograph client={URL} fallback={<div>Loading...</div>}>
        <App />
    </Autograph>, document.getElementById('root'))
```


















Explicit autograph root and contexts.

- This is nice because we don't need to use `useStateDurable`

```
function App(){
    let query = useAutograph()
    let data = query.findPerson({ id: 42 })
    return <div>{data.first_name} {data.last_name}</div>
}

ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
    <Autograph><App /></Autograph>
</Suspense>, document.getElementById('root'))
```

Autograph with embedded Suspense + Hooks

- Since we almost always need a suspense with our autograph root, we can combine them together.

```
    function App(){
        let query = useAutograph()
        let data = query.findPerson({ id: 42 })
        return <div>{data.first_name} {data.last_name}</div>
    }

    ReactDOM.render(<Autograph fallback={<div>Loading...</div>}>
        <App />
    </Autograph>, document.getElementById('root'))
```

Autograph with embedded Suspense + Class

    class App extends React.Component {
        static contextType = Autograph.Context;
        render(){
            let query = this.context;
            let data = query.findPerson({ id: 42 })
            return <div>{data.first_name} {data.last_name}</div>
        }
    }

    ReactDOM.render(<Autograph fallback={<div>Loading...</div>}>
        <App />
    </Autograph>, document.getElementById('root'))


Autograph Class HOC

    @withAutograph()
    class App extends React.Component {
        render(){
            let query = this.props.query;
            let data = query.findPerson({ id: 42 })
            return <div>{data.first_name} {data.last_name}</div>
        }
    }
    ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
        <App />
    </Suspense>, document.getElementById('root'))


Autograph, with optional builtin Suspense?

    <Autograph>{query => }</Autograph>
    <Autograph fallback={<div>Loading...</div>}>{query => }</Autograph>
    <Suspense fallback={<div>Loading...</div>}><Autograph fallback={null}>{query => }</Autograph></Suspense>


    <Autograph context={AutographContext}><App /></Autograph>
    <Autograph>{query => <AutographContext.Provider value={query}><App /></AutographContext.Provider>}</Autograph>








## Autograph 6/1/2019

    let client = Autograph.createClient(URL or Apollo Client or Urql Client, Schema Object [optional])

    <AutographProvider client={client}><App /></AutographProvider>


    <Autograph>{Query => ...}</Autograph>

    let Query = useAutograph()

    @withAutograph

## Handling loading

Perhaps we can detect when we're reading from `Query._loading`. in that case when we are fetching instead of suspending, we actually do render stuff. 


- oh no we're missing data
- do a dry render
- find out that we've accessed `_loading` 
- trigger a rerender where `_loading` is true
- if we still try to retrieve forbidden/unloaded data then maybe we actually suspend?


## Inline Fallback

    <InlineFallback><Component /></InlineFallback>
    @withInlineFallback

- this allows an element to handle its loading. it can be used with decorators/higher order components

unlike the weird former thing it's properly scoped... 

Well to be totally fair neither is this one in pretty much the same way. If your siblings are missing a fallback or a suspense handler then you also don't have one...

Not having suspense is an interesting idea...





