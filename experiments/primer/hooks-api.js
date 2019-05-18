import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import dryRender from './dryrender'
import useStateDurable from './durable'


const Database = {
    message1: 'hello world',
    message2: 'hello darkness',
    message3: 'goodbye darkness',
    message4: 'goodbye world',
    42: 'merp',
    43: 'yolo',
    44: 'derp',
    time: () => Date.now()
}

function fetchData(fields){
    console.log('fetching fields', fields)
    return new Promise((resolve) => {
        setTimeout(function(){
            let result = {}
            for(let field of fields){
                if(typeof Database[field] === 'function'){
                    result[field] = Database[field]()
                }else{
                    result[field] = Database[field]    
                }
            }
            resolve(result)
        }, 1000)
    })
}



function App(){
    return <div>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Part1/>
            <Part2/>
        </React.Suspense>
    </div>
}



function Part1(){
    let get = usePrimer(fetchData)
    // let get = React.useContext(PrimerContext)
    let [ x, setX ] = useState(42)

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
    // return <Derp x={x} setX={setX} get={get} />
}


function Part2(){
    let get = usePrimer(fetchData)
    // let get = React.useContext(PrimerContext)

    let [ x, setX ] = useState(55)

    // return <div>{get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button></div>
    return <div>
        <div>
            {get('message3')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
            <p>{get('time')}</p>
        </div>

        <React.Suspense fallback={<div>########</div>}>
            <Derp x={x} setX={setX} get={get} />
            <Burp get={get} />
        </React.Suspense>
    </div>
}

function Derp({ x, setX, get }){
    return <div>
        {get('message2')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>derp: {get('time')}</p>
    </div>
}


function Burp({ get }){
    let [ x, setX ] = useState(11)
    return <div>
        {get('message4')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>derp: {get('time')}</p>
    </div>
}


function elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}






function usePrimer(client){
    let state = useStateDurable(() => ({
        fields: {},
        data: {}
    }))
    let [ updateCount, setUpdateCount ] = useState(0)
    
    if(state.sentinel) return state.sentinel;
    if(state.fetching) throw state.fetching;
    
    let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current

    return field => {
        if(field in state.data) return state.data[field];
        if(!state.fetching){
            state.fields = {}
            state.sentinel = field => {
                state.fields[field] = 1
                if(field in state.data) return state.data[field];
                return 'hi'
            }
            console.groupCollapsed('dry render')
            dryRender(elementFromFiber(rootFiber), rootFiber)    
            console.groupEnd('dry render')
            delete state.sentinel
            state.fetching = client(Object.keys(state.fields))
                .then(data => {
                    state.data = data
                    delete state.fetching
                    setUpdateCount(x => x + 1) // trigger autograph root re-render with new data
                })
        }
        throw state.fetching;
    }
}


class Meep extends React.Component {
    constructor(){
        super()
        console.log('I AM MEEP CONSTRUCTOR OF WORLDS')
    }
    render(){
        return this.props.children;
    }
}




ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(<Meep>
    <App />
</Meep>)








// ReactDOM.render(
//     <App />
// , document.getElementById('root'))

