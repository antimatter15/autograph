import React from 'react';
import renderer from 'react-test-renderer';
import dryRender from '../dryrender'
import PropTypes from 'prop-types';


test('legacy context api', () => {
    let callRender = jest.fn()
        
    class LegacyContextProvider extends React.Component {
        static childContextTypes = {
            color: PropTypes.string
        }
        getChildContext() {
            return {color: "purple"};
        }
        render(){
            callRender()
            return <div>{this.props.children}</div>
        }
    }

    class LegacyContextConsumer extends React.Component {
        static contextTypes = {
            color: PropTypes.string
        }
        render(){
            expect(this.context.color).toBe('purple')
            callRender()
            return <div>{this.context.color}</div>
        }
    }

    function LegacyContextFunction(props, context){
        expect(context.color).toBe('purple')
        callRender()
        return <div>{context.color}</div>
    }
    LegacyContextFunction.contextTypes = {
        color: PropTypes.string
    }


    const node = <LegacyContextProvider>
        <LegacyContextConsumer />
        <LegacyContextFunction />
    </LegacyContextProvider>

    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(3)
})



test('modern context api (class)', () => {
    let callRender = jest.fn()
    let callLifecycle = jest.fn()
    const ContextDemo = React.createContext(451)

    class MyClass extends React.Component {
      componentDidMount() {
        let value = this.context;
        callLifecycle()
      }
      componentDidUpdate() {
        let value = this.context;
        callLifecycle()
      }
      componentWillUnmount() {
        let value = this.context;
        callLifecycle()
      }
      render() {
        let value = this.context;
        expect(value).toBe(711)
        callRender()
        return <div>{value}</div>
      }
    }
    MyClass.contextType = ContextDemo;

    const node = <ContextDemo.Provider value={711}>
        <MyClass />
    </ContextDemo.Provider>

    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(1)
    expect(callLifecycle.mock.calls.length).toBe(0)

})


test('moder context api (render prop)', () => {
    let callRender = jest.fn()
    const ContextDemo = React.createContext(451)

    const node = <div>
        <ContextDemo.Provider value={711}>
            <ContextDemo.Consumer>{value => {
                callRender()
                expect(value).toBe(711)
                return <div>hello world</div>
            }}</ContextDemo.Consumer>
        </ContextDemo.Provider>
        <ContextDemo.Consumer>{value => {
            callRender()
            expect(value).toBe(451)
            return <div>hello world</div>
        }}</ContextDemo.Consumer>
    </div>

    dryRender(node, null)
    expect(callRender.mock.calls.length).toBe(2)
})

