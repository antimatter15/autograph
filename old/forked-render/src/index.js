import React, { useState, useContext, createContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as HostConfig from './hostconfig'
import Reconciler from 'react-reconciler'


let inceptionContext = createContext(false)


let callCount = 0;

function magicThing(){

    let inADream = useContext(inceptionContext)
    console.log(inADream)


    // useEffect(function(){
    //     debugger
    // })


    // callCount++
    // if(callCount === 1){
    //     extract()
    // }

    if(inADream == false){
        // extract()
    }
}


function App(){
    return <div>asdf</div>

    magicThing()

    let [ count, setCount ] = useState(0)
    return <div>
        <button onClick={e => setCount(count + 1)}>
            Clicked {count} times
        </button>

        <Mini />
    </div>
}


class Mini extends React.Component {
    constructor(){
        super()
        this.state = { count: 0 }
    }
    render(){
        return <div>
            <button onClick={e => this.setState({ count: this.state.count + 1 })}>
                Count: {this.state.count}
            </button>
        </div>
    }
}

const ReactReconcilerInst = Reconciler(HostConfig);


let el = document.getElementById('root')

let container = ReactReconcilerInst.createContainer(el, false)

ReactDOM.render(<inceptionContext.Provider value={false}>
    <App></App>
</inceptionContext.Provider>, el)

function show(data){
    for(let i in data){
        console.log(i, data[i])
    }
}


let mapping = new Map()

function makeLogger(base, path=''){
    if(base.__isProxy){
        return base;
    }
    if(mapping.has(base)){

        // console.log('memolook')
        return mapping.get(base)
    }

    let prox = new Proxy({
        __base: base
    }, {
        get(target, prop, receiver){
            let value;
            if(prop === '__isProxy'){
                return true
            }
            if(prop in target){
                // console.log("COPY ON WRITE WOOT", prop, target[prop])
                value = target[prop]
            }else{
                value = base[prop];
            }
            if(typeof value !== 'object' || !value){
                return value
            }

            if(value instanceof Map || value instanceof Set || value instanceof Element){
                // console.log(value)
                return value
            }

            console.log(path + '.' + prop, value)
            
            return makeLogger(value, path + '.' + prop)            
        },
        set(target, prop, value, receiver){
            // console.log('SET', prop, value)

            target[prop] = value;

            return true
        }
    })
    mapping.set(base, prox)
    return prox
}


function extract(){
    let rootContainer = el._reactRootContainer._internalRoot;
    // console.log(rootContainer, container)
    // show(rootContainer)

    // container.current = rootContainer.current
    console.log('extracting...')
    ReactReconcilerInst.updateContainer(<inceptionContext.Provider value={true}>
        <App></App>
    </inceptionContext.Provider>, makeLogger(container), null, function(){
        console.log('callback!')
    })
}

window.extract = extract;




// ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback)



// https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMHostConfig.js
// https://github.com/facebook/react/blob/master/packages/react-art/src/ReactARTHostConfig.js
// https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeHostConfig.js
// https://github.com/facebook/react/blob/master/packages/react-test-renderer/src/ReactTestHostConfig.js


