# Old Readme

Using GraphQL is often quite repetitive and repetitive. You have to declare your schemas, implement your resolvers, write your queries, and destructure the results of your queries. You end up writing the same thing in different forms several times, each time using slightly different syntax. Here's what it looks like to use Apollo to query a server for some basic information about currencies:

```jsx
<Query
    query={gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
    `}
>
    {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.rates.map(({ currency, rate }) => (
            <div key={currency}>
                <p>{`${currency}: ${rate}`}</p>
            </div>
        ));
    }}
</Query>
```

Autograph is a new kind of GraphQL client that eliminates some of that repetition. Here's some code which does the same thing as the code above, using Autograph:

```jsx
<Autograph>{
    (Query: GQL.Query) => Query.rates({ currency: "USD" }).map(({ currency, rate }) => 
        <div key={currency}>
            <p>{currency}: {rate}</p>
        </div>
    )
}</Autograph>
```

At runtime, Autograph will automatically generate the following GraphQL query, which fetches all of the data needed to render the component in a single request, requesting only the fields that you actually use. 

```graphql
query {
    rates(currency: "USD") {
        currency
        rate
    }
}
```

It doesn't require any compilation plugins— so you don't have to worry about messing up your precariously functional `.babelrc`. You can use it with Webpack, Babel, Parcel, Next.JS, or even plain Javascript. 

That said, things get even better if you write your app in Typescript. Autograph can import a GraphQL schema and automatically generate a Typescript definition file, so that your editor can autocomplete fields in GraphQL while providing inline documentation, and your typechecker can ensure that all your UI code fits the data access schema. 

## How It Works

You might ask, how does this sorcery work? It's actually quite simple. We render your component twice— the first time, instead of threading in actual data through the `Query` object, we pass in a special object that we dynamically construct using the GraphQL schema. This object has methods and getters defined in all the right places that all output fake data. Whenever any field of the object gets accessed, it records the path of the data that was requested. At the end of the special rendering pass, all the paths are added up, and we generate the exact GraphQL query that fetches all the right data. Now it's just a simple matter of feeding the real data into your render function by calling it one last time.

Since React rendering functions typically have no side effects, most of the time things should just work. You can even pass the `Query` object or any of its descendents as a prop to other components, and it'll still do the right thing. It does have a few gotchas though— most notably, if there's any code path that accesses data which doesn't get called during the scouting phase, Autograph won't know to fetch that data. 


## Mutations

So we've seen Autograph for running queries, but what about for running mutations and updating a form on your site? 

```jsx
const doMutation = MakeMutation("Your GraphQL Endpoint")
await doMutation(mutation => 
    <Review review={mutation.UpdateReview({ 
        id: ReviewID, 
        review: {
            author: 'Rodger Qbert',
            title: 'A Midwinter Days Trip',
            rating: 3
        }
    })} />
)
```

Here we use a `MakeMutation` which returns a function that you can call with another function. You can pretend that it's just a Javascript object containing all your mutations, so you can any of its methods as ordinary functions. Our `UpdateReview` method here returns the updated `Review` instance with the changed fields, but we'll somehow need to signal what fields we're interested in fetching. The simple thing we can do is just pass the result of the mutation into the React component which typically renders `Review` objects. This will allow Autograph to figure out exactly what fields needs to be pulled. 

When these updated fields are pulled, the underlying GraphQL caching engine can notice this and update all the appropriate components on the page. 

What if you don't want to deal with React components at all? That's fine, the `doMutation` method (and as you might expect there's an almost identical `doQuery` method) doesn't care what you do with it— it just passes the finished result back through. 

```jsx
let data = await doQuery(query => {
    return {
        name: query.me.name,
        numberOfFriends: query.me.friends.length
    }
})
// data = { name: 'Bob Smitterjensen', numberOfFriends: 3 }
```

Notes: The automatic reloading of affected components requires an underlying GraphQL caching layer such as Apollo. 

## Loading/Error Status

With Apollo, you need to explicitly define your error and loading handlers, or else your component will fail to render when `data` is null or undefined. 

Autograph provides default renderers for both loading states and error states, so it's as easy as possible to get things up and running. But it's also really easy to add explicit error and loading handlers.

```jsx
<Autograph>{
    (Query: GQL.Query) => {
        if(Query.__loading) return <div>Loading...</div>
        if(Query.__error) return <div>Found some errors... {Query.__error}</div>
        return Query.rates({ currency: "USD" }).map(({ currency, rate }) => 
            <div key={currency}>
                <p>{currency}: {rate}</p>
            </div>
        )
    }
}</Autograph>
```

When doing the rendering dry-run, Autograph checks to see whether or not your code reads a value from `__loading` or `__error`. Then when data is being loaded (or if an error occurs), it knows that it should call the rendering function (instead of falling back to the default handler). 

## Higher Order Component

Don't want to wrap your components in a render prop? We also have a higher order component which will automatically inject `Query` as a prop to your component.

```jsx
function App({ Query }){
    return <div>
        <h1>My Pokemons</h1>
        {Query.pokemons({ first: 20 }).map(k => 
        <div key={k.id}>
            <PokemonSummary pokemon={k} />
        </div>)}
    </div>
}

