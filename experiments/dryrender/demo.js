import React, { useEffect, useState } from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as ReactIs from 'react-is'

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

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

const LEGACY_CONTEXT_API = true;
let _currentLegacyContext = {}
let _currentHookState;

function dryRender(node, fiber){
    // console.group(node.type.toString())
    // if(fiber && fiber.tag === 7){ 
    //     // ReactWorkTags.js Fragment
    //     // Sometimes we have to deal with child arrays that have
    //     //  an actual array thing...
    //     fiber = fiber.child
    // }

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
    }else if(typeof node === 'string' || typeof node === 'number'){
        console.log('String', node)
    }else if(ReactIs.isFragment(node)){
        dryRender(node.props.children, fiber)
    }else if(ReactIs.isPortal(node)){
        console.assert(fiber.tag === 4)
        console.assert(fiber.type === null)
        dryRender(node.children, fiber && fiber.child)
    }else{
        let nodeType = node.type;

        if(fiber && fiber.elementType !== nodeType){
            console.log("Fiber-node type mismatch", fiber.elementType, node.type)
            debugger
            fiber = null;
        }
        
        if(ReactIs.isMemo(nodeType)){
            // we ignore shouldComponentUpdate / memo directives and always re-render
            nodeType = nodeType.type;
        }else if(ReactIs.isLazy(nodeType)){
            // https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactFiberLazyComponent.js
            if(nodeType._status === 1){
                nodeType = nodeType._result
            }else{
                console.log('Lazy component not yet resolved....')
                return
            }
        }
        if(typeof nodeType === 'string'){
            console.log('Host component', nodeType)
            dryRender(node.props.children, fiber && fiber.child)
        }else if(typeof nodeType === 'function' && nodeType.prototype && nodeType.prototype.isReactComponent){
            console.log('Class component', nodeType.name, fiber, fiber.memoizedState)
            // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
            let stateNode = new nodeType(node.props, /* TODO: legacy context API */);
            stateNode.props = node.props;
            if(fiber){
                stateNode.state = fiber.alternate ? 
                    fiber.alternate.memoizedState: // also traverse updateQueue
                    fiber.memoizedState
            }
            
            let originalLegacyContext = _currentLegacyContext;
            if(LEGACY_CONTEXT_API && nodeType.childContextTypes){
                _currentLegacyContext = {
                    // pull in the context from the existing node if it exists, but at a lower
                    // priority than any of the things which are already stored in the legacy context
                    ...(fiber ? fiber.stateNode.__reactInternalMemoizedMergedChildContext : {}),
                    ..._currentLegacyContext,
                    ...stateNode.getChildContext()
                }
            }

            if(LEGACY_CONTEXT_API && nodeType.contextTypes){
                stateNode.context = _currentLegacyContext;
            }else if(nodeType.contextType){
                stateNode.context = nodeType.contextType._currentValue
            }

            try {
                let nextChildren;
                nextChildren = stateNode.render()
                dryRender(nextChildren, fiber && fiber.child)
            } finally {
                _currentLegacyContext = originalLegacyContext;
            }
        }else if(typeof nodeType === 'function'){
            console.log('Functional component', nodeType.name)
            let previousDispatcher = ReactInternals.ReactCurrentDispatcher.current;
            let nextChildren;
            let legacyContext;
            if(fiber){
                _currentHookState = fiber.memoizedState;
            }
            if(nodeType.contextTypes){
                legacyContext = _currentLegacyContext;
            }
            try {
                ReactInternals.ReactCurrentDispatcher.current = DryRenderDispatcher;
                nextChildren = nodeType(node.props, legacyContext);
            } finally {
                ReactInternals.ReactCurrentDispatcher.current = previousDispatcher;
            }
            dryRender(nextChildren, fiber && fiber.child)
        }else if(ReactIs.isContextProvider(node)){
            console.log("PROVIDING SOME CONTEXT", node.props.value, nodeType)
            let context = nodeType._context,
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
            let context = nodeType._context;
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
            let nextChildren = nodeType.render(node.props, node.ref);
            dryRender(nextChildren, fiber && fiber.child)
        }else{
            debugger
        }
    }
    // console.groupEnd(node.type.toString())
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
            value = hook.memoizedState;
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
    useDebugValue: () => {},
}

