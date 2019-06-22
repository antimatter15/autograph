import React from 'react';
import renderer, { act } from 'react-test-renderer';
import dryRender, { findFiberRoot, elementFromFiber } from '../dryrender'
import PropTypes from 'prop-types';




// TODO: add unit tests for inheritance from outside of dryRender scope

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

    function LegacyContextFunction(props: any, context: any){
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



test('legacy context api (inheritance)', () => {
    let callRender = jest.fn()
        
    class ColorProvider extends React.Component {
        static childContextTypes = {
            color: PropTypes.string
        }
        getChildContext() {
            return { color: "purple" };
        }
        render(){
            callRender()
            return <div>{this.props.children}</div>
        }
    }

    class LanguageProvider extends React.Component {
        static childContextTypes = {
            language: PropTypes.string
        }
        getChildContext() {
            return { language: "swahili" };
        }
        render(){
            callRender()
            return <div>{this.props.children}</div>
        }
    }

    class LegacyContextConsumer extends React.Component {
        static contextTypes = {
            color: PropTypes.string,
            language: PropTypes.string
        }
        render(){
            expect(this.context.color).toBe('purple')
            expect(this.context.language).toBe('swahili')
            callRender()
            return <div>{this.context.color}</div>
        }
    }

    function LegacyContextFunction(props: any, context: any){
        expect(context.color).toBe('purple')
        expect(context.language).toBe('swahili')
        callRender()
        return <div>{context.color}</div>
    }
    LegacyContextFunction.contextTypes = {
        color: PropTypes.string,
        language: PropTypes.string
    }

    function IlliterateFunction(props: any, context: any){
        expect(context.color).toBe('purple')
        expect(context.language).toBeUndefined()
        callRender()
        return <div>{context.language}</div>
    }
    IlliterateFunction.contextTypes = {
        language: PropTypes.string,
        color: PropTypes.string
    }


    const node = <ColorProvider>
        <LanguageProvider>
            <LegacyContextConsumer />
            <LegacyContextFunction />
        </LanguageProvider>
        <IlliterateFunction />
    </ColorProvider>

    const component = renderer.create(node);
    expect(callRender.mock.calls.length).toBe(5)
    
    let root = findFiberRoot((component.root as any)._fiber);

    // re-render but dont re-render ColorProvider
    dryRender(elementFromFiber(root.child.child), root.child.child)
    expect(callRender.mock.calls.length).toBe(5 + 4)

    // dryRender(node, null)
    // expect(callRender.mock.calls.length).toBe(3)
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


test('modern context api (render prop)', () => {
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





test('modern context api (render prop / rehydrate)', () => {
    const ContextDemo = React.createContext(451)
    let lastMessage;

    function StatefulDemo(){
        let [ state, setState ] = React.useState('wumbo')
        lastMessage = state;
        return <button onClick={e => setState('derp')}>{state}</button>
    }

    const node = <div>
        <ContextDemo.Provider value={711}>
            <ContextDemo.Consumer>{
                value => <StatefulDemo />
            }</ContextDemo.Consumer>
        </ContextDemo.Provider>
    </div>

    const component = renderer.create(node);
    let root = findFiberRoot((component.root as any)._fiber);

    expect(lastMessage).toBe('wumbo')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('wumbo')
    act(() => component.root.findByType('button').props.onClick())
    expect(lastMessage).toBe('derp')
    dryRender(elementFromFiber(root.child), root.child)
    expect(lastMessage).toBe('derp')
})




