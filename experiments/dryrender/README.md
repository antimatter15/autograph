# Dry Render

```dryRender(node, fiber, totem)```

- `node` is the JSX node corresponding to a particular thing that we want to dry render. this is required, anotehr function may exist to derive a node from a particular fiber node if present. 
- `fiber` is optional, it is the existing react render fiber corresponding to the node if it exists that is used to pull state information. 
- `totem` is an optional, arbitrary object that can be used to identify when it's in a dream, and whose dream it is

Returns a list of exceptions encountered during the render process.

```checkTotem(totem)```

Returns true if it is currently operating within a dry render identified by this totem. 




```jsx
function useAutograph(client){
    let rootFiber = currentFiber
    let [dispatcher, setDispatcher] = useState({
        fields: [],
        data: {},
        sentinel: field => dispatcher.fields.push(field)
    })
    if(checkTotem(client)) return dispatcher.sentinel;
    if(dispatcher.fetching) throw dispatcher.fetching;
    return field => {
        if(field in dispatcher.data) return dispatcher.data[field];
        if(!dispatcher.fetching){
            dispatcher.fields = []
            dryRender(elementFromFiber(rootFiber), rootFiber, client)
            dispatcher.fetching = fetchData(client, dispatcher.fields)
                .then(data => dispatcher.data = data)
            setDispatcher(dispatcher) // schedule re-render autograph root
        }
        throw dispatcher.fetching;
    }
}
```

We should have a guided walkthrough of the 20 line pseudocode that explains how Autograph works because it's kind of like that movie Primer. It's a pretty dense bit of code that runs backwards and forwards through time. 





Minimal/complete design:
- [DONE] useEffect / [DONE] useReducer 
- [DONE] Strict Mode / [DONE] Concurrent Mode / [DONE] Profiler - Treat as plain element
- [DONE] forwardRef
- [DONE] Portals
- [DONE] React.lazy — Check ._status for whether it's resolved, then render element, otherwise throw error
- [DONE] Suspense — Treat as plain element, thrown promises treated like thrown errors
- [DONE] useCallback / [DONE] useMemo — always recompute
- [DONE] shouldComponentUpdate / [DONE] React.memo — always re-render
- [DONE] Fragments
- [DONE] useEffect / [DONE] useLayoutEffect / [DONE] useImperativeHandle — Noops
- [DONE] Context.Provider / [DONE] Context.Consumer / [DONE] Class.contextType  / [DONE] useContext
- [DONE] Class.contextTypes / [DONE] Function.contextTypes / [DONE] Class.childContextTypes
- Errors — Continue rendering, ignore subtree





Theoretically it'd be possible to use Autograph with any version of react since 16.6.0 (October 23, 2018). Since it includes Suspense. However it does not include Hooks, so we need some way to write autograph without hooks. 

Also, technically speaking it'd be possible for us to make Autograph a special hook which can also run inside of class components. 


```jsx
render(){
    return <Autograph>{query => {
        // this will technically work but it's kind of ugly
    }}</Autograph>
}
```


Features we need for Autograph/dryRender:

- Hooks — 16.8.0 (February 6, 2019) 
- Suspense — 16.6.0 (October 23, 2018)
- ConcurrentMode/createRoot — Unreleased




```jsx
function useAutograph(client){
    let rootFiber = currentFiber
    let [dispatcher, setDispatcher] = useState({})

    if(checkTotem(client)) return dispatcher.sentinel;
    dispatcher.sentinel = field => dispatcher.fields.push(field);
    dispatcher.data = fetchData(dispatcher.fields)
    return field => {
        if(field in dispatcher.data){
            return dispatcher.data[field]
        }else{
            // if we're currently fetching data, then we throw the current fetch promise
            // so we don't re-do that a bunch of times. 
            dryRender(elementFromFiber(rootFiber), rootFiber, client)
            // here we don't actually trigger a re-render of the autograph root
            // which means our getter object doesn't change when the data is
            // refetched. we could potentially re-render the root and generate new
            // objects (perhaps with referential equality if subtrees are the same)
            // so that all the data gets refreshed? 
            // that honestly probably makes more sense, right? since it'd be weird
            // if some data in some other component were updated in a fetch, but it 
            // didn't automatically update so it only renders the update when it
            // or a parent randomly has a re-rener.
            fetchData(dispatcher.fields)
        }
    }
}
```








# Dry Render TODO


What is the Dry Render API?



```dryRender(node, fiber, dispatcher)```

- node is the JSX node corresponding to a particular thing that we want to dry render. this is required, anotehr function may exist to derive a node from a particular fiber node if present. 
- fiber is technically an optional argument, but it is where the state keeping information is held
- dispatcher, this is both the dispatcher which is used for functional components and the object which will be used to track bits of useful state. 


FUTURE:
- maybe try to support whatever was used before fiber in react 15?
- maybe try to support preact
- maybe try to support inferno?
- maybe try to support nerv?


