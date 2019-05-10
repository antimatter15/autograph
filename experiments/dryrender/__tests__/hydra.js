import React from 'react';
import renderer, { act } from 'react-test-renderer';
import dryRender from '../dryrender'
import PropTypes from 'prop-types';


function elementFromFiber(fiber){
    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}

function findFiberRoot(node){
    while(node.return) node = node.return;
    return node;
}



test('Stateful Class Component (normal setState)', async () => {
    let callRender = jest.fn()
    let lastMessage;

    class StatefulThing extends React.Component {
        constructor(){
            super()
            this.state = {
                message: 'hello'
            }
        }
        render(){
            callRender()
            lastMessage = this.state.message;
            return <button>{this.state.message}</button>    
        }
        
    }
    const node = <StatefulThing />

    const component = renderer.create(node);
    expect(callRender.mock.calls.length).toBe(1)
    expect(lastMessage).toBe('hello')

    let root = findFiberRoot(component.root._fiber);
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
    expect(lastMessage).toBe('hello')


    act(() => {
        component.root.findByType(StatefulThing).instance.setState({
            message: 'zombocom'
        })
    })
    
    expect(callRender.mock.calls.length).toBe(3)
    expect(lastMessage).toBe('zombocom')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(4)
    expect(lastMessage).toBe('zombocom')



    act(() => {
        component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'meep' }))
    })
    
    expect(callRender.mock.calls.length).toBe(5)
    expect(lastMessage).toBe('meep')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(6)
    expect(lastMessage).toBe('meep')
})





test('Stateful Class Component (setState function)', async () => {
    let callRender = jest.fn()
    let lastMessage;

    class StatefulThing extends React.Component {
        constructor(){
            super()
            this.state = {
                message: 'hello'
            }
        }
        render(){
            callRender()
            lastMessage = this.state.message;
            return <button>{this.state.message}</button>    
        }
        
    }
    const node = <StatefulThing />

    const component = renderer.create(node);
    expect(callRender.mock.calls.length).toBe(1)
    expect(lastMessage).toBe('hello')

    let root = findFiberRoot(component.root._fiber);
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
    expect(lastMessage).toBe('hello')


    act(() => {
        component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'blarg' }))
    })
    
    expect(callRender.mock.calls.length).toBe(3)
    expect(lastMessage).toBe('blarg')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(4)
    expect(lastMessage).toBe('blarg')



    act(() => {
        component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'meep' }))


        component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'moop' }))

        component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'vroop' }))

        dryRender(elementFromFiber(root.child), root.child)
        expect(lastMessage).toBe('vroop')
        
    })
})







// test('Thinking with portals', async () => {
//     let callRender = jest.fn()

//     class Modal extends React.Component {
//         constructor(){
//             super()
//             this.el = {
//                 nodeType: 1,
//                 children: []
//             }
//         }
//         render(){
//             return ReactDOM.createPortal(this.props.children, this.el)
//         }
//     }


//     class StatefulThing extends React.Component {
//         constructor(){
//             this.state = {
//                 message: 'hello'
//             }
//         }
//         render(){
//             return <button onClick={e => {
//                 this.setState({ message: 'derp' })
//             }}></button>    
//         }
        
//     }

//     function Thing(props){
//         callRender()
//         return "thing"
//     }

//     const node = <Modal>
//         <div>
//             <Thing />
//         </div>
//     </Modal>

//     dryRender(node, null)
//     expect(callRender.mock.calls.length).toBe(1)
// })