import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import dryRender from './dryrender'

const Database = {
    message1: 'hello world',
    message2: 'hello darkness',
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



const PrimerContext = React.createContext(null)

// function Primer(props){
//     let [ state, setState ] = useState(() => ({
//         fields: {},
//         data: {}
//     }))



// }


class Primer extends React.Component {
    constructor(){
        super()
        this.state = {
            fields: {},
            data: {},
            id: Math.random()
        }
    }
    render(){
        let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
        
        let state = this.state;
        let props = this.props;
        let client = props.client;
        let renderRoot = s => this.setState(s)

        console.log('root iber', rootFiber, state.id)

        function get(field){
            if(field in state.data) return state.data[field];
            if(!state.fetching){
            console.log('missing', field, state.fetching, state.sentinel, state.id)

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
                        
                        // console.log('fetched data', state.data)
                        // requestAnimationFrame(renderRoot)
                    })
            }
            throw state.fetching;
        }

        return <PrimerContext.Provider value={state.sentinel ? state.sentinel : get}>
            <React.Suspense fallback={<div>Loading (primer)...</div>}>
                {props.children}
            </React.Suspense>
        </PrimerContext.Provider>
    }
}



function App(){
    return <div>
        <Primer client={fetchData}>
            <Part1/>
            <Part2/>
        </Primer>
    </div>
}



function Part1(){
    // let get = usePrimer(fetchData)
    let get = React.useContext(PrimerContext)
    let [ x, setX ] = useState(42)

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
    // return <Derp x={x} setX={setX} get={get} />
}


function Part2(){
    // let get = usePrimer(fetchData)
    let get = React.useContext(PrimerContext)

    let [ x, setX ] = useState(55)

    // return <div>{get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button></div>
    return <React.Suspense fallback={<div>########</div>}>
        <Derp x={x} setX={setX} get={get} />
    </React.Suspense>
}

function Derp({ x, setX, get }){
    return <div>
        {get('message2')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
}


function elementFromFiber(fiber){
    if(!fiber) debugger;

    let props = { ...fiber.memoizedProps }
    if(fiber.key) props.key = fiber.key;
    return React.createElement(fiber.type, props)
}







// function useStateDurable(initialState){
//     // this is useState but it works in dreams with aborted initial renders...
//     // maybe use actualStartTime to determine if something has been reset?
//     // and key by rootFiber.type?
//     // and maybe additionally we should throw in the parentage? i.e. all the types of all the return fibers

//     // that means the only situation where this wouldn't work would be where you have multiple
//     // react roots which have otherwise identical trees being fed identical 
//     // well we can deal with that by also referencing the root stateNode, since that's got to be unique right

//     let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current
//     return useState(() => {





//     })
// }


// function usePrimer(client){
//     let [ state, setState ] = useState(() => ({
//         fields: {},
//         data: {}
//     }))

//     if(state.sentinel) return state.sentinel;
//     if(state.fetching) throw state.fetching;
//     let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current
//     debugger

//     if(typeof state === 'function') debugger;
//     return field => {
//         if(field in state.data) return state.data[field];
//         if(!state.fetching){
//             state.fields = {}
//             state.sentinel = field => {
//                 // console.log(state)
//                 state.fields[field] = 1
//                 if(field in state.data) return state.data[field];
//                 return 'hi'
//             }
//             console.groupCollapsed('dry render')
//             dryRender(elementFromFiber(rootFiber), rootFiber)    
//             console.groupEnd('dry render')
//             state.fetching = client(Object.keys(state.fields))
//                 .then(data => {
//                     state.data = data
//                     delete state.fetching
//                 })
//             setState({ ...state }) // clone object to force re-render
//         }
//         throw state.fetching;
//     }
// }


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

