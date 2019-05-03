import React, { useState } from 'react'
import ReactIs from 'react-is'


global.React = React;

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// GraphQL From the Future
// Or, Lambda: The Ultimate GraphQL Client

// Won't this be incredibly slow? 
// React already renders your components twice whenever you're
// in developer mode. Didn't notice? Autograph's pre-rendering
// is much more lightweight than React's full rendering and 
// reconciliation process. 

// this is our stand-in for autograph
export default function useMetastate(dataFetcher){
    // check if we are in a dream?
    let currentOwner = ReactInternals.ReactCurrentOwner.current;
    let currentDispatcher = ReactInternals.ReactCurrentDispatcher.current;
    
    if(currentDispatcher.__MetastateSentinel){
        return currentDispatcher.__MetastateSentinel;
    }

    let [ updateCount, triggerUpdate ] = useState(0);

    console.log('we are in the base reality', currentOwner)

    let [ dispatcher, updateDispatcher] = useState(() => ({
        __fetchedData: {},
        __MetastateFields: [],
        __MetastateCurrentState: null,
        __MetastateSentinel: {
            requestedFields: [],
            get(key){
                dispatcher.__MetastateFields.push(key)
            }
        },

        useReducer(reducer, initialArg, init){
            let currentState = dispatcher.__MetastateCurrentState;
            let value;
            if(currentState){
                dispatcher.__MetastateCurrentState = currentState.next;    
                if(currentState.queue){
                    // we use the latest state we can possibly have access to
                    value = currentState.queue.lastRenderedState
                }else{
                    value = currentState.memoizedState;    
                }
            }else{
                value = (init !== undefined) ? init(initialArg) : initialArg;
            }
            console.log('value from dream reducer', value)
            return [
                value,
                () => console.log('dispatch is noop in dream')
            ]
        },
        useState(initialState){
            // copied from react-reconciler
            function basicStateReducer(state, action) {
                return typeof action === 'function' ? action(state) : action;
            }
            return dispatcher.useReducer(basicStateReducer, initialState)
        },
        useCallback(fn, deps){
            return dispatcher.useMemo(() => fn, deps)
        },
        useMemo(fn, deps){
            throw new Error('useMemo not implemented')
        }
    }))

    function triggerVirtualRender(){
        console.groupCollapsed('dreaming')
        let earlierDispatcher = ReactInternals.ReactCurrentDispatcher.current;
        ReactInternals.ReactCurrentDispatcher.current = dispatcher;
        fakeRender2(
            { type: currentOwner.type, props: currentOwner.pendingProps }, 
            currentOwner, 
            dispatcher,
        )
        ReactInternals.ReactCurrentDispatcher.current = earlierDispatcher;
        console.groupEnd('dreaming')
    }

    
    // triggerVirtualRender()
    // console.log(dispatcher.__MetastateFields)
    // let fetchedData = dataFetcher(dispatcher.__MetastateFields)
    // let fetchedData = {}

    dispatcher.__fetchedData = dataFetcher(dispatcher.__MetastateFields);

    return {
        requestedFields: dispatcher.__MetastateFields,
        get(field){
            if(!dispatcher.__MetastateFields.includes(field)){
                console.warn('TRIGGERING UPDATE', field)
                
                triggerUpdate(updateCount + 1) // this will cause the parent autograph root to re-render

                dispatcher.__MetastateFields = []
                triggerVirtualRender()
                // console.log(dispatcher.__fetchedData, field, dispatcher.__MetastateFields)

                // this will throw a promise if the data has not yet been loaded
                dataFetcher(dispatcher.__MetastateFields)

                
            }else{
                // console.info('noop triggered')
                return dispatcher.__fetchedData[field]
            }
        }
    }

}



function fakeRender2(node, fiber, dispatcher){
    console.log('FAKE RENDER', node, fiber)

    if(node.$$typeof === Symbol.for('react.portal')){
        return fakeRender2({ type: 'fakeportal', props: { children: node.children } }, fiber, dispatcher)
    }else if(typeof node.type === 'string'
    || node.type === Symbol.for('react.fragment')
    || node.type === Symbol.for('react.suspense')){
        let children = React.isValidElement(node.props.children) ? [ node.props.children ] : node.props.children;    
        if(!children) return;
        
        let fiberKeyMap = {}
        let fiberChildren = []
        if(fiber && fiber.child){
            let fiberChild = fiber.child;
            while(fiberChild){
                if(fiberChild.key){
                    fiberKeyMap[fiberChild.key] = fiberChild;
                }else{
                    fiberChildren.push(fiberChild)
                }
                fiberChild = fiberChild.sibling;
            }
        }

        for(let child of children){
            if(Array.isArray(child)){
                fakeRender2({ type: 'fakearrayfragment', props: { children: child } }, fiberChildren.shift(), dispatcher)
                continue;
            }
            if(!child || !child.type) continue;
            let fiberChild = child.key ? fiberKeyMap[child.key] : fiberChildren.shift();
            if(!fiberChild || fiberChild.type !== child.type) fiberChild = null;
            fakeRender2(child, fiberChild, dispatcher)
        }
    }else if(typeof node.type === 'function' && node.type.prototype.isReactComponent){ // use !isSimpleFunctionComponent
        // https://overreacted.io/how-does-react-tell-a-class-from-a-function/
        dispatcher.__MetastateCurrentState = null;
        let nextChildren;
        let el = new node.type(node.props);
        if(fiber && fiber.memoizedState) el.state = fiber.memoizedState;
        if(fiber && fiber.updateQueue && fiber.updateQueue.firstUpdate){
            let update = fiber.updateQueue.firstUpdate;
            do {
                if(update.tag == 0){ // update state
                    el.state = { ...el.state, ...update.payload };
                }else if(update.tag == 1){ // replace state
                    el.state = update.payload;
                }
            } while (update = update.next);
        }
        el.props = node.props;
        nextChildren = el.render()
        if(!nextChildren) return;

        fakeRender2(nextChildren,
            (fiber && fiber.child && (
                nextChildren.type === fiber.child.type || (
                    !nextChildren.type && !fiber.child.type
                ))) ? fiber.child : null,
            dispatcher)
    }else if(typeof node.type === 'function'){
        if(fiber) dispatcher.__MetastateCurrentState = fiber.memoizedState;

        let nextChildren = node.type(node.props);
        dispatcher.__MetastateCurrentState = null;
        if(!nextChildren) return;

        fakeRender2(nextChildren,
                nextChildren.type === Symbol.for('react.fragment') ? fiber : 
                (fiber && fiber.child && (
                    nextChildren.type === fiber.child.type )
                ) ? fiber.child : null,
            dispatcher)
    }else{
        console.warn('RENDERING UNKNOWN ELEMENT TYPE', type, props, fiber)
    }
}
