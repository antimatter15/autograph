## Spongiform (October 18, 2018)

> Being a modern react developer is repetitive and repetitive. 
> You have to specify your schema once for your database. 
> Write it again as a GraphQL schema. 
> Write it again to bind your database to your GraphQL resolvers. 
> You've gotta write part of it again to define a GraphQL query. 
> And you've got to restate it in your own words in code to read from the query object. 
> And if you've decided to use TypeScript, then you've got to write everything out one more time.
> Congrats, you've basically done the same mindless and tedious task six times. 
> Might as well have some brain-eating prion disease or something.


```
function App({ user }: { user: User }){
    return <div>
        <p>Welcome, {user.name}</p>
        
        <h3>Friends, Romans, and Countrymen:</h3>
        <UserList users={user.friends} />
        
        <h3>Posts:</h3>
        <PostList posts={user.posts} />

        <h3>Photos:</h3>
        <PhotoList photos={user.photos} />
    </div>
}

renderWithData(
    <App user={Me()} />, 
    document.getElementById("root"))
```

Features:
- Typescript, including a snippet that automatically generates corresponding typescript definitions
- `renderWithData` triggers a "pseudo render" that figures out what data is needed and then renders with data once it has loaded
- Not actual GraphQL, but inspired by it


## Autograph Render Prop Experiment (October 20, 2018)

No longer needs a special `render` function, instead it's just a regular render prop component. This was largely a prototype. 

Note that Autograph does a pseudo render for each render of the main component. 


```
function App(){
    return <Autograph 
        url="https://graphql-pokemon.now.sh/graphql"
        render={
            (Query: QueryType) => 
                <Demo pokemon={Query.pokemon({ name: 'pikachu' })} />
        } />
}

function Demo({ pokemon }: { pokemon: GQL.Pokemon }){
    return <div>
        <h1>{pokemon.number} - {pokemon.name}</h1>
        <img src={pokemon.image} />
        <div>Types:</div>
        <ul>{pokemon.types.map(k => 
            <li key={k}>{k}</li>)}</ul>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
```


## Autograph Suspense Experiment (October 20, 2018)

This is the first experiment which uses React Suspense to display fallback loading indicators. 

```

function App(){
    return <Placeholder delayMs={100} fallback={<div>Loading....</div>}>
        <div>
            <h1>welcome to the async react future </h1>
            <AutographSuspense 
                url="https://graphql-pokemon.now.sh/graphql"
                render={(Query: GQL.Query) => <div>
                    {Query.pokemon({ name: 'pikachu'}).name}
                </div>}
            />
        </div>
    </Placeholder>
    
}    

ReactDOM.render(<AsyncMode><App /></AsyncMode>, document.getElementById('root'))
```


## Render Prop Children (October 21, 2018)

Switched from prop named `render` to render prop function as children. 

```
ReactDOM.render(<Autograph url={GQL.url}>{
    (Query: GQL.Query) => <App Query={Query} />
}</Autograph>, document.getElementById('root'))
```

## Higher Order Component Decorator (October 21, 2018)

```
@AutographHOC2(GQL.url)
class App extends React.Component {
    render(){
        let Query: GQL.Query = (this.props as any).Query;
    }
}
```

## Error and Loading Pseudofields (October 22, 2018)

We could even detect automatically when `__error` and `__loading` were used so that we sould only render them if we knew that they existed. 

```

    <Autograph>{
        Query => {
            if(Query.__error) return <p>Error</p>;
            if(Query.__loading) return <p>Loading</p>;
            
            return Query.rates({ currency: "USD" }).map(({ currency, rate }) => 
                <div key={currency}>
                    <p>{currency}: {rate}</p>
                </div>
            )
        }
    }</Autograph>

```

## Hooks Style Interface (October 27, 2018)

```
function App(props){
    let query: GQL.Query = useQuery(App, props)
    let block = query.block({ number: 5450945 })

    return <fieldset>
        <legend>Block {block.hash}</legend>
        <table><tbody>
            <tr><td><b>Miner</b></td><td>{block.miner.address}</td></tr>
            <tr><td><b>Number</b></td><td>{block.number}</td></tr>
        </tbody></table>
    </fieldset>
}
```


