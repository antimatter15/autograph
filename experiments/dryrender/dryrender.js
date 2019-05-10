import React from 'react';
import * as ReactIs from 'react-is'

const ALLOW_LEGACY_CONTEXT_API = true;

let _currentLegacyContext = {}
let _currentHookState;

export default function dryRender(node, fiber){
    if(Array.isArray(node)){
        let childFibers = mapChildFibers(fiber)
        for(let i = 0; i < node.length; i++){
            let child = node[i];
            // try {
            dryRender(child, childFibers.get(child.key !== null ? child.key : i))
            // } catch (err) {
            //     console.error(err)
            // }
        }
        console.log('Array/Fragment', node)
        return
    }else if(typeof node === 'string' || typeof node === 'number' || !node){
        console.log('String', node)
        return
    }else if(ReactIs.isFragment(node)){
        dryRender(node.props.children, fiber)
        return
    }else if(ReactIs.isPortal(node)){
        if(fiber){
            console.assert(fiber.tag === 4)
            console.assert(fiber.type === null)
        }
        dryRender(node.children, fiber && fiber.child)
        return
    }

    if(fiber && fiber.elementType !== node.type){
        console.log("Fiber-node type mismatch", fiber.elementType, node.type)
        debugger
        fiber = null;
    }
    
    if(ReactIs.isMemo(node.type)){
        // we ignore shouldComponentUpdate / memo directives and always re-render
        return dryRender(React.createElement(node.type.type, node.props))
    }else if(ReactIs.isLazy(node.type)){
        // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js
        console.assert(fiber.tag === 16)
        if(node.type._status === 1){
            return dryRender(React.createElement(node.type._result, node.props))
        }else{
            console.log('Lazy component not yet resolved....')
            return
        }
    }else if(typeof node.type === 'string'){
        console.log('Host component', node.type)
        dryRender(node.props.children, fiber && fiber.child)
    }else if(typeof node.type === 'function' && node.type.prototype && node.type.prototype.isReactComponent){
        console.log('Class component', node.type.name, fiber, fiber && fiber.memoizedState)
        // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        let stateNode = new node.type(node.props, /* TODO: legacy context API */);
        stateNode.props = node.props;
        if(fiber) stateNode.state = readLatestClassComponentState(fiber);
        
        let originalLegacyContext = _currentLegacyContext;
        if(ALLOW_LEGACY_CONTEXT_API && node.type.childContextTypes){
            _currentLegacyContext = {
                // pull in the context from the existing node if it exists, but at a lower
                // priority than any of the things which are already stored in the legacy context
                ...(fiber ? fiber.stateNode.__reactInternalMemoizedMergedChildContext : {}),
                ..._currentLegacyContext,
                ...stateNode.getChildContext()
            }
        }

        if(ALLOW_LEGACY_CONTEXT_API && node.type.contextTypes){
            stateNode.context = _currentLegacyContext;
        }else if(node.type.contextType){
            stateNode.context = node.type.contextType._currentValue
        }

        try {
            let nextChildren;
            nextChildren = stateNode.render()
            dryRender(nextChildren, fiber && fiber.child)
        } finally {
            _currentLegacyContext = originalLegacyContext;
        }
    }else if(typeof node.type === 'function'){
        console.log('Functional component', node.type.name)
        let nextChildren;
        let legacyContext;
        if(fiber) _currentHookState = readLatestHooksState(fiber);
        
        if(ALLOW_LEGACY_CONTEXT_API && node.type.contextTypes) legacyContext = _currentLegacyContext;
        // We need to override the current dispatcher which is how React resolves .useEffect, .useState, etc
        // https://twitter.com/dan_abramov/status/1055724109399638017?lang=en
        const DispatcherRef = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
        const previousDispatcher = DispatcherRef.current;
        try {
            DispatcherRef.current = DryRenderDispatcher;
            nextChildren = node.type(node.props, legacyContext);
        } finally {
            DispatcherRef.current = previousDispatcher;
        }
        dryRender(nextChildren, fiber && fiber.child)
    }else if(ReactIs.isContextProvider(node)){
        console.log("PROVIDING SOME CONTEXT", node.props.value, node.type)
        let context = node.type._context,
            initialValue = context._currentValue;
        // Note that we're modifying context._currentValue
        // which is what React is also doing so there may be
        // some problems here if React runs while we're running but that
        // shouldn't be able to happen.
        try {
            context._currentValue = node.props.value;
            dryRender(node.props.children, fiber && fiber.child)
        } finally {
            context._currentValue = initialValue
        }
    }else if(ReactIs.isContextConsumer(node)){
        let context = node.type._context;
        console.log('CONSUMING A CONTEXT', context)
        dryRender(node.props.children(context._currentValue), fiber && fiber.child)
    }else if(ReactIs.isSuspense(node)){
        if(fiber){
            console.assert(fiber.child.tag === 7)
        }
        dryRender(node.props.children, fiber && fiber.child.child);
    }else if(ReactIs.isStrictMode(node) || ReactIs.isConcurrentMode(node) || ReactIs.isProfiler(node)){
        dryRender(node.props.children, fiber && fiber.child)
    }else if(ReactIs.isForwardRef(node)){
        let nextChildren = node.type.render(node.props, node.ref);
        dryRender(nextChildren, fiber && fiber.child)
    }else{
        debugger
    }
}

