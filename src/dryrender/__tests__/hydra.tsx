import React from 'react'
import ReactDOM from 'react-dom'
import renderer, { act } from 'react-test-renderer'
import dryRender, { findFiberRoot, elementFromFiber } from '../dryrender'
import PropTypes from 'prop-types'

test('Stateful Class Component (normal setState)', async () => {
    let callRender = jest.fn()
    let lastMessage

    class StatefulThing extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                message: 'hello',
            }
        }
        render() {
            callRender()
            lastMessage = this.state.message
            return <button>{this.state.message}</button>
        }
    }
    const node = <StatefulThing />

    const component = renderer.create(node)
    expect(callRender.mock.calls.length).toBe(1)
    expect(lastMessage).toBe('hello')

    let root = findFiberRoot((component.root as any)._fiber)
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
    expect(lastMessage).toBe('hello')

    act(() => {
        component.root.findByType(StatefulThing).instance.setState({
            message: 'zombocom',
        })
    })

    expect(callRender.mock.calls.length).toBe(3)
    expect(lastMessage).toBe('zombocom')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(4)
    expect(lastMessage).toBe('zombocom')

    act(() => {
        component.root
            .findByType(StatefulThing)
            .instance.setState((oldState: any) => Object.assign({}, oldState, { message: 'meep' }))
    })

    expect(callRender.mock.calls.length).toBe(5)
    expect(lastMessage).toBe('meep')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(6)
    expect(lastMessage).toBe('meep')
})

test('Stateful Class Component (setState function)', async () => {
    let callRender = jest.fn()
    let lastMessage: any

    class StatefulThing extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                message: 'hello',
            }
        }
        render() {
            callRender()
            lastMessage = this.state.message
            return <button>{this.state.message}</button>
        }
    }
    const node = <StatefulThing />

    const component = renderer.create(node)
    expect(callRender.mock.calls.length).toBe(1)
    expect(lastMessage).toBe('hello')

    let root = findFiberRoot((component.root as any)._fiber)
    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
    expect(lastMessage).toBe('hello')

    act(() => {
        component.root
            .findByType(StatefulThing)
            .instance.setState((oldState: any) => Object.assign({}, oldState, { message: 'blarg' }))
    })

    expect(callRender.mock.calls.length).toBe(3)
    expect(lastMessage).toBe('blarg')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(4)
    expect(lastMessage).toBe('blarg')

    act(() => {
        component.root
            .findByType(StatefulThing)
            .instance.setState((oldState: any) => Object.assign({}, oldState, { message: 'meep' }))

        component.root
            .findByType(StatefulThing)
            .instance.setState((oldState: any) => Object.assign({}, oldState, { message: 'moop' }))

        component.root
            .findByType(StatefulThing)
            .instance.setState((oldState: any) => Object.assign({}, oldState, { message: 'vroop' }))

        dryRender(elementFromFiber(root.child), root.child)
        expect(lastMessage).toBe('vroop')
    })
})

// replaceState has pretty much been deprecated in react since 0.13
// but it's still possible to access it by directly interfacing with
// the updater
test('replace state', () => {
    let callRender = jest.fn()
    let lastMessage: any

    class StatefulThing extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                message: 'hello',
            }
        }
        render() {
            callRender()
            lastMessage = this.state.message
            return <button>{this.state.message}</button>
        }
    }
    const node = <StatefulThing />

    const component = renderer.create(node)
    expect(callRender.mock.calls.length).toBe(1)
    expect(lastMessage).toBe('hello')
    let root = findFiberRoot((component.root as any)._fiber)

    act(() => {
        let instance = component.root.findByType(StatefulThing).instance

        instance.updater.enqueueReplaceState(instance, {
            message: 'd',
        })

        dryRender(elementFromFiber(root.child), root.child)
        expect(lastMessage).toBe('d')
    })
})

test('Thinking with portals', async () => {
    let lastMessage

    class Modal extends React.Component<any, any> {
        el: any

        constructor(props: any) {
            super(props)
            this.el = {
                nodeType: 1,
                children: [],
            }
        }
        render() {
            return ReactDOM.createPortal(this.props.children, this.el)
        }
    }

    class StatefulThing extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                message: 'hello',
            }
        }
        render() {
            lastMessage = this.state.message
            return (
                <button
                    onClick={(e) => {
                        this.setState({ message: 'derp' })
                    }}
                ></button>
            )
        }
    }

    const node = (
        <Modal>
            <div>
                <StatefulThing />
            </div>
        </Modal>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('hello')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('hello')

    act(() => {
        component.root.findByType(StatefulThing).instance.setState({
            message: 'zombocom',
        })
    })

    expect(lastMessage).toBe('zombocom')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('zombocom')
})

// test('concurrent mode rehydrate', () => {
//     const ContextDemo = React.createContext(451)
//     let lastMessage;

//     function StatefulDemo(){
//         let [ state, setState ] = React.useState('wumbo')
//         lastMessage = state;
//         return <button onClick={e => setState('derp')}>{state}</button>
//     }

//     const node =
//         <React.unstable_ConcurrentMode>
//             <StatefulDemo />
//         </React.unstable_ConcurrentMode>

//     const component = renderer.create(node);
//     let root = findFiberRoot((component.root as any)._fiber);

//     expect(lastMessage).toBe('wumbo')
//     dryRender(elementFromFiber(root.child), root.child)
//     expect(lastMessage).toBe('wumbo')
//     act(() => component.root.findByType('button').props.onClick())
//     // concurrent mode is weird?
//     // expect(lastMessage).toBe('derp')
//     dryRender(elementFromFiber(root.child), root.child)
//     expect(lastMessage).toBe('derp')
// })

test('strict mode rehydrate', () => {
    const ContextDemo = React.createContext(451)
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const node = (
        <React.StrictMode>
            <StatefulDemo />
        </React.StrictMode>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('profiler rehydrate', () => {
    const ContextDemo = React.createContext(451)
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }
    const Profiler = React.Profiler || (React as any).unstable_Profiler
    const node = (
        <Profiler onRender={() => {}} id="asdf">
            <StatefulDemo />
        </Profiler>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('forwardRef rehydrate', () => {
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const FancyButton: any = React.forwardRef((props, ref) => (
        <div ref={ref as any} className="FancyButton">
            {props.children}
        </div>
    ))

    const node = (
        <FancyButton>
            <StatefulDemo />
        </FancyButton>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('memo rehydrate', () => {
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const MemoThing = React.memo(StatefulDemo, (a, b) => true)

    const node = (
        <div>
            <MemoThing />
        </div>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('suspense rehydrate', () => {
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const node = (
        <React.Suspense fallback={<div>Loading...</div>}>
            <StatefulDemo />
        </React.Suspense>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('fragment rehydrate', () => {
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const node = (
        <React.Fragment>
            <div key="ylo">merp</div>,
            <StatefulDemo key="xyz" />
        </React.Fragment>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})

test('misc rehydrate', () => {
    let lastMessage

    function StatefulDemo() {
        let [state, setState] = React.useState('wumbo')
        lastMessage = state
        return <button onClick={(e) => setState('derp')}>{state}</button>
    }

    const node = (
        <div>
            <div>abc</div>
            {[<div key="ylo">merp</div>, <StatefulDemo key="xyz" />]}
            <div>wat</div>
        </div>
    )

    const component = renderer.create(node)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())

    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})