## Amb Experiment (December 25, 2018)

But, by wrapping conditionals, we can then explore all the control flow possibilities. Keep in mind that the function will be executed once for every possible configuration of the branching conditions. That means that if you have `N` independent conditionals, your function may be executed `2^N` times. Fortunately most rendering code doesn't need to branch that much. 

```
function Example({ item }){
    if(amb(state.type == 'person')){
        return <div>{item.name} ({item.age})</div>
    }else{
        return <div>{item.type}</div>
    }
}
```

## Metastate (April 30, 2019)

Features: 
- New reimplementation of fiber internals allows it to read from react hooks and child component state.
- New small prototype meant to serve as a general API test platform (not real GraphQL)
- Based on React Hooks

```

function Widget(){
    let data = useMetastate(cachedFetcher);
    let [ count, setCount ] = useState(0)

    return <div>
        <button onClick={e => setCount(count + 1)}>
            + Increment {data.get(count)}
        </button>
    </div>
}

```

## Lazy Metastate (May 3, 2019)

Features:
- Switched implementation to be lazy o that no virtual renders have to be done until it detects that it's missing data
- This means that most of the time the app is rendered, no virtual render has to take place


## Builtin Suspense API (May 17, 2019)


    <Autograph>{query => }</Autograph>
    <Autograph fallback={<div>Loading...</div>}>{query => }</Autograph>
    <Suspense fallback={<div>Loading...</div>}><Autograph fallback={null}>{query => }</Autograph></Suspense>



## Durable State (May 17, 2019)

For many data fetching tasks we would like to store a per instance cached value inside the state of a component instance. however, this is not possible with Suspense because if the render is aborted, the state is never stored, and it is impossible for components to then interact with a previous version of itself.

Durable State is a special react hook that stores data in an external cache and reads fields from the react internals to maintain consistency.


## Inline Fallbacks (May 18, 2019)

```
<InlineFallback>
    <LoadingDemo />
</InlineFallback>
```


## Minimal External State (May 21, 2019)

Durable state was then removed on May 17 in favor of a simpler persistence scheme.

```
const agClient = Autograph.createClient(URL)

ReactDOM.render(<Autograph.Provider client={agClient}>
    <App />
</Autograph.provider>, document.getElmentById('root'))
```


## Explicit Loading/Error Handler (June 2, 2019)

Handle loading states by checking for `Query._loading`— this shoudl make it easier to port existing codebases, for instance that use Apollo. 

This means that we don't need to use React Concurrent Mode— instead we effectively only use a zero-delay Suspense in order to abort a render. 


```
function NoSuspense(){
    let get = usePrimer()
    let [ x, setX ] = useState(42)

    if(get('_error')) return <div>HELP HELP WE HAVE ERROR HELP</div>;
    if(get('_loading')) return <div>Loaidng (no suspense)</div>;

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
}
```


because of this as the default behavior, suspense never actually triggers for more than a single frame (it's only ever used to immediately abort and retry a render fiber). thus we don't actually need stable concurrentmode to ship this library.

## Multiple Queries per Autogrpah Root (June 2, 2019)

This version introduces "loading groups" that allow different queries to be separated within a single Autograph root. 


```
function NoSuspense3(){
    let get1 = usePrimer('B')
    let get2 = usePrimer('A')
    let [ x, setX ] = useState(42)

    if(get1('_error')) return <div>[GET 1] HELP HELP WE HAVE ERROR HELP</div>;
    if(get1('_loading')) return <div>[GET 1] Loaidng (no suspense)</div>;

    if(get2('_error')) return <div>[GET 2] HELP HELP WE HAVE ERROR HELP</div>;
    if(get2('_loading')) return <div>[GET 2] Loaidng (no suspense)</div>;

    return <div>
        <div>
            GET1: {get1('message1')}<button onClick={e => setX(x + 1)}>{get1(x) || x}</button>
            <p>{get1('time')}</p>
        </div>
        <div>
            GET2: {get2('message2')}<button onClick={e => setX(x + 1)}>{get2(x) || x}</button>
            <p>{get2('time')}</p>
        </div>
    </div>
}
```


## Future?

Should using suspense be global or with a subtree context flag?

Maybe it should be an additional flag like loading group?