function readLatestClassComponentState(fiber){
    // if(fiber && fiber.memoizedState) el.state = fiber.memoizedState;
    // if(fiber && fiber.updateQueue && fiber.updateQueue.firstUpdate){
    //     let update = fiber.updateQueue.firstUpdate;
    //     do {
    //         if(update.tag == 0){ // update state
    //             el.state = { ...el.state, ...update.payload };
    //         }else if(update.tag == 1){ // replace state
    //             el.state = update.payload;
    //         }
    //     } while (update = update.next);
    // }
    return fiber.alternate ? 
        fiber.alternate.memoizedState: // also traverse updateQueue
        fiber.memoizedState
}

function readLatestHooksState(fiber){
    return fiber.memoizedState
}



function nextHook(){
    let currentHook = _currentHookState;
    if(currentHook){
        _currentHookState = currentHook.next;
    }
    console.log('next hook please', currentHook)
    return currentHook;
}

const DryRenderDispatcher = {
    // TODO: look into ._currentValue2 used for secondary renderers like React ART
    // TODO: look up contexts that are set within  the dry render process first
    useContext: (context) => {
        return context._currentValue;
    },

    useReducer: (reducer, initialArg, init) => {
        let hook = nextHook()
        let value;
        if(hook) {
            // value = hook.memoizedState;
            if(hook.queue){
                // we use the latest state we can possibly have access to
                value = hook.queue.lastRenderedState
            }else{
                value = hook.memoizedState;    
            }
        }else{
            value = (init !== undefined) ? init(initialArg) : initialArg;
        }
        return [ value, () => {} ]
    },
    
    useState: (initialState) => {
        return DryRenderDispatcher.useReducer(basicStateReducer, initialState)
    },

    // TODO: don't ignore deps
    useMemo: (nextCreate, deps) => {
        nextHook()
        return nextCreate()
    },

    useCallback: (callback, deps) => {
        return DryRenderDispatcher.useMemo(() => callback, deps)
    },

    useEffect: (create, deps) => { nextHook() },
    useImperativeHandle: (create, ref) => { nextHook() },
    useLayoutEffect: (create, deps) => { nextHook() },
    useRef: () => {
        nextHook()
        return { current: null }
    },
    useDebugValue: (value) => {},
}

// copied from react-reconciler internals
function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action;
}

function mapChildFibers(fiber){
    // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactChildFiber.js#L281
    // Based on mapRemainingChildren in ReactChildFiber
    let childFibers = new Map()
    let ptr = fiber;
    while(ptr){
        childFibers.set(ptr.key !== null ? ptr.key : ptr.index, ptr)
        ptr = ptr.sibling;
    }
    return childFibers
}
