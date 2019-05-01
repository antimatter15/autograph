import React, { useState } from 'react'

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;


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

    let dispatcher = {
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

    }


    function triggerVirtualRender(){
        console.groupCollapsed('dreaming')
        let earlierDispatcher = ReactInternals.ReactCurrentDispatcher.current;
        ReactInternals.ReactCurrentDispatcher.current = dispatcher;
        fakeRender(currentOwner.type, currentOwner.pendingProps, currentOwner, dispatcher)
        ReactInternals.ReactCurrentDispatcher.current = earlierDispatcher;
        console.groupEnd('dreaming')
    }

    
    triggerVirtualRender()

    console.log(dispatcher.__MetastateFields)


    let fetchedData = dataFetcher(dispatcher.__MetastateFields)

    return {
        requestedFields: dispatcher.__MetastateFields,
        get(field){
            if(!dispatcher.__MetastateFields.includes(field)){
                console.warn('TRIGGERING UPDATE', field)
                triggerUpdate(updateCount + 1)
                
                triggerVirtualRender()
                dataFetcher(dispatcher.__MetastateFields)
                // console.log(ReactInternals.ReactCurrentOwner.current.memoizedState)
                // throw new Promise((resolve) => {
                //     setTimeout(resolve, 10000)
                // })
            }else{
                // console.info('noop triggered')
                return fetchedData[field]
            }
        }
    }

}

// const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');

function fakeRender(type, props, fiber, dispatcher){
    console.log('fake render', type, props, fiber)

    // TODO: FRAGMENTS!

    if(typeof type === 'string' || type === Symbol.for('react.suspense')){
        // TODO: this algorithm probably doesn't function 
        // exactly the same way the real react reconciler does
        // so there's bound to be some edge cases when some keys
        // are duplicated, or when keys are only used sometimes
        if(props.children){
            let fiberKeyMap = {}
            let fiberChildren = []

            if(fiber && fiber.child){
                let fiberChild = fiber.child;
                while(fiberChild){
                    if(fiberChild.key){
                        fiberKeyMap[fiberChild.key] = fiberChild;
                    }else if(fiberChild.type){
                        fiberChildren.push(fiberChild)
                    }
                    fiberChild = fiberChild.sibling;
                }
            }

            let children = React.isValidElement(props.children) ? [ props.children ] : props.children;

            for(let child of children){
                if(!child || !child.type) continue;
                let fiberChild = child.key ? fiberKeyMap[child.key] : fiberChildren.shift();
                if(!fiberChild || fiberChild.type !== child.type)
                    fiberChild = null;
                fakeRender(child.type, child.props, fiberChild, dispatcher)
            }
        }

    }else if(typeof type === 'function' && type.prototype.isReactComponent){
        // https://overreacted.io/how-does-react-tell-a-class-from-a-function/

        if(fiber){
            dispatcher.__MetastateCurrentState = fiber.memoizedState    
        }
        console.log('REACT COMPPOENNT', fiber)

        let node;
        let el = new type(props);
        if(fiber && fiber.memoizedState){
            el.state = fiber.memoizedState
        }
        el.props = props;
        node = el.render()
        dispatcher.__MetastateCurrentState = null;

        console.log('node', node, fiber && fiber.child)

        // TODO: handle cases where node is an array, null, or a fragment, or a portal
        // node.props

        fakeRender(node.type, 
            node.props, 
            (fiber && fiber.child && node.type === fiber.child.type) ? fiber.child : null,
            dispatcher)

    }else if(typeof type === 'function'){
        if(fiber){
            dispatcher.__MetastateCurrentState = fiber.memoizedState    
        }
        let node = type(props);
        dispatcher.__MetastateCurrentState = null;

        console.log('node', node, fiber && fiber.child)

        // TODO: handle cases where node is an array, null, or a fragment, or a portal
        // node.props

        fakeRender(node.type, 
            node.props, 
            (fiber && fiber.child && node.type === fiber.child.type) ? fiber.child : null,
            dispatcher)

        // if the type does not match, ignore all the existing subtree
        // and dont bother reconciling them as we rebuild teh entire tree from
        // scratch in this case. 
    }else{
        console.log('RENDERING UNKNOWN ELEMNT TYPE', type, props, fiber)
    }
}