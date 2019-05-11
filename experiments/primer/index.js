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


let currentTotem;
let stateMap = new Map()
let state = {
    fields: [],
    data: {},
    sentinel: field => {
        if(!field) debugger;
        state.fields.push(field)
        if(field in state.data) return state.data[field];
        return 'hi'
    }
}

function usePrimer(client){
    let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current
    console.log(state, rootFiber.memoizedState)
    // if(!stateMap.has(rootFiber)){
    //     console.log('allocating a new thing')
    //     stateMap.set(rootFiber, {
    //         fields: [],
    //         data: {},
    //         sentinel: field => state.fields.push(field)
    //     })
    // }
    // let state = stateMap.get(rootFiber);
    let [ xyz, setState ] = useState(11)

    React.useEffect(() => {
        console.log('do')
        return () => {
            console.log('undo')
        }
    })
    
    // console.log(xyz, currentTotem)

    if(currentTotem) return state.sentinel;
    if(state.fetching) throw state.fetching;    

    
    return field => {
        if(field in state.data) return state.data[field];
        if(!state.fetching){
            state.fields = []
            let previousTotem = currentTotem;
            try {
                currentTotem = true;
                dryRender(elementFromFiber(rootFiber), rootFiber)
            } finally {
                currentTotem = previousTotem;
            }
            state.fetching = client(state.fields)
                .then(data => {
                    state.data = data
                    delete state.fetching
                })
            console.log('scheduled root rerender')
            // this has no effect when we are still inside the autograph root...
            setState(42) // schedule re-render autograph root
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

