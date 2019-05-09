import React, { useEffect, useState } from 'react';
import renderer from 'react-test-renderer';
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
const el = <div>

<LegacyContextProvider>
        <LegacyContextConsumer />
        <LegacyContextFunction />
    </LegacyContextProvider>
    <React.StrictMode><div>
    <MagicDay.Provider value={777}>
        <Link page="http://www.facebook.com">
            <DemoStateful />
        </Link>
        <MagicDay.Consumer>{value => <MemoLogChildren>{value}</MemoLogChildren>}</MagicDay.Consumer>
    </MagicDay.Provider>
    
    <Link page="http://www.google.com">
        <DemoComponent logState={e => {
            console.log('hi logg', e)
        }}/>
    </Link>
    <ForwardTest />
    <ThinkWithPortals>
        <div>hi</div>
    </ThinkWithPortals>
    <React.Suspense fallback={<div>loading...</div>}>
        <LazyDummy />
    </React.Suspense>
</div>
<FragTurner />
</React.StrictMode></div>;


// const el = [<React.StrictMode key="blah">{[<DemoComponent key="xyz" logState={e => {
//     console.log('logging state from prop', e)
// }} />]}</React.StrictMode>, <div key="derp">thing</div>]

const component = renderer.create(el);

let f = component.root._fiber;
// console.log(React.createElement(f.type, { ...f.pendingProps } ))
// console.log(component.toJSON())
component.root.findByType(DemoComponent).instance.setState({
    message: 'zombocom'
})

component.root.findByType('button').props.onClick()

// console.log(component.toJSON())
// console.log(el)
let root = findFiberRoot(component.root._fiber);
console.assert(!root.type)
console.assert(root.tag === 3)
console.log(root)



setTimeout(() => {
    dryRender(elementFromFiber(root.child), root.child)
    debugger
}, 0)



// setTimeout(function(){}, 100000000)

// debugger