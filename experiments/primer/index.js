import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import dryRender from './dryrender'

const Database = {
    message: 'hello world',
    42: 'merp',
    43: 'yolo',
    44: 'derp'
}

function fetchData(fields){
    console.log('fetching fields', fields)
    return new Promise((resolve) => {
        setTimeout(function(){
            let result = {}
            for(let field of fields){
                result[field] = Database[field]
            }
            resolve(result)
        }, 1000)
    })
}


function App(){
    let get = usePrimer(fetchData)
    let [ x, setX ] = useState(42)

    // return <div>{get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button></div>
    return <Derp x={x} setX={setX} get={get} />
}


function Derp({ x, setX, get }){
    return <div>{get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button></div>
}


function elementFromFiber(fiber){
    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}



const clientMap = new Map()

function usePrimer(client){
    if(!clientMap.has(client)){
        clientMap.set(client, {
            fields: [],
            data: {},
            callbacks: {}
        })
    }
    let state = clientMap.get(client);
    let [ callbackID, triggerCallback ] = useState(Math.random().toString(36).slice(3))

    if(state.sentinel) return state.sentinel;
    if(state.fetching) throw state.fetching;

    state.callbacks[callbackID] = () => {
        // callbacks are only fired once
        delete state.callbacks[callbackID]
        console.log('remaining callbacks', Object.keys(state.callbacks))
        triggerCallback(callbackID)
    };
    // state.callbacks.push(cb)
    console.log('adding callback', callbackID)
    
    let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current

    return field => {
        if(field in state.data) return state.data[field];
        console.log('missing data', field, state.data)
        if(!state.fetching){
            state.fields = []
            state.sentinel = field => {
                console.log('sentinel read', field)
                state.fields.push(field)
                if(field in state.data) return state.data[field];
                return 'hi'
            }
            dryRender(elementFromFiber(rootFiber), rootFiber)
            delete state.sentinel;

            state.fetching = client(state.fields)
                .then(data => {
                    state.data = data
                    delete state.fetching
                })
            
            // trigger a re-render for all autograph roots which are
            // attached to this client
            for(let id in state.callbacks) state.callbacks[id]();
        }
        throw state.fetching;
    }
}





ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(<React.Suspense fallback={<div>Loading...</div>}>
    <App />
</React.Suspense>)



// ReactDOM.render(<React.Suspense fallback={<div>Loading...</div>}>
//     <App />
// </React.Suspense>, document.getElementById('root'))

