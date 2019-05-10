import React from 'react';
import ReactDOM from 'react-dom';
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


// replaceState has pretty much been deprecated in react since 0.13
// but it's still possible to access it by directly interfacing with
// the updater
test('replace state', () => {
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

    
    act(() => {
        let instance = component.root.findByType(StatefulThing).instance

        instance.updater.enqueueReplaceState(instance, {
            message: 'd'
        });

        dryRender(elementFromFiber(root.child), root.child)
        expect(lastMessage).toBe('d')
    })
})



test('Thinking with portals', async () => {
    let lastMessage;

    class Modal extends React.Component {
        constructor(){
            super()
            this.el = {
                nodeType: 1,
                children: []
            }
        }
        render(){
            return ReactDOM.createPortal(this.props.children, this.el)
        }
    }


    class StatefulThing extends React.Component {
        constructor(){
            super()
            this.state = {
                message: 'hello'
            }
        }
        render(){
            lastMessage = this.state.message;
            return <button onClick={e => {
                this.setState({ message: 'derp' })
            }}></button>    
        }
        
    }

    const node = <Modal>
        <div>
            <StatefulThing />
        </div>
    </Modal>


    const component = renderer.create(node);
    let root = findFiberRoot(component.root._fiber);

    expect(lastMessage).toBe('hello')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('hello')
    

    act(() => {
        component.root.findByType(StatefulThing).instance.setState({
            message: 'zombocom'
        })
    })

    expect(lastMessage).toBe('zombocom')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('zombocom')

})




test('concurrent mode rehydrate', () => {
    const ContextDemo = React.createContext(451)
    let lastMessage;

    function StatefulDemo(){
        let [ state, setState ] = React.useState('wumbo')
        lastMessage = state;
        return <button onClick={e => setState('derp')}>{state}</button>
    }

    const node = 
        <React.unstable_ConcurrentMode>
            <StatefulDemo />
        </React.unstable_ConcurrentMode>

    const component = renderer.create(node);
    let root = findFiberRoot(component.root._fiber);

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())
    // concurrent mode is weird?
    // expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})


test('strict mode rehydrate', () => {
    const ContextDemo = React.createContext(451)
    let lastMessage;

    function StatefulDemo(){
        let [ state, setState ] = React.useState('wumbo')
        lastMessage = state;
        return <button onClick={e => setState('derp')}>{state}</button>
    }

    const node = 
        <React.StrictMode>
            <StatefulDemo />
        </React.StrictMode>

    const component = renderer.create(node);
    let root = findFiberRoot(component.root._fiber);

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})


test('forwardRef rehydrate', () => {
    let lastMessage;

    function StatefulDemo(){
        let [ state, setState ] = React.useState('wumbo')
        lastMessage = state;
        return <button onClick={e => setState('derp')}>{state}</button>
    }


    const FancyButton = React.forwardRef((props, ref) => (
        <div ref={ref} type="button" className="FancyButton">
          {props.children}
        </div>
    ));

    const node = 
        <FancyButton>
            <StatefulDemo />
        </FancyButton>

    const component = renderer.create(node);
    let root = findFiberRoot(component.root._fiber);

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})



