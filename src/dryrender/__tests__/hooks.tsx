import React from 'react'
import renderer, { act } from 'react-test-renderer'
import dryRender, { findFiberRoot, elementFromFiber } from '../dryrender'

test('effects are not called', () => {
    let callRender = jest.fn()
    let callUseEffect = jest.fn()
    let callUseLayoutEffect = jest.fn()
    let callUseImperativeHandle = jest.fn()

    function Thing() {
        callRender()
        React.useEffect(callUseEffect)
        React.useLayoutEffect(callUseLayoutEffect)
        let ref = React.useRef()
        React.useImperativeHandle(ref, () => {
            return undefined
        })
        return <div>asdf</div>
    }
    const node = <Thing />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
    expect(callUseEffect.mock.calls.length).toBe(0)
    expect(callUseLayoutEffect.mock.calls.length).toBe(0)
    expect(callUseImperativeHandle.mock.calls.length).toBe(0)
})

test('useDebugValue', () => {
    let callRender = jest.fn()
    function Thing() {
        callRender()
        React.useDebugValue('ignoreme')
        return <div>asdf</div>
    }
    const node = <Thing />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useRef', () => {
    let callRender = jest.fn()
    function TextInputWithFocusButton() {
        callRender()
        const inputEl = React.useRef(null)
        const onButtonClick = () => {
            // `current` points to the mounted text input element
            ;(inputEl.current as any).focus()
        }
        return (
            <React.Fragment>
                <input ref={inputEl} type="text" />
                <button onClick={onButtonClick}>Focus the input</button>
            </React.Fragment>
        )
    }
    const node = <TextInputWithFocusButton />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useCallback', () => {
    let callRender = jest.fn()
    let callCallback = jest.fn()
    function UseCallbackDemo() {
        callRender()

        const memoizedCallback = React.useCallback(() => {
            callCallback()
        }, [])

        memoizedCallback()
        return <div>asdf</div>
    }
    const node = <UseCallbackDemo />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
    expect(callCallback.mock.calls.length).toBe(1)
})

test('useMemo', () => {
    let callRender = jest.fn()
    let callComputeExpensiveValue = jest.fn()

    function UseMemoDemo() {
        callRender()

        const memoizedValue = React.useMemo(() => {
            callComputeExpensiveValue()
            return 420
        }, [])

        expect(memoizedValue).toBe(420)

        return <div>{memoizedValue}</div>
    }
    const node = <UseMemoDemo />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
    expect(callComputeExpensiveValue.mock.calls.length).toBe(1)
})

test('useState (initial value)', () => {
    let callRender = jest.fn()

    function UseStateDemo() {
        callRender()
        const [state, setState] = React.useState(314159)
        expect(state).toBe(314159)
        return <div>{state}</div>
    }
    const node = <UseStateDemo />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useReducer (initial value)', () => {
    let callRender = jest.fn()

    const initialState = { count: 0 }

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            default:
                throw new Error()
        }
    }

    function Counter({ initialState }: any) {
        callRender()
        const [state, dispatch] = React.useReducer(reducer, initialState)
        console.log(state, dispatch)
        expect(state).toBe(initialState)
        return (
            <React.Fragment>
                Count: {state.count}
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </React.Fragment>
        )
    }

    const node = <Counter initialState={initialState} />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useReducer (initializer)', () => {
    let callRender = jest.fn()

    const initialState = { count: 0 }

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 }
            case 'decrement':
                return { count: state.count - 1 }
            default:
                throw new Error()
        }
    }

    function Counter({ initialState }: any) {
        callRender()
        const [state, dispatch] = React.useReducer(reducer, null, () => initialState)
        console.log(state, dispatch)
        expect(state).toBe(initialState)
        return (
            <React.Fragment>
                Count: {state.count}
                <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </React.Fragment>
        )
    }

    const node = <Counter initialState={initialState} />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useContext', () => {
    let callRender = jest.fn()
    const ContextDemo = React.createContext(762)

    function UseContextDemo() {
        callRender()
        let value = React.useContext(ContextDemo)
        expect(value).toBe(1337)
        return <div>{value}</div>
    }
    const node = (
        <ContextDemo.Provider value={1337}>
            <UseContextDemo />
        </ContextDemo.Provider>
    )
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})

test('useState', () => {
    let myMessage
    let callRender = jest.fn()
    function DemoStateful() {
        let [message, setMessage] = React.useState('wat')
        myMessage = message
        callRender()
        return (
            <button
                onClick={(e) => {
                    if (message === 'wat') {
                        setMessage('yolo')
                    } else {
                        setMessage((x) => x + 'oo')
                    }
                }}
            >
                {message}
            </button>
        )
    }

    const el = <DemoStateful />
    const component = renderer.create(el)
    let root = findFiberRoot((component.root as any)._fiber)

    expect(callRender.mock.calls.length).toBe(1)
    expect(myMessage).toBe('wat')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(2)
    expect(myMessage).toBe('wat')

    act(() => {
        component.root.findByType('button').props.onClick()
    })
    expect(callRender.mock.calls.length).toBe(3)
    expect(myMessage).toBe('yolo')

    dryRender(elementFromFiber(root.child), root.child)
    expect(callRender.mock.calls.length).toBe(4)
    expect(myMessage).toBe('yolo')

    act(() => {
        component.root.findByType('button').props.onClick()
    })
    expect(callRender.mock.calls.length).toBe(5)
    expect(myMessage).toBe('yolooo')
})
