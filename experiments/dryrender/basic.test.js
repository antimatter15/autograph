import React, { useEffect } from 'react';
import renderer from 'react-test-renderer';
import * as ReactIs from 'react-is'

const ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// from: react-reconciler/src/ReactFiber.js
// function shouldConstruct(Component: Function) {
//   const prototype = Component.prototype;
//   return !!(prototype && prototype.isReactComponent);
// }

// function isSimpleFunctionComponent(type: any) {
//   return (
//     typeof type === 'function' &&
//     !shouldConstruct(type) &&
//     type.defaultProps === undefined
//   );
// }


function dryRender(node, fiber, dispatcher){
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

    // if(!ReactIs.isElement(node)) return;
    // let nextChilren;

    if(typeof node.type === 'string'){
        // its a host component

    }else if(typeof node.type === 'function' && node.prototype && node.prototype.isReactComponent){
        // its a class



    }else if(typeof node.type === 'function'){
        // its a simple function component
        let context = null;
        let updater = null;

        // let previousDispatcher = ReactInternals.ReactCurrentDispatcher.current;
        // ReactInternals.ReactCurrentDispatcher.current = dispatcher;
        // try {
            let nextChildren = node.type(node.props, context, updater);
        // } finally {
        //     ReactInternals.ReactCurrentDispatcher.current = previousDispatcher;    
        // }


    }

    // if(ReactIs.isPortal(node)){

    // }else if(ReactIs.isSuspense(node)){

    // }else if(ReactIs.isFragment(node)){

    // }else 
}



test('Fiber', () => {
    const jsx = <Link page="http://www.facebook.com">Facebook</Link>,
    const component = renderer.create(jsx);
    const fiber = component.root._fiber;
    dryRender(jsx, fiber, null)
})

function elementFromFiber(fiber){
    let props = { ...fiber.memoizedProps }
    if(fiber.ref) props.ref = fiber.ref;
    return React.createElement(fiber.type, props)
}

function findFiberRoot(node){
    while(node.return) node = node.return;
    return node;
}

// TODO: legacy context
// https://reactjs.org/docs/legacy-context.html


// function testRender(fn){
//     let callRender = jest.fn();
//     function App(props){
//         callRender()
//         return null;
//     }
//     dryRender(fn(App), null, null);
//     expect(callRender.mock.calls.length).toBe(1)
// }

// test('Basic Functional React Component', () => {
//     let callRender = jest.fn();
//     function App(props){
//         props.callRender()
//         return null;
//     }
//     dryRender(<App callRender={callRender} />, null, null);
//     expect(callRender.mock.calls.length).toBe(1)
// })

// test('Render children', () => {
//     testRender(App => {
//         function Thing(){
//             return <div>
//                 <App />
//             </div>
//         }
//         return <Thing />
//     })
// })













// function virtualRender(node, fiber, dispatcher){
//     // if(ReactIs.isPortal(node)){

//     // }else if(ReactIs.isSuspense(node)){

//     // }else if(ReactIs.isFragment(node)){

//     // }else if(ReactIs.isElement(node)){
//     //     if(typeof node.type === 'string'){
//     //         // its a thing
//     //     }else if(isSimpleFunctionComponent(node)){
//     //         // its a simple function component
//     //     }else if(typeof node.type === 'function'){
//     //         // its a class
//     //     }
//     // }
//     if(fiber && !(fiber.type === node.type || (!fiber.type && !node.type))){
//         // if the fiber's type is different from the node's type then pretend we don't have a fiber
//         fiber = null;
//     }


//     if(typeof node.type === 'string'){

//     }else if(typeof node.type === 'function' && node.type.prototype.isReactComponent){
//         // class component
//         let nextChildren;
//         virtualRender(nextChildren, fiber && fiber.child, dispatcher)
//     }else if(typeof node.type === 'function'){
//         // functional component
//         let nextChildren;
//         virtualRender(nextChildren, fiber && fiber.child, dispatcher)
//     }else if(ReactIs.isPortal(node)){
        
//     }else if(ReactIs.isSuspense(node)){
        
//     }else if(ReactIs.isFragment(node)){
        
//     }
// }




// test('Functional Component (with Hooks)', async () => {
//     function App(props) {
//         props.callRender();
//         React.useEffect(props.callEffect);
//         return null;
//     }

//     let callEffect = jest.fn()
//     let callRender = jest.fn()
//     await dryRender(
//         <App 
//         callRender={callRender}
//         callEffect={callEffect} />
//     )

//     expect(callRender.mock.calls.length).toBe(1);
//     expect(callEffect.mock.calls.length).toBe(0);
// })


// test('Class Component', async () => {
//     class App extends React.Component {
//         componentDidMount(){
//             this.props.callMount()
//         }
//         render(){
//             this.props.callRender()
//         }
//     }

//     let callMount = jest.fn()
//     let callRender = jest.fn()
//     await dryRender(
//         <App 
//         callRender={callRender}
//         callMount={callMount} />
//     )
//     expect(callRender.mock.calls.length).toBe(1);
//     expect(callMount.mock.calls.length).toBe(0);
// })


// test('Nested Components', async () => {
//     let callRender = jest.fn()

//     function Other(){
//         callRender()
//         return <div>test</div>
//     }
//     function Thing(){
//         return <div>
//             <Other />
//         </div>
//     }
    
//     await dryRender(
//         <div>
//             <div>
//                 <Thing />
//             </div>
//         </div>
//     )

//     expect(callRender.mock.calls.length).toBe(1);
// })
