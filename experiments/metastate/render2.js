
// from: react-reconciler/src/ReactFiber.js
function shouldConstruct(Component: Function) {
  const prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function isSimpleFunctionComponent(type: any) {
  return (
    typeof type === 'function' &&
    !shouldConstruct(type) &&
    type.defaultProps === undefined
  );
}


function virtualRender(node, fiber, dispatcher){
    // isContextConsumer
    // isConcurrentMode
    // isContextProvider
    // isForwardRef
    // isLazy
    // isMemo
    // isPortal
    // isProfiler
    // isStrictMode
    // isSuspense

    if(ReactIs.isPortal(node)){

    }else if(ReactIs.isSuspense(node)){

    }else if(ReactIs.isFragment(node)){

    }else if(ReactIs.isElement(node)){
        if(typeof node.type === 'string'){
            // its a thing
        }else if(isSimpleFunctionComponent(node)){
            // its a simple function component
        }else if(typeof node.type === 'function'){
            // its a class
        }
    }
}





function virtualRender(node, fiber, dispatcher){
    // if(ReactIs.isPortal(node)){

    // }else if(ReactIs.isSuspense(node)){

    // }else if(ReactIs.isFragment(node)){

    // }else if(ReactIs.isElement(node)){
    //     if(typeof node.type === 'string'){
    //         // its a thing
    //     }else if(isSimpleFunctionComponent(node)){
    //         // its a simple function component
    //     }else if(typeof node.type === 'function'){
    //         // its a class
    //     }
    // }
    if(fiber && !(fiber.type === node.type || (!fiber.type && !node.type))){
        // if the fiber's type is different from the node's type then pretend we don't have a fiber
        fiber = null;
    }


    if(typeof node.type === 'string'){

    }else if(typeof node.type === 'function' && node.type.prototype.isReactComponent){
        // class component
        let nextChildren;
        virtualRender(nextChildren, fiber && fiber.child, dispatcher)
    }else if(typeof node.type === 'function'){
        // functional component
        let nextChildren;
        virtualRender(nextChildren, fiber && fiber.child, dispatcher)
    }else if(ReactIs.isPortal(node)){
        
    }else if(ReactIs.isSuspense(node)){
        
    }else if(ReactIs.isFragment(node)){
        
    }
}

