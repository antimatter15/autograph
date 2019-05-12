# WIP Query API

Hooks and functional components.

    function App(){
        let query = useAutograph()
        let data = query.findPerson({ id: 42 })
        return <div>{data.first_name} {data.last_name}</div>
    }

    ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
        <App />
    </Suspense>, document.getElementById('root'))


Explicit autograph root and contexts.

    function App(){
        let query = useAutograph()
        let data = query.findPerson({ id: 42 })
        return <div>{data.first_name} {data.last_name}</div>
    }

    ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
        <Autograph><App /></Autograph>
    </Suspense>, document.getElementById('root'))


Autograph with embedded Suspense + Hooks


    function App(){
        let query = useAutograph()
        let data = query.findPerson({ id: 42 })
        return <div>{data.first_name} {data.last_name}</div>
    }

    ReactDOM.render(<Autograph fallback={<div>Loading...</div>}>
        <App />
    </Autograph>, document.getElementById('root'))


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



