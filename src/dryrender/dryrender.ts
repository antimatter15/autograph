import * as React from 'react'
import * as ReactIs from 'react-is'

// TODO: check out https://github.com/airbnb/enzyme/blob/master/packages/enzyme-adapter-react-16/src/ReactSixteenAdapter.js
// TODO: add findCurrentFiberUsingSlowPath, because we're clearly getting the wrong fiber sometimes....

const ALLOW_LEGACY_CONTEXT_API = true

let _currentLegacyContext = {}
let _currentHookState: HookState

type ReactFiber = {
    child: ReactFiber
    tag: number
    type: any
    memoizedState: any
    memoizedProps: any
    stateNode?: any
    key: any
    index: number
    sibling: ReactFiber
    return: ReactFiber
    updateQueue: any
}

// interface React {
//     __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any
// }

export function elementFromFiber(fiber: ReactFiber) {
    let props = { ...fiber.memoizedProps }
    if (fiber.key) props.key = fiber.key
    return React.createElement(fiber.type, props)
}

export function findFiberRoot(fiber: ReactFiber) {
    while (fiber.return) fiber = fiber.return
    return fiber
}

export default function dryRender(node: React.ReactNode, fiber: ReactFiber | null): void {
    if (Array.isArray(node)) {
        let childFibers = mapSiblingFibers(fiber)
        for (let i = 0; i < node.length; i++) {
            let child: any = node[i]
            // try {
            // TODO: add test for when child is null/undefined
            if (!child) continue
            dryRender(child, childFibers.get(child.key != null ? child.key : i))
            // } catch (err) {
            //     console.error(err)
            // }
        }
        // console.log('Array/Fragment')
        return
    } else if (typeof node === 'string' || typeof node === 'number' || !node) {
        // console.log('String', node)
        return
    } else if (ReactIs.isFragment(node)) {
        return dryRender(node.props.children, fiber)
    } else if (ReactIs.isPortal(node)) {
        if (fiber) {
            console.assert(fiber.tag === 4)
            console.assert(fiber.type === null)
        }
        return dryRender((node as React.ReactPortal).children, fiber && fiber.child)
    } else if (ReactIs.isMemo((node as JSX.Element).type)) {
        // we ignore shouldComponentUpdate / memo directives and always re-render
        return dryRender(
            React.createElement((node as JSX.Element).type.type, (node as JSX.Element).props),
            fiber && fiber.child
        )
    } else if (ReactIs.isLazy((node as JSX.Element).type)) {
        // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js
        // if(fiber){
        //     console.assert(fiber.tag === 16)
        // }
        if ((node as JSX.Element).type._status === 1) {
            return dryRender(
                React.createElement(
                    (node as JSX.Element).type._result,
                    (node as JSX.Element).props
                ),
                fiber
            )
        } else {
            console.log('Lazy component not yet resolved....')
            return
        }
    }
    

    if (fiber && !(fiber.type === (node as JSX.Element).type)) {
        console.log('Fiber-node type mismatch', fiber.tag, fiber.type, (node as JSX.Element).type)
        // debugger
        fiber = null as any
    }

    if (typeof (node as JSX.Element).type === 'string') {
        // console.log('Host component', (node as JSX.Element).type)
        dryRender((node as JSX.Element).props.children, fiber && fiber.child)
    } else if (
        typeof (node as JSX.Element).type === 'function' &&
        (node as JSX.Element).type.prototype &&
        (node as JSX.Element).type.prototype.isReactComponent
    ) {
        // console.log('Class component', (node as JSX.Element).type.name)
        // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        let stateNode = new (node as JSX.Element).type(
            (node as JSX.Element).props /* TODO: legacy context API */
        )
        stateNode.props = (node as JSX.Element).props
        if (fiber)
            stateNode.state = readLatestClassComponentState(
                fiber,
                stateNode,
                (node as JSX.Element).props
            )

        let originalLegacyContext = _currentLegacyContext
        if (ALLOW_LEGACY_CONTEXT_API && (node as JSX.Element).type.childContextTypes) {
            _currentLegacyContext = {
                ..._currentLegacyContext,
                ...stateNode.getChildContext(),
            }
        }

        if (ALLOW_LEGACY_CONTEXT_API && (node as JSX.Element).type.contextTypes) {
            stateNode.context = readLegacyContext(fiber, (node as JSX.Element).type.contextTypes)
        } else if ((node as JSX.Element).type.contextType) {
            stateNode.context = (node as JSX.Element).type.contextType._currentValue
        }

        try {
            let nextChildren
            nextChildren = stateNode.render()
            dryRender(nextChildren, fiber && fiber.child)
        } finally {
            _currentLegacyContext = originalLegacyContext
        }
    } else if (typeof (node as JSX.Element).type === 'function') {
        // console.log('Functional component', (node as JSX.Element).type.name)
        let nextChildren
        let legacyContext
        if (fiber) _currentHookState = fiber.memoizedState

        if (ALLOW_LEGACY_CONTEXT_API && (node as JSX.Element).type.contextTypes)
            legacyContext = readLegacyContext(fiber, (node as JSX.Element).type.contextTypes)
        // We need to override the current dispatcher which is how React resolves .useEffect, .useState, etc
        // https://twitter.com/dan_abramov/status/1055724109399638017?lang=en
        const DispatcherRef = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentDispatcher
        const previousDispatcher = DispatcherRef.current
        try {
            DispatcherRef.current = DryRenderHooksDispatcher
            nextChildren = (node as JSX.Element).type((node as JSX.Element).props, legacyContext)
        } finally {
            DispatcherRef.current = previousDispatcher
        }
        dryRender(nextChildren, fiber && fiber.child)
    } else if (ReactIs.isContextProvider(node)) {
        let context = (node as JSX.Element).type._context,
            initialValue = context._currentValue
        // Note that we're modifying context._currentValue, which may be problematic
        // if React ends up running before we restore it to the initial value.
        try {
            context._currentValue = (node as JSX.Element).props.value
            dryRender((node as JSX.Element).props.children, fiber && fiber.child)
        } finally {
            context._currentValue = initialValue
        }
    } else if (ReactIs.isContextConsumer(node)) {
        let context = (node as JSX.Element).type._context
        dryRender(node.props.children(context._currentValue), fiber && fiber.child)
    } else if (ReactIs.isSuspense(node)) {
        let fiberChild = fiber && fiber.child;
        // It appears that sometimes Suspense fallbacks and children are embedded inside a fragment
        // of the suspense element. This is a total hack and we don't have a good unit test which demonstrates
        // this issue.
        dryRender(node.props.children, (fiberChild && fiberChild.tag == 7 && fiberChild.child) ? fiberChild.child : fiberChild)
        // dryRender(node.props.children, fiberChild)        
    } else if (ReactIs.isStrictMode(node) || ReactIs.isProfiler(node)) {
        dryRender(node.props.children, fiber && fiber.child)
    } else if (ReactIs.isForwardRef(node)) {
        let nextChildren = (node as JSX.Element).type.render(
            (node as JSX.Element).props,
            (node as any).ref
        )
        dryRender(nextChildren, fiber && fiber.child)
    } else {
        console.warn('unhandled node type', (node as JSX.Element).type)
    }
}

