# Metastate Prototype

The metastate prototype is an experiment into what Autograph could be in the future. 

It supports React Hooks as well as traditional class based components— so you can use whatever state management approach you prefer. It'll properly override the dispatchers so that the side effects become no-ops during the virtual render pass. 

It can even work with child components which maintain their own independent state and use that to select which fields to render. This is useful for instance, if you want to create a "more" button that expands the number of fields displayed. The "isExpanded" status can be kept locally within the component, and if it is true, it may display several additional fields. 

The metastate prototype revolves around the "Hooks" or "amb" style interface, where you simply call `withMetastate` as if it synchronously returned the appropriate data object. This means there's no need to mess around with render props or any of that convoluted logic. 

## resolved problems

no more "flash of unloaded content" which can occur when child component updates without re-rendering the parent component. 


## lazy autograph

1. try to render the thing with react normally
2. if we try to read data which isn't yet loaded, we throw a promise
3. we synchronously run a fake render starting from the autograph root, and determine all the fields needed to render
4. we fetch all the results and store it in a cache, and then resolve the suspense promise
5. react re-renders the components which needed data, but now data is there


performance characteristics:

- if you aren't fetching any data, or if you aren't fetching any new data, then there's literally zero overhead. renders happen exactly as fast as they normally are.
- if you end up requiring new data, you execute half of a render before it bails out, then there's the virtual render pass, and then there's the network latency associated with fetching the data, and finally you have a full render. The network latency of executing the query will be order of magnitude longer than any of the rendering steps. after all in dev mode, react already renders all components twice and you probably didn't notice. 
- if you require data that depends on other bits of data, then it is possible that it will involve multiple query round trips to resolve. there isn't any way to avoid this. 

what should autograph be?

- the "normal" version which doesn't use any internal react APIs?
    - no support for react hooks
    - doesn't work properly for components which require different data based on their own child state
    - some notable caveats (state in children, fields that depend on other fields)
    - additional rendering overhead on each render

- the "future" version which uses suspense, concurrent, and internal APIs?
    - support for hooks
    - support for child state
    - no caveats / just works (state in children, fields that depend on other fields)
    - no performance overhead unless data is being fetched

    - uses internal APIs for react which is pretty strongly discouraged
        - maybe we can counteract this by having rigorous test cases and using greenkeeper / running them on all previous and future versions of react
        - it's a bit tricky because our reconciliation algorithm may be slightly different from actual react


Originally my answer was that the version that launches should be the "normal" one since it doesn't technically use any of React's internals. That said it's not exclusively using React's APIs either, since it involves what's essentially a custom implementation of a react renderer anyway. We should probably have test cases to ensure support for teh more fring component types as well (memo, lazy, fragment, array, suspense, concurrent, etc). 

However, the "future" version might have a better shot at making a splash and really hammering home how awesome this approach is. It probably makes a more compelling demo, and it actually is more usable in spite of not having good hygiene. But that's kind of a good place to be right? It's the example that proves the rule, or whatever, it's the thing that justifies breaking rules when you have good reasons. 


## the pitch

full typescript integration, in fact your editor will automatically typecheck the fields that you're fetching against your endpoint's schema. intellisense and autocomplete work, and include inline documentation. 

no complicated tooling. you don't need to change your babel or webpack or rollup configuration. in fact you don't even need to use typescript or flow. you can use autograph with script tags if you want. 

no template strings. that means your code is fully syntax highlighted, and gets properly formatted by code indenters. 

easier to maintain. no need to maintain large collections of fragments used by different queries. no need to go back and forth between your application and graphiql (e.g. figuring out how to send auth tokens, or where the data flows between components / etc). No need to edit your code in multiple places to render a new field. 

easier to learn. no need to learn a new language, or set of tools, just access data as if it were in an object and it just works. if you're using graphql already, then you already know everything you need— just unlearn the painful bits. 

make faster apps. fetch only exactly the data that you need to show the user. oftentimes graphql apps use fragments that fetch more data than is totally necessary because they're reused between different components. with autograph, only the data which is actually used in the render process is fetched at all. 

no performance overhead. autograph involves a lightweight dry render pass only when new data needs to be fetched, which is inconsequential (< 10ms even on very very complicated apps) compared to the network latency of actually fetching the data. 

essentially you just take the code that you're already writing to handle apollo, and then get rid of the part where you're writing out the query. that's pretty much it. 

supports both queries and mutations (todo we should investigate how to get subscriptions to work). supports all the features of the graphql language, including inline fragments. 


potentially we can add in the amb stuff for prefetching more data than we really need for performance, but it's really not needed and just something else that needs to be explained, so that's probably not worth adding. 



## incrementalism

how can you switch to autograph from apollo incrementally, i.e. without replacing it in your entire site. like how can you import it and just use it for one component and then people can choose to use it for more components in the future. 