Future:
- change function signature to async function, as for functions that use suspense, we may have to wait arbitrarily long in order to have a completed render
    - nevermind we dont need async, we can get react to do it.
- maybe there's a way to keep it modular and support multiple different representations of state? this seems a little less plausible, since each one is probably pretty different. 




Testing strategy:

The core workflow we want to test is where we use React-Test-Renderer (or any other React renderer) with some root react element. We then want to take that root fiber and perform a dry render on that. And during the dry render we want to ensure that our render side effect gets called with the correct state. We want to test for a few potential gotchas

- We want to reconcile things properly, so if a node changes type, we don't associate a previous instance
- We want to associate keys to things properly
- We want to apply contexts properly
- We want to make sure we are using the latest queued version of props and state, not just the most recently committed one





What we're trying to do is esentially to do a side-effects-only render— This is actually a terrible way to put it because we're explicitly ignoring all of the "side effects" that React is talking about. We're running all the render methods so that we can trigger all the side effects that might coem of the render process, which is supposedly side-effect free.  We want to be able to pass in the same Fiber objects that React internally uses to store state, but we want to be able to do the full render process without modifying anything about the fiber (and in the process corrupting the actual render process). This is important because each component needs to render with the right props and state. 




Notes on how to deal with certain special cases:

*Errors in rendering*: We don't have to necessarily deal with render boundaries the same way as proper react. I think we should be a bit more forgiving— i.e. if we hit a render error on any component, we continue rendering as if it didn't have an error and just log that an error happened. We don't trigger componentDidCatch anywhere. We want this behavior in case someone writes some render code that depends on the exact values that are fetched and throws an error with the generated fake results. We want as much information as we can get about the data which is needed to render. Our policy should be to never propagate an error during the dry run render process, because if it's an actual error, then it should happen again. 

*Portals*: since mounting to DOM isn't soethign that the dry run renderer does, we can treat portals identically as if they were just passthrough standard elements.


*useMemo/useCallback hooks*: we can simply re-run the code each time the function is called instead of implementing a proper memoization cache. the render process only happens upon some data fetching exception anyway, so it' uncommon enough that re-runnign that code makes practically no difference. This can be something which is fixed later on and might be worth writing a test or. 

*Contexts*: contexts are pretty important and unfortunately there are so many different apis to set them and to read them. 

- Context.Consumer
- Class.contextType
- useContext
- Class.contextTypes (Legacy)
- Function.contextTypes (Legacy)

- Context.Provider
- Class.childContextTypes / Class.getChildContext (Legacy)

*Strict Mode*: doesn't affect anything within our dry render. 

*Uncontrolled Components*: There might be fields which aren't accessed in the render, but only in the componentDidUpdate for the case of uncontrolled components (e.g. wrapping some traditional UI library in React). To work around this we need to touch the fields that we'll be accessing later in the componentDidUpdate within the render function. Within the render function we just stick `void this.props.data.myField` if we'll later be accessing `this.props.data.myField` within our componentDidUpdate.

*forwardRefs*: We need to handle the component type, but it should be fairly trivial, because we don't really need to support it. The implementation of forwardRef is fairly simple (https://github.com/facebook/react/blob/c898020e015f4ee6f793a652668d6d78b0d43e76/packages/react/src/forwardRef.js#L12). We just need to call the render function with some dummy ref because refs don't need to do anything. 

*Fragments*: We need to support these. 

*Suspense*: this will use a mechanism analogous to the render error catching. we simply catch exceptions that are thrown during the render process, and if the exception is of type promise, we schedule a re-render when the promise resolves. ideally upon the re-render no more promies will be thrown, and rendering can continue. I believe in proper react, the exception propagates up to the nearest suspense object and upon its resolution all the children of the suspense placeholder are re-rendered. For simplicity, we may elect to treat suspense placeholders as passthrough standard elements (like portals) and simply re-render the component that threw the promise. 


*React.lazy*: Yeah we should probably support this. We can probably look into https://github.com/facebook/react/blob/master/packages/react/src/ReactLazy.js and https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js to figure out how to do it. The simple way to do it would be to check to see if it's loaded (check component._status is Resolved), and if not, we stop rendering that part of the tree. This means that we don't fetch any of the data which is hidden underneath that component the first time, but instead we wait for React to fetch the component, and when it succeeds, we catch the data fetching exception and try again. The other approach would be to implement the lazy renderer ourselves (which is not necessarily hard, since the whole thing is less than 50 lines) which can either be compatible with React (which pegs it to the underlying implementation which may be bad), or independent (which may involve fetching twice). Probably we should do whatever involves the least work so we should probably do the simple one. 

*Suspense (revisited)*: Do we actually need to support Suspense with asynchronous rendering? Because there's a good chance that we can just fetch the data that we know we need and then let actual react do the real thing. This kind of means that in an SSR context we may need to use Autograph in conjunction with something like the actual react server side renderer instead of just relying on dry render. That said the server SSR engine doesn't support suspense yet, so that might be a bit of a problem. 

