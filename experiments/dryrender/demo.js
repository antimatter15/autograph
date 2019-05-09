import React, { useEffect, useState } from 'react';
import renderer from 'react-test-renderer';
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

function dryRender(node, fiber){
    // console.group(node.type.toString())
    if(Array.isArray(node)){
        let childFibers = mapChildFibers(fiber)
        for(let i = 0; i < node.length; i++){
            let child = node[i];
            dryRender(child, childFibers.get(child.key !== null ? child.key : i))
        }
        console.log('Array/Fragment', node)
    }else if(typeof node === 'string' || typeof node === 'number'){
        console.log('String', node)
    }else{
        if(fiber && fiber.type !== node.type){
            console.log("Fiber-node type mismatch", fiber.type, node.type)
            fiber = null;
        }
        if(ReactIs.isContextProvider(node)){
            console.log("PROVIDING SOME CONTEXT", node.props.value)
            dryRender(node.props.children, fiber && fiber.child)
        }else if(typeof node.type === 'string'){
            console.log('Host component', node.type)
            dryRender(node.props.children, fiber && fiber.child)
        }else if(typeof node.type === 'function' && node.type.prototype && node.type.prototype.isReactComponent){
            console.log('Class component', node.type.name, fiber, fiber.memoizedState)
            // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
            let stateNode = new node.type(node.props, /* TODO: legacy context API */);
            stateNode.props = node.props;
            stateNode.state = fiber.alternate.memoizedState // also traverse updateQueue
            let nextChildren;
            try {
                nextChildren = stateNode.render()
            } finally {

            }
            dryRender(nextChildren, fiber && fiber.child)
        }else if(typeof node.type === 'function'){
            console.log('Functional component', node.type.name)
            let previousDispatcher = ReactInternals.ReactCurrentDispatcher.current;
            let nextChildren;
            if(fiber){
                DryRenderDispatcher._currentHook = fiber.memoizedState;
            }
            try {
                ReactInternals.ReactCurrentDispatcher.current = DryRenderDispatcher;
                nextChildren = node.type(node.props, /* TODO: legacy context API */);
            } finally {
                ReactInternals.ReactCurrentDispatcher.current = previousDispatcher;
            }
            dryRender(nextChildren, fiber && fiber.child)
        }
    }
    // console.groupEnd(node.type.toString())
}

function nextHook(){
    let currentHook = DryRenderDispatcher._currentHook;
    if(currentHook){
        DryRenderDispatcher._currentHook = currentHook.next;
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
    if(fiber.ref) props.ref = fiber.ref;
    return React.createElement(fiber.type, props)
}

function findFiberRoot(node){
    while(node.return) node = node.return;
    return node;
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


function DemoStateful(){
    let [ message, setMessage ] = useState("wat")
    let magicday = React.useContext(MagicDay)
    console.log('my hooks message', message, magicday)
    return <button onClick={e => {
        setMessage('yolo')
    }}>{message}{magicday}</button>
}

let MagicDay = React.createContext(420)


// const el = <React.StrictMode kdey="sdaf">
//     <Link page="http://www.facebook.com">Facebook</Link>
// </React.StrictMode>
const el = <div>
    <MagicDay.Provider value={777}>
        <Link page="http://www.facebook.com">
            <DemoStateful />
        </Link>
    </MagicDay.Provider>
    <Link page="http://www.google.com">
        <DemoComponent logState={e => {
            console.log('hi logg', e)
        }}/>
    </Link>
</div>;

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

dryRender(elementFromFiber(root.child), root.child)


// setTimeout(function(){}, 100000000)

debugger