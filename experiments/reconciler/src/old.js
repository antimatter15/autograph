//@flow

import React from 'react'
import ReactDOM from 'react-dom'
import Reconciler from 'react-reconciler'
import emptyObject from 'fbjs/lib/emptyObject';
import * as Scheduler from 'scheduler/unstable_mock';

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
  console.log('thing', props.children)
    return <div>{props.children}</div>
}



// function App(){

//   return <div>
//     hello world
//   </div>
// }

// function createElement(type, props) {
//     // if(type == 'ROOT'){
//     //     return { type: 'rooot', children: [] }
//     // }else{
//     return { type: type, props: props, children: [] }
//     // }
//     // const COMPONENTS = {
//     //     ROOT: () => new WordDocument(),
//     //     TEXT: () => new Text(ROOT_NODE_INSTANCE, props),
//     //     default: undefined,
//     // };

//     // return COMPONENTS[type]() || COMPONENTS.default;
// }



const NO_CONTEXT = {};
const UPPERCASE_CONTEXT = {};
const EVENT_COMPONENT_CONTEXT = {};
const EVENT_TARGET_CONTEXT = {};
const EVENT_TOUCH_HIT_TARGET_CONTEXT = {};
const UPDATE_SIGNAL = {};


 let instanceCounter = 0;
  let hostDiffCounter = 0;
  let hostUpdateCounter = 0;
  let hostCloneCounter = 0;

  const __DEV__ = false;

  function shouldSetTextContent(type: string, props: Props): boolean {
    if (type === 'errorInBeginPhase') {
      throw new Error('Error in host config.');
    }
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  }

  function computeText(rawText, hostContext) {
    return hostContext === UPPERCASE_CONTEXT ? rawText.toUpperCase() : rawText;
  }



  function appendChildToContainerOrInstance(
    parentInstance: Container | Instance,
    child: Instance | TextInstance,
  ): void {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  }

  function appendChildToContainer(
    parentInstance: Container,
    child: Instance | TextInstance,
  ): void {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error(
        'appendChildToContainer() first argument is not a container.',
      );
    }
    appendChildToContainerOrInstance(parentInstance, child);
  }

  function appendChild(
    parentInstance: Instance,
    child: Instance | TextInstance,
  ): void {
    if (typeof (parentInstance: any).rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('appendChild() first argument is not an instance.');
    }
    appendChildToContainerOrInstance(parentInstance, child);
  }

  function insertInContainerOrInstanceBefore(
    parentInstance: Container | Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ): void {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild);
    if (beforeIndex === -1) {
      throw new Error('This child does not exist.');
    }
    parentInstance.children.splice(beforeIndex, 0, child);
  }

  function insertInContainerBefore(
    parentInstance: Container,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ) {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error(
        'insertInContainerBefore() first argument is not a container.',
      );
    }
    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance,
  ) {
    if (typeof (parentInstance: any).rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('insertBefore() first argument is not an instance.');
    }
    insertInContainerOrInstanceBefore(parentInstance, child, beforeChild);
  }

  function removeChildFromContainerOrInstance(
    parentInstance: Container | Instance,
    child: Instance | TextInstance,
  ): void {
    const index = parentInstance.children.indexOf(child);
    if (index === -1) {
      throw new Error('This child does not exist.');
    }
    parentInstance.children.splice(index, 1);
  }

  function removeChildFromContainer(
    parentInstance: Container,
    child: Instance | TextInstance,
  ): void {
    if (typeof parentInstance.rootID !== 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error(
        'removeChildFromContainer() first argument is not a container.',
      );
    }
    removeChildFromContainerOrInstance(parentInstance, child);
  }

  function removeChild(
    parentInstance: Instance,
    child: Instance | TextInstance,
  ): void {
    if (typeof (parentInstance: any).rootID === 'string') {
      // Some calls to this aren't typesafe.
      // This helps surface mistakes in tests.
      throw new Error('removeChild() first argument is not an instance.');
    }
    removeChildFromContainerOrInstance(parentInstance, child);
  }


  function cloneInstance(
    instance: Instance,
    updatePayload: null | Object,
    type: string,
    oldProps: Props,
    newProps: Props,
    internalInstanceHandle: Object,
    keepChildren: boolean,
    recyclableInstance: null | Instance,
  ): Instance {
    const clone = {
      id: instance.id,
      type: type,
      children: keepChildren ? instance.children : [],
      text: shouldSetTextContent(type, newProps)
        ? computeText((newProps.children: any) + '', instance.context)
        : null,
      prop: newProps.prop,
      hidden: newProps.hidden === true,
      context: instance.context,
    };
    Object.defineProperty(clone, 'id', {
      value: clone.id,
      enumerable: false,
    });
    Object.defineProperty(clone, 'text', {
      value: clone.text,
      enumerable: false,
    });
    Object.defineProperty(clone, 'context', {
      value: clone.context,
      enumerable: false,
    });
    hostCloneCounter++;
    return clone;
  }



