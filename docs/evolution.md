---
id: evolution
title: Evolution of Autograph
---

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


```jsx
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


```jsx
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

```jsx
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

```jsx
ReactDOM.render(<Autograph url={GQL.url}>{
    (Query: GQL.Query) => <App Query={Query} />
}</Autograph>, document.getElementById('root'))
```

## Higher Order Component Decorator (October 21, 2018)

```jsx
@AutographHOC2(GQL.url)
class App extends React.Component {
    render(){
        let Query: GQL.Query = (this.props as any).Query;
    }
}
```

## Error and Loading Pseudofields (October 22, 2018)

We could even detect automatically when `__error` and `__loading` were used so that we sould only render them if we knew that they existed. 

```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
    <Autograph>{query => }</Autograph>
    <Autograph fallback={<div>Loading...</div>}>{query => }</Autograph>
    <Suspense fallback={<div>Loading...</div>}><Autograph fallback={null}>{query => }</Autograph></Suspense>
```


## Durable State (May 17, 2019)

For many data fetching tasks we would like to store a per instance cached value inside the state of a component instance. however, this is not possible with Suspense because if the render is aborted, the state is never stored, and it is impossible for components to then interact with a previous version of itself.

Durable State is a special react hook that stores data in an external cache and reads fields from the react internals to maintain consistency.


## Inline Fallbacks (May 18, 2019)

```jsx
<InlineFallback>
    <LoadingDemo />
</InlineFallback>


function LoadingDemo(){
    let get = usePrimer(fetchData)
    let [ x, setX ] = useState(42)
    let isLoading = get('_loading');

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{isLoading ? '(loading)' : (get(x) || x)}</button>
        <p>{get('time')}</p>
    </div>
}

```

This allows us to have a component act as its own loading indicator. This is done by wrapping our target component with something that consumes and subsequently re-emits the query object and also functions as a suspense boundary. 

note that hooks don't get loaded with the same value when running in the inline fallback mode

This is pretty weird because the behavior is actually dictated by how a component is mounted as opposed to somethign about the component itself. Ideally whether or not a component uses suspense ought to be something that can be determined for each particular component. 


## Minimal External State (May 21, 2019)

Durable state was then removed on May 17 in favor of a simpler persistence scheme.

```jsx
const agClient = Autograph.createClient(URL)

ReactDOM.render(<Autograph.Provider client={agClient}>
    <App />
</Autograph.provider>, document.getElmentById('root'))
```


## Explicit Loading/Error Handler (June 2, 2019)

Handle loading states by checking for `Query._loading`— this shoudl make it easier to port existing codebases, for instance that use Apollo. 

This means that we don't need to use React Concurrent Mode— instead we effectively only use a zero-delay Suspense in order to abort a render. 


```jsx
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

It still remains to be seen how to make this behavior harmonize with Suspense an Error boundaries if we want to be able to handle fetching errors and loading states with these mechanisms. 



