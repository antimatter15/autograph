import React from 'react';
import * as ReactIs from 'react-is'
import { Exception } from 'handlebars';

const ALLOW_LEGACY_CONTEXT_API = true;

let _currentLegacyContext = {}
let _currentHookState;

export default function dryRender(node, fiber){
    if(Array.isArray(node)){
        let childFibers = mapChildFibers(fiber)
        for(let i = 0; i < node.length; i++){
            let child = node[i];
            // try {
            dryRender(child, childFibers.get((child.key != null) ? child.key : i))
            // } catch (err) {
            //     console.error(err)
            // }
        }
        console.log('Array/Fragment')
        return
    }else if(typeof node === 'string' || typeof node === 'number' || !node){
        console.log('String', node)
        return
    }else if(ReactIs.isFragment(node)){
        return dryRender(node.props.children, fiber)
    }else if(ReactIs.isPortal(node)){
        if(fiber){
            console.assert(fiber.tag === 4)
            console.assert(fiber.type === null)
        }
        return dryRender(node.children, fiber && fiber.child)
    }else if(ReactIs.isMemo(node.type)){
        // we ignore shouldComponentUpdate / memo directives and always re-render
        return dryRender(React.createElement(node.type.type, node.props), fiber && fiber.child)
    }else if(ReactIs.isLazy(node.type)){
        // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js
        // if(fiber){
        //     console.assert(fiber.tag === 16)
        // }
        if(node.type._status === 1){
            return dryRender(React.createElement(node.type._result, node.props), fiber)
        }else{
            console.log('Lazy component not yet resolved....')
            return
        }
    }

    if(fiber && !(
        fiber.type === node.type
    )){
        console.log("Fiber-node type mismatch", fiber.type, node.type)
        debugger
        fiber = null;
    }

    if(typeof node.type === 'string'){
        console.log('Host component', node.type)
        dryRender(node.props.children, fiber && fiber.child)
    }else if(typeof node.type === 'function' && node.type.prototype && node.type.prototype.isReactComponent){
        console.log('Class component', node.type.name, fiber && fiber.memoizedState)
        // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        let stateNode = new node.type(node.props, /* TODO: legacy context API */);
        stateNode.props = node.props;
        if(fiber) stateNode.state = readLatestClassComponentState(fiber, stateNode, node.props);
        
        let originalLegacyContext = _currentLegacyContext;
        if(ALLOW_LEGACY_CONTEXT_API && node.type.childContextTypes){
            _currentLegacyContext = {
                ..._currentLegacyContext,
                ...stateNode.getChildContext()
            }
        }

        if(ALLOW_LEGACY_CONTEXT_API && node.type.contextTypes){
            stateNode.context = readLegacyContext(fiber, node.type.contextTypes);
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
        console.log('Functional component', node.type.name, fiber)
        let nextChildren;
        let legacyContext;
        if(fiber) _currentHookState = fiber.memoizedState;
        
        if(ALLOW_LEGACY_CONTEXT_API && node.type.contextTypes) legacyContext = readLegacyContext(fiber, node.type.contextTypes);
        // We need to override the current dispatcher which is how React resolves .useEffect, .useState, etc
        // https://twitter.com/dan_abramov/status/1055724109399638017?lang=en
        const DispatcherRef = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
        const previousDispatcher = DispatcherRef.current;
        try {
            DispatcherRef.current = DryRenderHooksDispatcher;
            nextChildren = node.type(node.props, legacyContext);
        } finally {
            DispatcherRef.current = previousDispatcher;
        }
        dryRender(nextChildren, fiber && fiber.child)
    }else if(ReactIs.isContextProvider(node)){
        let context = node.type._context,
            initialValue = context._currentValue;
        // Note that we're modifying context._currentValue, which may be problematic
        // if React ends up running before we restore it to the initial value. 
        try {
            context._currentValue = node.props.value;
            dryRender(node.props.children, fiber && fiber.child)
        } finally {
            context._currentValue = initialValue
        }
    }else if(ReactIs.isContextConsumer(node)){
        let context = node.type._context;
        dryRender(node.props.children(context._currentValue), fiber && fiber.child)
    }else if(ReactIs.isSuspense(node)){
        dryRender(node.props.children, fiber && fiber.child);
    }else if(ReactIs.isStrictMode(node) || ReactIs.isConcurrentMode(node) || ReactIs.isProfiler(node)){
        dryRender(node.props.children, fiber && fiber.child)
    }else if(ReactIs.isForwardRef(node)){
        let nextChildren = node.type.render(node.props, node.ref);
        dryRender(nextChildren, fiber && fiber.child)
    }else{
        throw new Exception('unhandled node type')
    }
}

// Crawls up the fiber return stack to figure out what legacy context fields exist, and merge
// them into the current legacy context object, before filtering them down to the ones which
// are requested. 
function readLegacyContext(fiber, contextTypes){
    let legacyContext = { ..._currentLegacyContext }
    if(fiber){
        do {
            if(fiber.stateNode)
                legacyContext = Object.assign({}, fiber.stateNode.__reactInternalMemoizedMergedChildContext || {}, legacyContext);
        } while (fiber = fiber.return)
    }
    let filteredLegacyContext = {};
    for(let key in contextTypes) filteredLegacyContext[key] = legacyContext[key];
    return filteredLegacyContext;
}


function readLatestClassComponentState(fiber, stateNode, props){
    let state = fiber.memoizedState;
    
    if(fiber.updateQueue && fiber.updateQueue.firstUpdate){
        let update = fiber.updateQueue.firstUpdate;
        do {
            // Reference: https://github.com/facebook/react/blob/4c78ac0b9df88edec73492f92f09d5438dd74c4d/packages/react-reconciler/src/ReactUpdateQueue.js#L342
            if(update.tag === 0 /* UPDATE STATE */ || update.tag === 1 /* REPLACE STATE */){ 
                let partialState = update.payload;
                if(typeof update.payload === 'function')
                    partialState = update.payload.call(stateNode, state, props);
                state = update.tag === 0 ? { ...state, ...partialState } : partialState;
            }
        } while (update = update.next);
    }
    return state
}

function nextHook(){
    let currentHook = _currentHookState;
    if(currentHook){
        _currentHookState = currentHook.next;
    }
    console.log('next hook please', currentHook)
    return currentHook;
}

const DryRenderHooksDispatcher = {
    // TODO: look into ._currentValue2 used for secondary renderers like React ART
    // TODO: look up contexts that are set within  the dry render process first
    useContext: (context) => {
        return context._currentValue;
    },

    useReducer: (reducer, initialArg, init) => {
        let hook = nextHook()
        let value;
        if(hook) {
            // TODO: we need to rewrite this so that this actually makes sense
            
            // we use the latest state we can possibly have access to
            if(hook.queue && hook.queue.last && hook.queue.last.eagerState){
                value = hook.queue.last.eagerState
            }else if(hook.queue){
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
        return DryRenderHooksDispatcher.useReducer(() => {}, initialState)
    },

    // TODO: don't ignore deps
    useMemo: (nextCreate, deps) => {
        nextHook()
        return nextCreate()
    },

    useCallback: (callback, deps) => {
        return DryRenderHooksDispatcher.useMemo(() => callback, deps)
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

function mapChildFibers(fiber){
    // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactChildFiber.js#L281
    // Based on mapRemainingChildren in ReactChildFiber
    let childFibers = new Map()
    let ptr = fiber;
    if(fiber && fiber.tag === 7 /* FRAGMENT */){
        ptr = fiber.child;
    }
    while(ptr){
        childFibers.set(ptr.key !== null ? ptr.key : ptr.index, ptr)
        ptr = ptr.sibling;
    }
    return childFibers
}