const CustomRenderer = Reconciler({
  getRootHostContext() {
      return NO_CONTEXT;
    },

    getChildHostContext(
      parentHostContext: HostContext,
      type: string,
      rootcontainerInstance: Container,
    ) {
      if (type === 'uppercase') {
        return UPPERCASE_CONTEXT;
      }
      return NO_CONTEXT;
    },

    getChildHostContextForEventComponent(parentHostContext: HostContext) {
      if (__DEV__ && enableEventAPI) {
        warning(
          parentHostContext !== EVENT_TARGET_CONTEXT &&
            parentHostContext !== EVENT_TOUCH_HIT_TARGET_CONTEXT,
          'validateDOMNesting: React event targets must not have event components as children.',
        );
        return EVENT_COMPONENT_CONTEXT;
      }
      return parentHostContext;
    },

    getChildHostContextForEventTarget(
      parentHostContext: HostContext,
      type: Symbol | number,
    ) {
      if (__DEV__ && enableEventAPI) {
        if (type === REACT_EVENT_TARGET_TOUCH_HIT) {
          warning(
            parentHostContext !== EVENT_COMPONENT_CONTEXT,
            'validateDOMNesting: <TouchHitTarget> cannot not be a direct child of an event component. ' +
              'Ensure <TouchHitTarget> is a direct child of a DOM element.',
          );
          return EVENT_TOUCH_HIT_TARGET_CONTEXT;
        }
        return EVENT_TARGET_CONTEXT;
      }
      return parentHostContext;
    },

    getPublicInstance(instance) {
      return instance;
    },

    createInstance(
      type: string,
      props: Props,
      rootContainerInstance: Container,
      hostContext: HostContext,
    ): Instance {
      if (type === 'errorInCompletePhase') {
        throw new Error('Error in host config.');
      }
      const inst = {
        id: instanceCounter++,
        type: type,
        children: [],
        text: shouldSetTextContent(type, props)
          ? computeText((props.children: any) + '', hostContext)
          : null,
        prop: props.prop,
        hidden: props.hidden === true,
        context: hostContext,
      };
      // Hide from unit tests
      Object.defineProperty(inst, 'id', {value: inst.id, enumerable: false});
      Object.defineProperty(inst, 'text', {
        value: inst.text,
        enumerable: false,
      });
      Object.defineProperty(inst, 'context', {
        value: inst.context,
        enumerable: false,
      });
      return inst;
    },

    appendInitialChild(
      parentInstance: Instance,
      child: Instance | TextInstance,
    ): void {
      parentInstance.children.push(child);
    },

    finalizeInitialChildren(
      domElement: Instance,
      type: string,
      props: Props,
    ): boolean {
      return false;
    },

    prepareUpdate(
      instance: Instance,
      type: string,
      oldProps: Props,
      newProps: Props,
    ): null | {} {
      if (type === 'errorInCompletePhase') {
        throw new Error('Error in host config.');
      }
      if (oldProps === null) {
        throw new Error('Should have old props');
      }
      if (newProps === null) {
        throw new Error('Should have new props');
      }
      hostDiffCounter++;
      return UPDATE_SIGNAL;
    },

    shouldSetTextContent,

    shouldDeprioritizeSubtree(type: string, props: Props): boolean {
      return !!props.hidden;
    },

    createTextInstance(
      text: string,
      rootContainerInstance: Container,
      hostContext: Object,
      internalInstanceHandle: Object,
    ): TextInstance {
      if (__DEV__ && enableEventAPI) {
        warning(
          hostContext !== EVENT_COMPONENT_CONTEXT,
          'validateDOMNesting: React event components cannot have text DOM nodes as children. ' +
            'Wrap the child text "%s" in an element.',
          text,
        );
      }
      if (hostContext === UPPERCASE_CONTEXT) {
        text = text.toUpperCase();
      }
      const inst = {
        text: text,
        id: instanceCounter++,
        hidden: false,
        context: hostContext,
      };
      // Hide from unit tests
      Object.defineProperty(inst, 'id', {value: inst.id, enumerable: false});
      Object.defineProperty(inst, 'context', {
        value: inst.context,
        enumerable: false,
      });
      return inst;
    },

    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,

    prepareForCommit(): void {},

    resetAfterCommit(): void {},

    now: Scheduler.unstable_now,

    isPrimaryRenderer: true,
    supportsHydration: false,

    mountEventComponent(): void {
      // NO-OP
    },

    shouldYield(){
      return false;
    },

    updateEventComponent(): void {
      // NO-OP
    },

    unmountEventComponent(): void {
      // NO-OP
    },

    scheduleDeferredCallback(callback, settings){
      console.log('scheduling!', callback, settings)
      callback()
    },

    getEventTargetChildElement(
      type: Symbol | number,
      props: Props,
    ): null | EventTargetChildElement {
      if (enableEventAPI) {
        if (type === REACT_EVENT_TARGET_TOUCH_HIT) {
          const {bottom, left, right, top} = props;

          if (!bottom && !left && !right && !top) {
            return null;
          }
          return {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                zIndex: -1,
                bottom: bottom ? `-${bottom}px` : '0px',
                left: left ? `-${left}px` : '0px',
                right: right ? `-${right}px` : '0px',
                top: top ? `-${top}px` : '0px',
              },
            },
          };
        }
      }
      return null;
    },

    handleEventTarget(
      type: Symbol | number,
      props: Props,
      rootContainerInstance: Container,
      internalInstanceHandle: Object,
    ): boolean {
      return false;
    },

    commitEventTarget(
      type: Symbol | number,
      props: Props,
      instance: Instance,
      parentInstance: Instance,
    ): void {
      // NO-OP
    },

        supportsMutation: true,
        supportsPersistence: false,

        commitMount(instance: Instance, type: string, newProps: Props): void {
          // Noop
        },

        commitUpdate(
          instance: Instance,
          updatePayload: Object,
          type: string,
          oldProps: Props,
          newProps: Props,
        ): void {
          if (oldProps === null) {
            throw new Error('Should have old props');
          }
          hostUpdateCounter++;
          instance.prop = newProps.prop;
          instance.hidden = newProps.hidden === true;
          if (shouldSetTextContent(type, newProps)) {
            instance.text = computeText(
              (newProps.children: any) + '',
              instance.context,
            );
          }
        },

        commitTextUpdate(
          textInstance: TextInstance,
          oldText: string,
          newText: string,
        ): void {
          hostUpdateCounter++;
          textInstance.text = computeText(newText, textInstance.context);
        },

        appendChild,
        appendChildToContainer,
        insertBefore,
        insertInContainerBefore,
        removeChild,
        removeChildFromContainer,

        hideInstance(instance: Instance): void {
          instance.hidden = true;
        },

        hideTextInstance(textInstance: TextInstance): void {
          textInstance.hidden = true;
        },

        unhideInstance(instance: Instance, props: Props): void {
          if (!props.hidden) {
            instance.hidden = false;
          }
        },

        unhideTextInstance(textInstance: TextInstance, text: string): void {
          textInstance.hidden = false;
        },

        resetTextContent(instance: Instance): void {
          instance.text = null;
        },
      
        supportsMutation: false,
        supportsPersistence: true,

        cloneInstance,

        createContainerChildSet(
          container: Container,
        ): Array<Instance | TextInstance> {
          return [];
        },

        appendChildToContainerChildSet(
          childSet: Array<Instance | TextInstance>,
          child: Instance | TextInstance,
        ): void {
          childSet.push(child);
        },

        finalizeContainerChildren(
          container: Container,
          newChildren: Array<Instance | TextInstance>,
        ): void {
          container.pendingChildren = newChildren;
        },

        replaceContainerChildren(
          container: Container,
          newChildren: Array<Instance | TextInstance>,
        ): void {
          console.log(container)
          container.children = newChildren;
        },

        cloneHiddenInstance(
          instance: Instance,
          type: string,
          props: Props,
          internalInstanceHandle: Object,
        ): Instance {
          const clone = cloneInstance(
            instance,
            null,
            type,
            props,
            props,
            internalInstanceHandle,
            true,
            null,
          );
          clone.hidden = true;
          return clone;
        },

        cloneHiddenTextInstance(
          instance: TextInstance,
          text: string,
          internalInstanceHandle: Object,
        ): TextInstance {
          const clone = {
            text: instance.text,
            id: instanceCounter++,
            hidden: true,
            context: instance.context,
          };
          // Hide from unit tests
          Object.defineProperty(clone, 'id', {
            value: clone.id,
            enumerable: false,
          });
          Object.defineProperty(clone, 'context', {
            value: clone.context,
            enumerable: false,
          });
          return clone;
        },

  // appendInitialChild(parentInstance, child) {
  //   // if (parentInstance.appendChild) {
  //   //   parentInstance.appendChild(child);
  //   // } else {
  //   //   parentInstance.document = child;
  //   // }
  //    console.log('append initial', parentInstance)
  //    parentInstance.children.push(child);
  // },

  // appendChild(parent, stateNode){
  //   console.log('append child', parent, stateNode)

  // },
  // appendChildToContainer(parentInstance, child) {
  //   console.log('appen dchild to container')
  //     parentInstance.stuff.push(child);
  //   },

  // createInstance(type, props, internalInstanceHandle) {
  //   console.log('create instance')
  //   return createElement(type, props, internalInstanceHandle);
  // },

  // createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
  //   console.log('create text', text, rootContainerInstance, internalInstanceHandle)
  //   // return text;
  // },

  // finalizeInitialChildren(wordElement, type, props) {
  //   console.log('finalize children')
  //   return false;
  // },

  // getPublicInstance(inst) {
  //   console.log('get public instance', inst)
  //   return inst;
  // },

  // prepareForCommit() {
  //   console.log('prepare for commit')
  //   // noop
  // },

  // commitUpdate(){
  //   console.log('commit updates')
  // },

  // prepareUpdate(wordElement, type, oldProps, newProps) {
  //   console.log('prepareUpdate', wordElement)
  //   return true;
  // },

  // resetAfterCommit() {
  //   console.log('reset after commit')
  //   // noop
  // },

  // resetTextContent(wordElement) {
  //   // noop
  //   console.log('reset text', wordElement)
  // },

  // getRootHostContext(rootInstance) {
  //   console.log('get root host', rootInstance)
  //   // You can use this 'rootInstance' to pass data from the roots.
  // },

  // getChildHostContext() {
  //   return emptyObject;
  // },

  // shouldSetTextContent(type, props) {
  //   console.log('should set', type, props)
  //   return false;
  // },

  // clearTimeout(handle){
  //   console.log('clearTimeout', handle)
  // },

  // isPrimaryRenderer: false,
  // now: () => {},

  // supportsMutation: false,


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
console.log(internalRoot)

// setTimeout(() => {


const customContainer = CustomRenderer.createContainer({});
customContainer.current = cloneFiber(internalRoot.current);
console.log(customContainer, 'cc')
debugger
CustomRenderer.updateContainer(<App xyz />, customContainer, null);



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

