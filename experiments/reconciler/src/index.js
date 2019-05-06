//@flow

import React from 'react'
import ReactDOM from 'react-dom'
import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject';
import * as Scheduler from 'scheduler/unstable_mock';

import CustomRenderer from './reglbase'




// import {
//   createWorkInProgress,
//   createFiberFromElement,
//   createFiberFromFragment,
//   createFiberFromText,
//   createFiberFromPortal,
// } from 'react-reconciler';


class App extends React.Component {
    constructor(){
        super()
        this.state = { count: Math.random() }
    }
    // shouldComponentUpdate(){
    //   console.log('shodul i update')
    //   return true
    // }
    render(){
        // console.log(this)
        let num = this.state.count.toFixed(2);
        console.log(num)
        return <div>
            
            <p>hello world</p>

            <button onClick={e => this.setState({ count: 1 + this.state.count })}>
                Clicked <Thing>{num}</Thing> times
            </button>
        </div>
    }
}


function Thing(props){
  React.useEffect(() => {
    debugger
    console.log('hello')
  })
  console.log('thing', props.children)
    return <div>{props.children}</div>
}




console.log(CustomRenderer)

var element = <App />
// ReactDOM.render(element, document.getElementById('root'))

// render(<App />, { stuff: [] })

// var internalRoot = document.getElementById('root')._reactRootContainer._internalRoot
// console.log(internalRoot)

// setTimeout(() => {


// const customContainer = CustomRenderer.createContainer({});
// customContainer.current = cloneFiber(internalRoot.current);
// console.log(customContainer, 'cc')
// debugger
// CustomRenderer.updateContainer(<App xyz />, customContainer, null);


let customContainer = CustomRenderer.createContainer({});


CustomRenderer.updateContainer(<App />, customContainer, null)
CustomRenderer.updateContainer(<App />, customContainer, null)
// CustomRenderer.updateContainer(<App />, customContainer, null)
// CustomRenderer.updateContainer(<App />, customContainer, null)

console.log(customContainer)

function cloneFiber(fiber, map = new Map()){
  if(!fiber) return fiber;

  if(map.has(fiber)) return map.get(fiber);

  let clone = { ...fiber }
  map.set(fiber, clone)

  if(clone.stateNode){
    clone.stateNode = {
      containerInfo: {}
    }
  }

  clone.child = cloneFiber(fiber.child, map)
  clone.sibling = cloneFiber(fiber.sibling, map)
  clone.return = cloneFiber(fiber.return, map)
  
  return clone;
}

// }, 100)




// function metaproxy(obj){
//     return new Proxy(obj, {
//         get(target, prop, receiver){
//             let value = Reflect.get(target, prop, receiver)

//             if(value && typeof value == 'object'){
//                 console.log('getting', prop, value)
//                 return metaproxy(value)
//             }
//             return value;
//             // console.log(prop, receiver, Reflect.get(...arguments))
//             // return Reflect.get(...arguments);
//         }
//     })
// }


// var p = metaproxy(internalRoot);

// // 
// CustomRenderer.updateContainer(<App two />, p, null);


// setTimeout(function(args) {
//     CustomRenderer.updateContainer(element, internalRoot, null);
// }, 1000)
// // 

