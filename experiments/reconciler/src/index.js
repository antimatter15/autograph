import React from 'react'
import ReactDOM from 'react-dom'
import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject';


class App extends React.Component {
    constructor(){
        super()
        this.state = { count: Math.random() }
    }
    render(){
        console.log(this)
        return <div>
            
            <p>hello world</p>

            <button onClick={e => this.setState({ count: 1 + this.state.count })}>
                Clicked <Thing>{this.state.count}</Thing> times
            </button>
        </div>
    }
}


function Thing(props){
    return <div>{props.children}</div>
}


function createElement(type, props) {
    // if(type == 'ROOT'){
    //     return { type: 'rooot', children: [] }
    // }else{
    return { type: type, props: props, children: [] }
    // }
    // const COMPONENTS = {
    //     ROOT: () => new WordDocument(),
    //     TEXT: () => new Text(ROOT_NODE_INSTANCE, props),
    //     default: undefined,
    // };

    // return COMPONENTS[type]() || COMPONENTS.default;
}



const CustomRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    // if (parentInstance.appendChild) {
    //   parentInstance.appendChild(child);
    // } else {
    //   parentInstance.document = child;
    // }
     console.log('append initial', parentInstance)
     parentInstance.children.push(child);
  },

  appendChild(parent, stateNode){
    console.log('append child', parent, stateNode)

  },
  appendChildToContainer(parentInstance, child) {
    console.log('appen dchild to container')
      parentInstance.stuff.push(child);
    },

  createInstance(type, props, internalInstanceHandle) {
    console.log('create instance')
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    console.log('create text', text, rootContainerInstance, internalInstanceHandle)
    // return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    console.log('finalize children')
    return false;
  },

  getPublicInstance(inst) {
    console.log('get public instance', inst)
    return inst;
  },

  prepareForCommit() {
    console.log('prepare for commit')
    // noop
  },

  commitUpdate(){
    console.log('commit updates')
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    console.log('prepareUpdate', wordElement)
    return true;
  },

  resetAfterCommit() {
    console.log('reset after commit')
    // noop
  },

  resetTextContent(wordElement) {
    // noop
    console.log('reset text', wordElement)
  },

  getRootHostContext(rootInstance) {
    console.log('get root host', rootInstance)
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    console.log('should set', type, props)
    return false;
  },

  clearTimeout(handle){
    console.log('clearTimeout', handle)
  },

  isPrimaryRenderer: false,
  now: () => {},

  supportsMutation: false,


})


function render(element, filePath) {
  // const container = createElement('ROOT');

  const node = CustomRenderer.createContainer(filePath);

  console.log('react root', node)

  CustomRenderer.updateContainer(element, node, null);

  // const stream = fs.createWriteStream(filePath);

  // await new Promise((resolve, reject) => {
  //   container.doc.generate(stream, Events(filePath, resolve, reject));
  // });
}


console.log(CustomRenderer)

var element = <App />
ReactDOM.render(element, document.getElementById('root'))

// render(<App />, { stuff: [] })

var internalRoot = document.getElementById('root')._reactRootContainer._internalRoot

function metaproxy(obj){
    return new Proxy(obj, {
        get(target, prop, receiver){
            let value = Reflect.get(target, prop, receiver)

            if(value && typeof value == 'object'){
                console.log('getting', prop, value)
                return metaproxy(value)
            }
            return value;
            // console.log(prop, receiver, Reflect.get(...arguments))
            // return Reflect.get(...arguments);
        }
    })
}


var p = metaproxy(internalRoot);

// 
CustomRenderer.updateContainer(<App two />, p, null);


// setTimeout(function(args) {
//     CustomRenderer.updateContainer(element, internalRoot, null);
// }, 1000)
// // 

