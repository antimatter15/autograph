# Dry Render

```dryRender(node, fiber)```

- `node` is the JSX node corresponding to a particular thing that we want to dry render. this is required, anotehr function may exist to derive a node from a particular fiber node if present. 
- `fiber` is optional, it is the existing react render fiber corresponding to the node if it exists that is used to pull state information. 



```jsx
let currentTotem;
function useAutograph(client){
    let rootFiber = currentFiber
    let [dispatcher, setDispatcher] = useState({
        fields: [],
        data: {},
        sentinel: field => dispatcher.fields.push(field)
    })
    if(currentTotem === dispatcher) return dispatcher.sentinel;
    if(dispatcher.fetching) throw dispatcher.fetching;
    return field => {
        if(field in dispatcher.data) return dispatcher.data[field];
        if(!dispatcher.fetching){
            dispatcher.fields = []
            let previousTotem = currentTotem;
            try {
                currentTotem = dispatcher;
                dryRender(elementFromFiber(rootFiber), rootFiber)
            } finally {
                currentTotem = previousTotem;
            }
            dispatcher.fetching = fetchData(client, dispatcher.fields)
                .then(data => dispatcher.data = data)
            setDispatcher(dispatcher) // schedule re-render autograph root
        }
        throw dispatcher.fetching;
    }
}
```

We should have a guided walkthrough of the 20 line pseudocode that explains how Autograph works because it's kind of like that movie Primer. It's a pretty dense bit of code that runs backwards and forwards through time. 



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


*React.lazy*: Yeah we should probably support this. We can probably look into https://github.com/facebook/react/blob/master/packages/react/src/ReactLazy.js and https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js to figure out how to do it. The simple way to do it would be to check to see if it's loaded (check `component._status` is Resolved), and if not, we stop rendering that part of the tree. This means that we don't fetch any of the data which is hidden underneath that component the first time, but instead we wait for React to fetch the component, and when it succeeds, we catch the data fetching exception and try again. The other approach would be to implement the lazy renderer ourselves (which is not necessarily hard, since the whole thing is less than 50 lines) which can either be compatible with React (which pegs it to the underlying implementation which may be bad), or independent (which may involve fetching twice). Probably we should do whatever involves the least work so we should probably do the simple one. 

*Suspense (revisited)*: Do we actually need to support Suspense with asynchronous rendering? Because there's a good chance that we can just fetch the data that we know we need and then let actual react do the real thing. This kind of means that in an SSR context we may need to use Autograph in conjunction with something like the actual react server side renderer instead of just relying on dry render. That said the server SSR engine doesn't support suspense yet, so that might be a bit of a problem. 

To be a bit more clear, we can try to do the full render process. When we hit something that triggers suspense, something throws a promise. We can at this point simply give up with the render process (at least for things further down that branch). We figure out what query to render the information that we need so far, and then we let react do the actual render. React probably hits the same suspense (if the data hasn't by then actually loaded into the cache) and properly waits and then tries again. There's a good chance that after this happens, we try to fetch some data from GQL that wasn't fetched, so we have to do the dry render again. Worst case scenario— we have to do an additional server fetch, but we get a simplified system.


*React.memo/Class.shouldComponentUpdate*: It's kind of an interesting question what the oughts ought to be here. The easiest thing to do, which is probably at least for the first version what we should do, is to ignore these and always do a full tree traversal. Dry renders don't take that much time since they are infrequent and dwarfed by the cost of a network fetch. Plus we don't necessarily know the present and past states and often can't judge whether the change is substantial. There's all sorts of complexity that can happen if you overly-memoize (as Don Knuth says, premature optimization is the root of all sin). 


*Higher Order Components*: These will be supported but we don't need to do any work to support them. 

*Hooks*: We'll support useState and useReducer for accessing and manipulating state. We'll support useContext for accessing data from contexts. useCallback and useMemo likely will not properly memoize but will still function. useRef will trivially return an empty object, because refs aren't useful during the render pass.  useImperativeHandle, useEffect, useDebugValue, and useLayoutEffect will be no-ops. 


*Autograph in Autograph / Inception Totems*: So let's say some madman decides to put Autograph in their Autograph, so that they can render in their render while their render is rendering. What is the right behavior? If someone calls `useAutograph` for a different instance within our other dry render, should we return the sentinel object or not? Clearly pulling the autograph instance out of the current react dispatcher isn't the right thing to do here because we might have multiple graphql clients servicing multiple endpoints and combining them together doesn't make any sense. So what we should probably do is to either with the dispatcher or some other state pointer track the current GQL client which is the argument being passed to useAutograph and check that that matches— otherwise we just return the normal data rather than the sentinel. 

After all we probably don't want to properly deal with suspense in this system lest we have to worry about dreams within dreams and all that other nonsense. 