because of this as the default behavior, suspense never actually triggers for more than a single frame (it's only ever used to immediately abort and retry a render fiber). thus we don't actually need stable concurrentmode to ship this library.

## Multiple Queries per Autogrpah Root (June 2, 2019)

This version introduces "loading groups" that allow different queries to be separated within a single Autograph root. 


```jsx
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

The only problem with this system is that the entire app gets re-rendered each time any query or loading group has a status change. this can likely be addressed with `shouldComponentUpdate` and `React.memo`. 

However, maybe we should have `usePrimer` register some sort of update callback.

## Suspense for Loading groups (June 3, 2019)

```jsx
type Query = QueryS & {
    _loading: boolean
    _error: any
}

type QueryS {
    __typename: string
}

let query: Query = usePrimer(loadingGroup)

let querySuspense: QueryS = usePrimerS(loadingGroup)
```

This allows suspense and non-suspense apis to play nicely together. We have pretty much the ideal behavior where the default makes it easy to port things over from systems like Apollo and Relay. We have a version of suspense that can be opt-in one component at a time without adversely affecting siblings. 

There should exist suspense and non-suspense version of the query endpoint. The non-suspense version includes `_error` and `_loading` properties. Suspense uses error boundaries and suspense placeholders respectively to handle these states. 


## Isolated Loading Group Rendering (June 3, 2019)

The main problem with having multiple loading groups within a single autograph root is that every time something on the page (in any loading group) is fetched or reloaded, the entire page needed to be rendered. 

Another issue is that if any of the components on the page had React.memo or shouldComponentUpdate, then new data wouldn't properly propagate down. 

With this update we use the same trick that Redux-React and other state management systems use— which allows us to subscribe particular components to state updates. This update makes it so that children which are shadowed by `shouldComponentUpdate` will still update automatically when changes occur. 


## Dry Flag (June 3, 2019)

Similar to `_error` and `_loading` there's now `_dry` which is a pseudo-field which only works during certain conditions. 

```jsx
function NoSuspense(){
    let get = usePrimer()
    let [ x, setX ] = useState(42)

    if(get('_error')) return <div>HELP HELP WE HAVE ERROR HELP</div>;
    if(get('_loading')) return <div>Loaidng (no suspense)</div>;
    if(!get('_dry')){
        console.log('do some side effect that shouldnt occur during the real thing')
    }

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
}
```

Maybe we should consider switching it to something like `_real` which represents the inverse, because it's probably more likely that someone is interested in doing something when it isn't a dry run. 


Current Features:
- No need to manually write GraphQL queries
- Automatically generate TypeScript bindings
- Uses only zero-delay suspense, which does not require concurrent mode, and goes back to React 16.6 (October 2018)
- Only does a virtual render pass when it encounters missing data (similar to a page fault in CPUs) for practically zero performance overhead
- Easy to port existing code that uses Relay or Apollo or URQL— loading states and error handling is trivial to port
- Opt-in to concurrent mode and suspense for specific components 
- Loading groups / queries allow different components to separately requiest queries, and updates can pierce `shouldComponentUpdate` and `memo`. 


## Directives (June 13, 2019)

```
D('@skip(if: false)', query.getThing({}).otherThing.stuff)
```

Compiles to:
```
{
    getThing {
        otherThing {
            stuff @skip(if: false)
        }
    }
}
```


Directives can be applied to any part of the expression:

```
D('@skip(if: false)', query.getThing({})).otherThing.stuff
```

The corresponding GQL would be:
```
{
    getThing @skip(if: false) {
        otherThing {
            stuff 
        }
    }
}
```


Directives are a little bit weird because they need to wrap an expression directly as opposed to a variable that holds that value. 

BAD:
```
let x = query.getThing({}).otherThing.stuff
let y = D('@skip(if: false)', x)

// use both x and y
```

This is because `D` actually mutates the query handle to record that that value has a directive attached. 



## Loading Guards (June 16, 2019)

How should we handle loading states?

We have a few options:

- Use suspense fallbacks
    - "Just Works" because we have a top level suspense boundary, but this also means that the entire page gets unmounted when things load which is pretty bad for default behavior.

- Use render abort (throw nextFrame) and expect that the user handles `query._loading`
    - The entire page doesn't turn into a loading screen, but it may flash
    - Somewhat similar to how Apollo does it.

- Loading guards (inline fallbacks for pieces that need to be loaded)
    - You have to teach people a weird loading paradigm

- Methods return undefined
    - It's hard/annoying to distinguish between "loading" and loaded with null result

- Methods return LOADING
    - You have to write code that deals with the possibilty that anything could be loading.

## Loading API (August 6, 2019)

The `Loading` API went through a few changes.

The first implementation was `Loading(fallback, fn)` with an optional fallback as the first argument. This has the advantage that the fallback is specified first (rather than having a short bit of code dangling somewhere far away at the end). However, optional first arguments are pretty weird and slightly confusing. 

```js
<div>{Loading(() => <div>
    <h1>{query.shop.name}</h1>
</div>)}</div>

// fallback first
<div>{Loading(<div>loading stuff...</div>, () => <div>
    <h1>{query.shop.name}</h1>
</div>)}</div>
```

The next implementation was the more traditional optional second argument format `Loading(fn, fallback)`. The whole behavior of `Loading` is still a bit weird as a function that returns a React component (i.e. it poses the obvious question of why it isn't an actual React component with a render prop itself). 

```js
// this is the same as the first variant
<div>{Loading(() => <div>
    <h1>{query.shop.name}</h1>
</div>)}</div>

// fallback second
<div>{Loading(() => <div>
    <h1>{query.shop.name}</h1>
</div>, <div>loading stuff...</div>)}</div>
```


This takes us to the final implementation, where `Loading` is a simple React component with a render prop. This is more verbose than the others, as you have to start and end the call with the XML-style tags, and the fallback is specified with `fallback={}`. However, it retains the advantage that the fallback is specified in the front (rather than at the tail). And it avoids the weirdness of a non-component function that returns React components. 


```js
// render prop
<div><Loading>{() => <div>
    <h1>{query.shop.name}</h1>
</div>)}</Loading></div>

// render prop with fallback
<div><Loading fallback={<div>loading stuff...</div>}>{() => <div>
    <h1>{query.shop.name}</h1>
</div>)}</Loading></div>
```


The one disadvantage of the render prop approach is that it doesn't work for arbitrary non-react values. For instance, we may want to have

```js
let thing = loading(() => query.something.whatever, [])
```


## Eager (August 6, 2019)

Eager is just the continuation of the `amb` experiment. It's meant to enable easy GraphQL prefetching with Autograph. 

Consider the following code:

```js
function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    let [expand, setExpand] = React.useState(false)
    
    return <div>
        <h1>{pokemon.name}</h1>
        <a onClick={e => setExpand(x => !x)}>{expand ? '▲ Collapse' : '▶ Expand'}</a>
        {expand && <Loading>{() => <img src={pokemon.image} />}</Loading>}
    </div>
}
```

Here we don't fetch `pokemon.image` until the `Expand` button is clicked. This can cause an unwanted loading state. 

With `Eager` we can prefetch `pokemon.image` by simply wrapping it around `expand`

```js
function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    let [expand, setExpand] = React.useState(false)
    
    return <div>
        <h1>{pokemon.name}</h1>
        <a onClick={e => setExpand(x => !x)}>{expand ? '▲ Collapse' : '▶ Expand'}</a>
        {Eager(expand) && <Loading>{() => <img src={pokemon.image} />}</Loading>}
    </div>
}
```

During the dry rendering phase, we track the occasions where `Eager` is called and automatically re-run the function with `Eager` returning the negated boolean value. 

## Loading Schemes (August 7, 2019)

There will be 3 ways to handle loading in Autograph: Early returns, Loading Guards, and Suspense. 

Early Returns will be the technique that will be easiest to port from Apollo or Relay code. 

Loading Guards are essentially lightweight anonymous Suspense blocks.

Suspense is suspenseful!

## TODO

- mutations api
- support enums within queries
- 


## Future?


- Mutations
- An API for triggering reloads of specific queries
- Some way of specifying query options (e.g. cache-only etc.)?