To be a bit more clear, we can try to do the full render process. When we hit something that triggers suspense, something throws a promise. We can at this point simply give up with the render process (at least for things further down that branch). We figure out what query to render the information that we need so far, and then we let react do the actual render. React probably hits the same suspense (if the data hasn't by then actually loaded into the cache) and properly waits and then tries again. There's a good chance that after this happens, we try to fetch some data from GQL that wasn't fetched, so we have to do the dry render again. Worst case scenario— we have to do an additional server fetch, but we get a simplified system.


*React.memo/Class.shouldComponentUpdate*: It's kind of an interesting question what the oughts ought to be here. The easiest thing to do, which is probably at least for the first version what we should do, is to ignore these and always do a full tree traversal. Dry renders don't take that much time since they are infrequent and dwarfed by the cost of a network fetch. Plus we don't necessarily know the present and past states and often can't judge whether the change is substantial. There's all sorts of complexity that can happen if you overly-memoize (as Don Knuth says, premature optimization is the root of all sin). 


*Higher Order Components*: These will be supported but we don't need to do any work to support them. 

*Hooks*: We'll support useState and useReducer for accessing and manipulating state. We'll support useContext for accessing data from contexts. useCallback and useMemo likely will not properly memoize but will still function. useRef will trivially return an empty object, because refs aren't useful during the render pass.  useImperativeHandle, useEffect, useDebugValue, and useLayoutEffect will be no-ops. 


*Autograph in Autograph / Inception Totems*: So let's say some madman decides to put Autograph in their Autograph, so that they can render in their render while their render is rendering. What is the right behavior? If someone calls `useAutograph` for a different instance within our other dry render, should we return the sentinel object or not? Clearly pulling the autograph instance out of the current react dispatcher isn't the right thing to do here because we might have multiple graphql clients servicing multiple endpoints and combining them together doesn't make any sense. So what we should probably do is to either with the dispatcher or some other state pointer track the current GQL client which is the argument being passed to useAutograph and check that that matches— otherwise we just return the normal data rather than the sentinel. 

After all we probably don't want to properly deal with suspense in this system lest we have to worry about dreams within dreams and all that other nonsense. 


*Helpful warnings*: We should detect when multiple roundtrips are needed to resolve a query and log a warning. This can happen in the case where there's an unexplored conditional or some other issues and leads to poor performance. This is probably somethign that happens in Autograph as opposed to within dry render, but we should keep it in mind so that it's doable. 


Software libraries to test compatibility with:

- React Router
- React Redux
- Apollo
- Flux
- MobX
- Unstated
- Amazon AppSync
- Immer
- TodoMVC
- AltJS
- Backbone.JS
- React Relay
- Rollup
- Webpack
- Parcel
- Closure Compiler








It can generically be used for





Testing TODO:

- Traversal
    - Host Components
    - Class Components
    - Functional components
    - null children
    - array children
    - string children
    - fragment children
    - strict mode / concurrent mode / suspense
- react hooks
    - useState
    - useReducer
    - useEffect / useLayoutEffect / useImperativeHandle




















Done:
- Host Components (div, span, etc)
- Class Components 
- Functional components 
- useState/useReducer hooks
    - TODO: check that it works for useReducers
    - TODO: check that it works for useState(old => new)
- Portals
- Suspense element
- Returning fragments


TODO:

- forwardRef
- Memo
- Lazy
- Error Boundaries
- Thrown exceptions
- Thrown promises
- Returning arrays
- Returning strings
- Returning null
- ConcurrentMode
- StrictMode
- Context Consumer Element
- Context Provider Element
- Class component context consumer / contextType
- Class component context provider
- useContext hook
- useMemo/useCallback hook
    - we can potentially get away with just recomputing every time
- Profiler component
- No-op hooks
    - useEffect
    - useRef?
    - useImperativeHandle
    - useLayoutEffect
    - useDebugValue


What's the right way to interact with shouldComponentUpdate? 


Parts of react that don't have to be dealt with:

- applying changes to DOM
- events
- effects


Parts of react we do have to deal with
- initial mount
- updates




Two Options:

## Hack React Reconciler to do what we want

- We have to change the code so that it doesn't modify the fields
- Alternatively, we can eitehr proxy the object or copy it
- We have to modify it so that it doesn't trigger lifecycle events
- We have to modify it so that it doesn't trigger effects

Pros:
- Less "gotchas" emerging our implementation functioning differently from the actual react. 
- Might be productive exercise in trying to get the functionality included into upstream React Reconciler. 
- Feels like the "right" thing to do, so people might be more comfortable using it 

Cons:
- We have to change react substantially to diable lifecycle events
- Likely slower due to react overhead
- React reconciler internals have likely changed a bunch so this will be tricky to make forward/backward compatible
- 



