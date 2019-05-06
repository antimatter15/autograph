
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