// Crawls up the fiber return stack to figure out what legacy context fields exist, and merge
// them into the current legacy context object, before filtering them down to the ones which
// are requested.
function readLegacyContext(fiber: ReactFiber | null, contextTypes: any) {
    let legacyContext = { ..._currentLegacyContext }
    if (fiber) {
        do {
            if (fiber.stateNode)
                legacyContext = Object.assign(
                    {},
                    fiber.stateNode.__reactInternalMemoizedMergedChildContext || {},
                    legacyContext
                )
        } while ((fiber = fiber.return))
    }
    let filteredLegacyContext = {}
    for (let key in contextTypes) filteredLegacyContext[key] = legacyContext[key]
    return filteredLegacyContext
}

function readLatestClassComponentState(fiber: ReactFiber, stateNode: any, props: any) {
    let state = fiber.memoizedState

    if (fiber.updateQueue && fiber.updateQueue.firstUpdate) {
        let update = fiber.updateQueue.firstUpdate
        do {
            // Reference: https://github.com/facebook/react/blob/4c78ac0b9df88edec73492f92f09d5438dd74c4d/packages/react-reconciler/src/ReactUpdateQueue.js#L342
            if (update.tag === 0 /* UPDATE STATE */ || update.tag === 1 /* REPLACE STATE */) {
                let partialState = update.payload
                if (typeof update.payload === 'function')
                    partialState = update.payload.call(stateNode, state, props)
                state = update.tag === 0 ? { ...state, ...partialState } : partialState
            }
        } while ((update = update.next))
    }
    return state
}

