import React from 'react';
import renderer from 'react-test-renderer';
import dryRender from './dryrender'


test('effects are not called', () => {
    let callRender = jest.fn()
    let callUseEffect = jest.fn()
    let callUseLayoutEffect = jest.fn()
    let callUseImperativeHandle = jest.fn()

    function Thing(props){
        callRender()
        React.useEffect(callUseEffect)
        React.useLayoutEffect(callUseLayoutEffect)
        React.useImperativeHandle(callUseImperativeHandle)
        return "thing"
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
    function Thing(props){
        callRender()
        React.useDebugValue('ignoreme')
        return "thing"
    }
    const node = <Thing />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})


test('useRef', () => {
    let callRender = jest.fn()
    function TextInputWithFocusButton() {
      callRender()
      const inputEl = React.useRef(null);
      const onButtonClick = () => {
        // `current` points to the mounted text input element
        inputEl.current.focus();
      };
      return (
        <React.Fragment>
          <input ref={inputEl} type="text" />
          <button onClick={onButtonClick}>Focus the input</button>
        </React.Fragment>
      );
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
      });

      memoizedCallback()
      return "thing"
    }
    const node = <UseCallbackDemo />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
    expect(callCallback.mock.calls.length).toBe(1)
})

test('useMemo', () => {
    let callRender = jest.fn()
    let callComputeExpensiveValue = jest.fn();

    function UseMemoDemo() {
      callRender()

      const memoizedValue = React.useMemo(() => {
        callComputeExpensiveValue()
        return 420
      });

      expect(memoizedValue).toBe(420)

      return memoizedValue
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
      const [ state, setState ] = React.useState(314159)
      expect(state).toBe(314159)
      return state
    }
    const node = <UseStateDemo />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})



test('useReducer (initial value)', () => {
    let callRender = jest.fn()

    const initialState = {count: 0};

    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }

    function Counter({initialState}) {
      callRender()
      const [state, dispatch] = React.useReducer(reducer, initialState);
      console.log(state, dispatch)
      expect(state).toBe(initialState)
      return (
        <React.Fragment>
          Count: {state.count}
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </React.Fragment>
      );
    }


    const node = <Counter initialState={initialState} />
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})



test('useReducer (initializer)', () => {
    let callRender = jest.fn()

    const initialState = {count: 0};

    function reducer(state, action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }

    function Counter({initialState}) {
      callRender()
      const [state, dispatch] = React.useReducer(reducer, null, () => initialState);
      console.log(state, dispatch)
      expect(state).toBe(initialState)
      return (
        <React.Fragment>
          Count: {state.count}
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </React.Fragment>
      );
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
      return value
    }
    const node = <ContextDemo.Provider value={1337}>
        <UseContextDemo />
    </ContextDemo.Provider>
    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
})