this is a key part of what facebook says made react successful— that it wasn't a full framework and people could use it or a small component of a site and then it gradually became more popular because it's better. 


## multiple roots

so i imagine a fairly common use case might be trying to run graphql queries in several components. one possibility is to have a single autograph root (i.e. a single component that calls `useAutograph`) at the top of the application and passing it through with props, or with contexts. 

another possibility is that every component that needs autograph should just call `useAutograph`. 

The funtion of an autograph root. 


Definitely we should test the API to ensure that it works with multiple roots as expected. 


```
Suspense
    Autograph Root
        Component 1
        Component 2
        Suspense
            Component 3
            Component 4
```

We need a suspense component above our autograph root. 

We can have additional suspense elements to show fine grained loading indicators. 

If we have a single autograph root, then that means as much data as possible gets fetched at once— which feels like a good thing, right? 

However, maybe we don't want to batch our requests together. Maybe we want to have certain components fetch slow queries separately? That's where it'd be useful to have an independent root. 

Interestingly enough with the new lazy approach we don't actually need the ability to run our render pass synchronously. We can take as much time as we want. 






We want to read from fibers but somehow not to write to them. can we hack react to do this for us? 


## TODO

we need to support suspense in our own renderer because some component might fetch data with suspense. this is necessary in the case of autograph within autograph.

we need the ability to read from contexts, both in hooks and outside of them with consumers.




## how autograph works

1. when you call `useAutograph` it returns an object filled with a bunch of getters according to the GraphQL schema
    - if the schema is not already loaded, then it fetches the schema first
2. react continues to render your app, instantiating classes and calling render methods. some of these render methods may try to read data from the autograph query object
    - if the data is already loaded, we just return the data from the cache
    - if the data is not yet loaded, this means that we don't have all the data we need to render this view. we suspend the render process (by throwing a promise) and continue to step 3
3. we do a dry render pass starting from the autograph root (i.e. the component that calls useAutograph). During the dry run, the getters log which bits of data are requested and do not throw.
4. we take the log of all fields which need to be loaded and generate a graphql query which fetches it all. we then start the process of fetching the query. 
5. when the query is finished loading, we resolve the promise thrown in step 2, and react automatically resumes the render process, but since we've fetched all the data for all descendents of our autograph root, no additional queries need to be made. 






## additional APIs

Hooks: `useAutograph(GQLClient)`
HOC: `withAutograph(GQLClient)`
Component: `<Autograph client={GQLClient}>{query => <div>{query.thing}</div>}</Autograph>`

What about mutations? We can just do the original plan we had for autograph.

```
    mutate(mutation => 
        <ResultComponent data={mutation.Something()} />)
```

Maybe we should actually render the component somewhere offscreen so that all the lifecycle hooks that might fetch data get called. 

## problems

The biggest problem with Metastate is that it requires poking around with the React internals. It does two things:

1) it injects a temporary dispatcher which overrides the behavior of the standard react hooks during a virtual rendering pass. 

2) it has a small implementation of a subset of the react reconciliation algorithm used to pull data out of the react fiber data structures and to trigger the appropriate render methods

As these are react internals, there is no real guarantee that they will remain. The temporary dispatcher system for hooks is simple enough that it will likely be available in some for or another for the foreseeable future. The internal representation of Fiber, not so much. 

the subset of the react reconciliation algorithm means that it is relatively brittle— for instance, currently fragments, portals are not supported. additionally, nested arrays of children are not supported. the algorithm for resolving refs to objects is also not correct. 



## the right way to do this

we shoudl just follow the idea behind greenkeeper and build a good test suite and try it on all of react. 

we need some way of programmatically testing the behavior of this system. 

maybe we want to factor this part out into a separate library, after all the metastate concept (amb for react) is pretty general.


key features:

- execute a dry run render pass recursively
    - render functions in the tree can have side effects, we expect all the side effects to fire
    - including fragments, portals, suspense, error boundaries, class components, functional components, memo, forward ref, context providers, context consumers, profiler components, lazy components, event components, concurrent mode declarations

- extract latest state from class components and functional components (hooks)
    - this tests the ability to interpret react fiber state objects
    - we have some components buried inside some big complciated tree
    - we mutate the state within those components
    - we run the dry run render pass, and some side effect logs the current state, we expect it to be the same
    - this must also work while an event/update is being processed (i.e. eagerly show latest state)




## performance?

what if we generally didn't do the virtual rendering pass? what if instead we just returned an empty object and waited until someone tried to access something before we went and fetched the data? 

that is, what if we're lazy about data fetching.




## features used

- suspense
- data loader cache
- concurrent mode
- react hooks
- react internals
- amb



another possibility is that we



## how does this differ from autograph

autograph uses getters to define the object, here we just have a getter method that one needs to call by string. metastate does not deal with graphql at all, and instead works with a mock data loading interface. 



https://www.npmjs.com/package/test-all-versions