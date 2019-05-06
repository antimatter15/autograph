# Dry Render TODO


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