export default withAutograph(App)
```

## React Suspense

React 16.6.0 includes a feature called Suspense, which allows a component to suspend rendering by throwing a promise within its render function. This can be used to easily handle and display different loading states, while providing slick user experiences without extraneous loading spinners.

Autograph can be told to fetch data this way simply by adding `suspense` as an argument. 

```jsx
<Autograph suspense>{
    Query => <div>{
        Query.me.friends({ limit: 50 }).map(friend => 
            <div key={friend.id}>{friend.name} ({friend.mutuals.length} mutual friends)</div>
        )
    }</div>
}</Autograph>
```

Just as `suspense` make it so that loading states are handled by suspense placeholder boundaries, `throw` can be passed as a prop if you want data fetching errors to be handled by error boundaries. 

## Server Side / Universal Rendering

With an SSR framework such as Next.JS, it's easy to add isomorphic GraphQL rendering with Autograph. A `getDataFromTree` method can do a simulated render pass of the entire component tree to determine the necessary GraphQL queries to run and to fetch them all in one request that can then be rendered with `renderToString`. On top of that the data can get serialized and sent to the client for hydration and use within interactive components. 

```jsx
export default ({ Query, ctx }: { Query: GQL.Query, ctx }) => {
    let pokemon = Query.pokemon({ id: ctx.query.id })
    return <div>
        <Link href="/"><a>&larr; Back</a></Link>
        <h1>{pokemon.name}</h1>
        <i>{ctx.query.id}</i>
        <div><img src={pokemon.image} /></div>
        <div>{pokemon.types.map(k => <li key={k}>{k}</li>)}</div>
        <fieldset>
            <legend>Evolutions:</legend>
            {(pokemon.evolutions || []).map(k => <div key={k.id}>
                <PokemonSummary pokemon={k} />
            </div>)}
        </fieldset>
    </div>
}
```

## A sneak peek into the depths of madness

React recently announced their new Hooks API, which provides new APIs like `useState`, `useEffects`, and `useContext` which are accessible in functional components— no need to use render props, or to thread data through props. 

In a similar vein we've prototyped `useQuery`. You'd pass in a reference to the current function and props, and it'll return a query object that you can synchronously use as if all the data on your server has already been loaded. 

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
        {block.transactions({ filter: { withInput: false }})
            .map(tx => <fieldset key={tx.hash}>
                <legend>{tx.index}: {tx.hash}</legend>
                <table><tbody>
                    <tr><td><b>From</b></td><td>{tx.from.address}</td></tr>
                    <tr><td><b>To</b></td><td>{tx.to.address}</td></tr>
                </tbody></table>
            </fieldset>)}
    </fieldset>
}
```

When `useQuery` is called from a base reality, it simulates in invocation of the calling function. The base reality call to `useQuery` coordinates with the copy of itself existing in the simulation, and returns a sentinel in the simulated case. The simulation of the parent function continues to run, which in turn monitors how the sentinel gets used and passed around. Once the simulation is finished, the base reality `useQuery` call compiles all that information together and generates a GraphQL query that fetches all the information needed to render the component. It checks to see if the data has been loaded into the cache, and if not, it begins the process of fetching the data and throws a promise that resolves when the data is loaded. This promise is caught by React Suspense, which then tries again to render the the component when the promise resolves, in turn restarting the whole `useQuery` nightmare.  

In a sense it's simliar to John McCarthy's `amb` operator found in some variants of Lisp. It's a function ostensibly looks into the future in order to know what to return. 

Note that using this API requires React Suspense, and throws errors when data fetching fails— so your app will need to be wrapped with both a suspense placeholder and an error boundary. For the current prototype, it can only be used within stateless functional components. Also it is likely not possible for this API to be used in conjunction with `useState` hooks.

## Browser Support 

Autograph supports all browsers that React supports (IE9+). 

The only special Javascript feature that it uses is the ability to define getters for objects, which is widely supported in all modern browsers. 


## Caveats

You might say that all of this looks pretty neat, but what if I want to do something stateful? What if I want to run a query and call some sort of external method with the results, without having to worry about a phantom scouting phase that feeds fake data? Conveniently every fake object in the initial phase includes a `__dryRun` field, which you can use to guard stateful calls. 

```jsx
await doQuery(query => {
    _.uniqBy(query.me.favoriteBooks
        .map(book => book.author),
        author => author.name
    ).forEach(author => {
        skipIf(query.__dryRun, drawAuthor)({
            name: author.name,
            image: author.image,
            books: author.books.length
        })
    })
})
```

We've included a helper method `skipIf(shouldSkip: boolean, fn: function)` which you can use to easily substitute a function for a dummy function (you shouldn't use if statements because then Autograph won't know which fields are needed to run the query when it's actually time to call the function). 
