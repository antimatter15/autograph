# WIP Query API

Hooks and functional components.

- This is "ideal" but it requires us to do weird stuff like the `useStateDurable` pseudo-hook

```
function App(){
    let query = useAutograph()
    let data = query.findPerson({ id: 42 })
    return <div>{data.first_name} {data.last_name}</div>
}

ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
    <App />
</Suspense>, document.getElementById('root'))
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

