function nextHook() {
    let currentHook = _currentHookState
    if (currentHook) {
        _currentHookState = currentHook.next
    }
    // console.log('next hook please', currentHook)
    return currentHook
}

interface HookState {
    next: HookState
    memoizedState: any
    queue: any
}

const DryRenderHooksDispatcher = {
    // TODO: look into ._currentValue2 used for secondary renderers like React ART
    // TODO: look up contexts that are set within  the dry render process first
    useContext: <T>(context: React.Context<T>) => {
        return (context as any)._currentValue
    },

    useReducer: (reducer: any, initialArg: any, init?: any) => {
        let hook = nextHook()
        let value
        if (hook) {
            // TODO: we need to rewrite this so that this actually makes sense

            // we use the latest state we can possibly have access to
            if (hook.queue && hook.queue.last && hook.queue.last.eagerState) {
                value = hook.queue.last.eagerState
            } else if (hook.queue) {
                value = hook.queue.lastRenderedState
            } else {
                value = hook.memoizedState
            }
        } else {
            value = init !== undefined ? init(initialArg) : initialArg
        }
        return [value, () => {}]
    },

    useState: <S>(initialState: S | (() => S)) => {
        if (typeof initialState === 'function') {
            return DryRenderHooksDispatcher.useReducer(() => {}, undefined, initialState)
        } else {
            return DryRenderHooksDispatcher.useReducer(() => {}, initialState)
        }
    },

    // TODO: don't ignore deps
    useMemo: (factory: () => any, deps?: any[]): any => {
        nextHook()
        return factory()
    },

    useCallback: (callback: (...args: any[]) => void, deps?: any[]) => {
        return DryRenderHooksDispatcher.useMemo(() => callback, deps)
    },

    useEffect: (effect: React.EffectCallback, deps?: any[]) => {
        nextHook()
    },
    useImperativeHandle: (ref: any, init: any, deps?: any[]) => {
        nextHook()
    },
    useLayoutEffect: (effect: React.EffectCallback, deps?: any[]) => {
        nextHook()
    },
    useRef: () => {
        nextHook()
        return { current: null }
    },
    useDebugValue: <T>(value: T, format?: (value: T) => any) => {},
}

function mapSiblingFibers(fiber: ReactFiber | null) {
    // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactChildFiber.js#L281
    // Based on mapRemainingChildren in ReactChildFiber
    let childFibers = new Map()
    let ptr = fiber
    if (fiber && fiber.tag === 7 /* FRAGMENT */) {
        let fptr = fiber.child;
        while (fptr) {
            childFibers.set(fptr.key !== null ? fptr.key : fptr.index, fptr)
            fptr = fptr.sibling
        }
    }
    while (ptr) {
        childFibers.set(ptr.key !== null ? ptr.key : ptr.index, ptr)
        ptr = ptr.sibling
    }
    return childFibers
}