// copied from react-reconciler
function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action;
}




function Link(props){
    return <a href={props.page}>{props.children}</a>
}


function elementFromFiber(fiber){
    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}

function findFiberRoot(node){
    while(node.return) node = node.return;
    return node;
}


class LegacyContextProvider extends React.Component {
    static childContextTypes = {
        color: PropTypes.string
    }
    getChildContext() {
        return {color: "purple"};
    }
    render(){
        return <div>{this.props.children}</div>
    }
}


class LegacyContextConsumer extends React.Component {
    static contextTypes = {
        color: PropTypes.string
    }
    render(){
        return <div>{this.context.color}</div>
    }
}

function LegacyContextFunction(props, context){
    return <div>{context.color}</div>
}
LegacyContextFunction.contextTypes = {
    color: PropTypes.string
}

class DemoComponent extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'hello'
        }
    }
    render(){
        this.props.logState(this.state.message)
        return <div>{this.state.message}</div>
    }
}

function LogChildren(props){
    console.log('log children', props.children)
    return <div>{props.children}</div>
}

const FancyButton = React.forwardRef((props, ref) => (
    <input ref={ref} type="button" className="FancyButton">
      {props.children}
    </input>
  ));
  

function Dummy(){
    return <div>loaded!</div>
}

// const LazyDummy = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(Dummy), 1000)))
const LazyDummy = React.lazy(() => new Promise((resolve) => resolve({
    'default': Dummy
})))

const MemoLogChildren = React.memo(LogChildren)

function DemoStateful(){
    let [ message, setMessage ] = useState("wat")
    let magicday = React.useContext(MagicDay)
    console.log('my hooks message', message, magicday)
    return <button onClick={e => {
        setMessage('yolo')
    }}>{message}{magicday}</button>
}

let MagicDay = React.createContext(420)


function FragTurner(){
    return <React.Fragment>
        <li>hello</li>
        <li>world</li>
        {[
            <li key="blerp">hi</li>,
            <li key="blerpx">sup</li>
        ]}
    </React.Fragment>
}

function ForwardTest(){    
    const ref = React.createRef();
    return <FancyButton ref={ref}>Click me!</FancyButton>;
}


function ThinkWithPortals(props){
    return ReactDOM.createPortal(props.children, {
        nodeType: 1,
        children: []
    })
}
// const el = <React.StrictMode kdey="sdaf">
//     <Link page="http://www.facebook.com">Facebook</Link>
// </React.StrictMode>
const el = <div>

<LegacyContextProvider>
        <LegacyContextConsumer />
        <LegacyContextFunction />
    </LegacyContextProvider>
    <React.StrictMode><div>
    <MagicDay.Provider value={777}>
        <Link page="http://www.facebook.com">
            <DemoStateful />
        </Link>
        <MagicDay.Consumer>{value => <MemoLogChildren>{value}</MemoLogChildren>}</MagicDay.Consumer>
    </MagicDay.Provider>
    
    <Link page="http://www.google.com">
        <DemoComponent logState={e => {
            console.log('hi logg', e)
        }}/>
    </Link>
    <ForwardTest />
    <ThinkWithPortals>
        <div>hi</div>
    </ThinkWithPortals>
    <React.Suspense fallback={<div>loading...</div>}>
        <LazyDummy />
    </React.Suspense>
</div>
<FragTurner />
</React.StrictMode></div>;


// const el = [<React.StrictMode key="blah">{[<DemoComponent key="xyz" logState={e => {
//     console.log('logging state from prop', e)
// }} />]}</React.StrictMode>, <div key="derp">thing</div>]

const component = renderer.create(el);

let f = component.root._fiber;
// console.log(React.createElement(f.type, { ...f.pendingProps } ))
// console.log(component.toJSON())
component.root.findByType(DemoComponent).instance.setState({
    message: 'zombocom'
})

component.root.findByType('button').props.onClick()

// console.log(component.toJSON())
// console.log(el)
let root = findFiberRoot(component.root._fiber);
console.assert(!root.type)
console.assert(root.tag === 3)
console.log(root)



setTimeout(() => {
    dryRender(elementFromFiber(root.child), root.child)
    debugger
}, 0)



// setTimeout(function(){}, 100000000)

// debugger