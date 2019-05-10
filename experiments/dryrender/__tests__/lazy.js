import React from 'react';
import renderer from 'react-test-renderer';
import dryRender from '../dryrender'
import PropTypes from 'prop-types';

function delay(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
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



test('React.lazy (no fiber)', () => {
    let callRender = jest.fn()
    function Dummy(){
        callRender()
        return <div>loaded!</div>
    }
    const LazyDummy = React.lazy(() => new Promise((resolve) => resolve({
        'default': Dummy
    })))
    const node = <React.Suspense fallback={<div>loading...</div>}>
        <LazyDummy />
    </React.Suspense>
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(0)
})



test('React.lazy (test renderer)', async () => {
    let callRender = jest.fn()
    function Dummy(){
        callRender()
        return <div>loaded!</div>
    }
    const LazyDummy = React.lazy(() => new Promise((resolve) => resolve({
        'default': Dummy
    })))
    const node = <React.Suspense fallback={<div>loading...</div>}>
        <LazyDummy />
    </React.Suspense>

    const component = renderer.create(node);
    let root = findFiberRoot(component.root._fiber);

    expect(callRender.mock.calls.length).toBe(0)
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(0)

    await delay(10)
    expect(callRender.mock.calls.length).toBe(1)
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
})