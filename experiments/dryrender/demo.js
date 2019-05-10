import React, { useEffect, useState } from 'react';
import renderer, { act } from 'react-test-renderer';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import dryRender from './dryrender'


function Link(props){
    return <a href={props.page}>{props.children}</a>
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


class LegacyContextProvider extends React.Component {
    static childContextTypes = {
        color: PropTypes.string
    }
    getChildContext() {
        return {color: "purple"};
    }
    render(){
        return <div>{this.props.children}</div>
    }
}


class LegacyContextConsumer extends React.Component {
    static contextTypes = {
        color: PropTypes.string
    }
    render(){
        return <div>{this.context.color}</div>
    }
}

function LegacyContextFunction(props, context){
    return <div>{context.color}</div>
}
LegacyContextFunction.contextTypes = {
    color: PropTypes.string
}

class DemoComponent extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'hello'
        }
    }
    render(){
        this.props.logState(this.state.message)
        return <div>{this.state.message}</div>
    }
}

function LogChildren(props){
    console.log('log children', props.children)
    return <div>{props.children}</div>
}

const FancyButton = React.forwardRef((props, ref) => (
    <input ref={ref} type="button" className="FancyButton">
      {props.children}
    </input>
  ));
  

function Dummy(){
    return <div>loaded!</div>
}

// const LazyDummy = React.lazy(() => new Promise((resolve) => setTimeout(() => resolve(Dummy), 1000)))
const LazyDummy = React.lazy(() => new Promise((resolve) => resolve({
    'default': Dummy
})))

const MemoLogChildren = React.memo(LogChildren)

function DemoStateful(){
    let [ message, setMessage ] = useState("wat")
    let magicday = React.useContext(MagicDay)

    useEffect(() => {
        console.log('ran an effect!')
    })
    console.log('my hooks message', message, magicday)
    return <button onClick={e => {
        setMessage('yolo')
    }}>{message}{magicday}</button>
}

let MagicDay = React.createContext(420)


function FragTurner(){
    return <React.Fragment>
        <li>hello</li>
        <li>world</li>
        {[
            <li key="blerp">hi</li>,
            <li key="blerpx">sup</li>
        ]}
    </React.Fragment>
}

function ForwardTest(){    
    const ref = React.createRef();
    return <FancyButton ref={ref}>Click me!</FancyButton>;
}


function ThinkWithPortals(props){
    return ReactDOM.createPortal(props.children, {
        nodeType: 1,
        children: []
    })
}
// const el = <React.StrictMode kdey="sdaf">
//     <Link page="http://www.facebook.com">Facebook</Link>
// </React.StrictMode>
// const el = <div>

// <LegacyContextProvider>
//         <LegacyContextConsumer />
//         <LegacyContextFunction />
//     </LegacyContextProvider>
//     <React.StrictMode><div>
//     <MagicDay.Provider value={777}>
//         <Link page="http://www.facebook.com">
//             <DemoStateful />
//         </Link>
//         <MagicDay.Consumer>{value => <MemoLogChildren>{value}</MemoLogChildren>}</MagicDay.Consumer>
//     </MagicDay.Provider>
    
//     <Link page="http://www.google.com">
//         <DemoComponent logState={e => {
//             console.log('hi logg', e)
//         }}/>
//     </Link>
//     <ForwardTest />
//     <ThinkWithPortals>
//         <div>hi</div>
//     </ThinkWithPortals>
//     <React.Suspense fallback={<div>loading...</div>}>
//         <LazyDummy />
//     </React.Suspense>
// </div>
// <FragTurner />
// </React.StrictMode></div>;


// let callRender = jest.fn()
let lastMessage;

class StatefulThing extends React.Component {
    constructor(){
        super()
        this.state = {
            message: 'hello'
        }
    }
    render(){
        // callRender()
        lastMessage = this.state.message;
        return <button>{this.state.message}</button>    
    }
    
}
const node = <StatefulThing />

const component = renderer.create(node);
// expect(callRender.mock.calls.length).toBe(1)
// expect(lastMessage).toBe('hello')

let root = findFiberRoot(component.root._fiber);
dryRender(elementFromFiber(root.child), root.child)
// expect(callRender.mock.calls.length).toBe(2)
// expect(lastMessage).toBe('hello')


act(() => {
    component.root.findByType(StatefulThing).instance.setState({
        message: 'zombocom'
    })
})

// expect(callRender.mock.calls.length).toBe(3)
// expect(lastMessage).toBe('zombocom')

dryRender(elementFromFiber(root.child), root.child)
// expect(callRender.mock.calls.length).toBe(4)
// expect(lastMessage).toBe('zombocom')



act(() => {
    component.root.findByType(StatefulThing).instance.setState(
        oldState => Object.assign({}, oldState, { message: 'meep' }))
    component.root.findByType(StatefulThing).instance.setState(
            oldState => Object.assign({}, oldState, { message: 'moop' }))
    
    dryRender(elementFromFiber(root.child), root.child)
    console.assert(lastMessage === 'moop')
    
            component.root.findByType(StatefulThing).instance.setState(
                oldState => Object.assign({}, oldState, { message: 'floop' }))
})

// expect(callRender.mock.calls.length).toBe(5)
// expect(lastMessage).toBe('meep')


// expect(callRender.mock.calls.length).toBe(6)
// expect(lastMessage).toBe('meep')


//         class Modal extends React.Component {
//             constructor(){
//                 super()
//                 this.el = {
//                     nodeType: 1,
//                     children: []
//                 }
//             }
//             render(){
//                 return ReactDOM.createPortal(this.props.children, this.el)
//             }
//         }

// const el = <Modal>
//             <div>
                
//             </div>
//         </Modal>
// dryRender(el, null)

// const el = [<React.StrictMode key="blah">{[<DemoComponent key="xyz" logState={e => {
//     console.log('logging state from prop', e)
// }} />]}</React.StrictMode>, <div key="derp">thing</div>]

// const component = renderer.create(el);

// let f = component.root._fiber;
// // console.log(React.createElement(f.type, { ...f.pendingProps } ))
// // console.log(component.toJSON())
// component.root.findByType(DemoComponent).instance.setState({
//     message: 'zombocom'
// })

// component.root.findByType('button').props.onClick()

// // console.log(component.toJSON())
// // console.log(el)
// let root = findFiberRoot(component.root._fiber);
// console.assert(!root.type)
// console.assert(root.tag === 3)
// console.log(root)



// setTimeout(() => {
//     dryRender(elementFromFiber(root.child), root.child)
//     debugger
// }, 0)



// setTimeout(function(){}, 100000000)

// debugger