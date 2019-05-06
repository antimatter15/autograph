import React, { useEffect } from 'react';
import renderer, { act } from 'react-test-renderer';
// import { act } from 'react-dom/test-utils'

// const createRenderer = require('react-test-renderer/shallow').createRenderer;
// const React = require('react');
// const ReactDOM = require('react-dom');
// const ReactDOMServer = require('react-dom/server');
// const ReactTestUtils = require('react-dom/test-utils');
// const act = ReactTestUtils.act;


async function dryRender(jsx){
    // act(() => {
    //     const component = renderer.create(jsx);
    // })
}


test('Functional Component (with Hooks)', async () => {
    function App(props) {
        props.callRender();
        React.useEffect(props.callEffect);
        return null;
    }

    let callEffect = jest.fn()
    let callRender = jest.fn()
    await dryRender(
        <App 
        callRender={callRender}
        callEffect={callEffect} />
    )

    expect(callRender.mock.calls.length).toBe(1);
    expect(callEffect.mock.calls.length).toBe(0);
})


test('Class Component', async () => {
    class App extends React.Component {
        componentDidMount(){
            this.props.callMount()
        }
        render(){
            this.props.callRender()
        }
    }

    let callMount = jest.fn()
    let callRender = jest.fn()
    await dryRender(
        <App 
        callRender={callRender}
        callMount={callMount} />
    )
    expect(callRender.mock.calls.length).toBe(1);
    expect(callMount.mock.calls.length).toBe(0);
})


test('Nested Components', async () => {
    let callRender = jest.fn()

    function Other(){
        callRender()
        return <div>test</div>
    }
    function Thing(){
        return <div>
            <Other />
        </div>
    }
    
    await dryRender(
        <div>
            <div>
                <Thing />
            </div>
        </div>
    )

    expect(callRender.mock.calls.length).toBe(1);
})



// import Link from '../Link.react';

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     <Link page="http://www.facebook.com">Facebook</Link>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
