// higher order components with class decorator
@AutographHOC2(GQL.url)
class App extends React.Component {
    render(){
        let Query: GQL.Query = (this.props as any).Query;
    }
}


// higher order components with function call
const AutographApp = AutographHOC(GQL.url)(App)
ReactDOM.render(<AutographApp />, document.getElementById('root'))



// render prop without jsx 
ReactDOM.render(withAutograph(GQL.url, Query => <App Query={Query} />), document.getElementById('root'))



// render prop at top level render
ReactDOM.render(<Autograph url={GQL.url} render={
    Query => <App Query={Query as GQL.Query} />} />, document.getElementById('root'))


// function child at top level render
ReactDOM.render(<Autograph url={GQL.url}>{
    Query => <App Query={Query as GQL.Query} />
}</Autograph>, document.getElementById('root'))


// inline function child
function App(){
    return <Autograph url={GQL.url}>{
        (Query: GQL.Query) => <div></div>
    }</Autograph>
}



// inline render prop
function App(){
    return <Autograph
        url={GQL.url}
        render={(Query: GQL.Query) => <div></div>} />
}
