import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import dryRender from './dryrender'

const Database = {
    message: 'hello world',
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
        }, 100)
    })
}


function App(){
    return <div>
        <React.Suspense fallback={<div>Loading...</div>}>
            <Part1/>
        </React.Suspense>
    </div>
}



function Part1(){
    // let get = usePrimer(fetchData)
    let get = React.useContext(PrimerContext)
    let [ x, setX ] = useState(42)

    return <div>
        {get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
    // return <Derp x={x} setX={setX} get={get} />
}


function Part2(){
    let get = usePrimer(fetchData)
    let [ x, setX ] = useState(55)

    // return <div>{get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button></div>
    return <Derp x={x} setX={setX} get={get} />
}

function Derp({ x, setX, get }){
    return <div>
        {get('message')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
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



const PrimerContext = React.createContext(null)

// function AutographRoot({ children, client }){
//     let [ state, setState ] = useState(() => ({
//         fields: {},
//         data: {}
//     }))
//     let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
//     if(state.fetching) throw state.fetching;

//     return <PrimerContext.Provider value={state.sentinel ? state.sentinel : field => {
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
//             // dryRender(elementFromFiber(rootFiber), rootFiber)    
//             console.groupEnd('dry render')
//             state.fetching = client(Object.keys(state.fields))
//                 .then(data => {
//                     state.data = data
//                     delete state.fetching
//                 })
//             setState({ ...state }) // clone object to force re-render
//         }
//         throw state.fetching;
//     }}>
//         {children}
//     </PrimerContext.Provider>    
// }
// class AutographRoot extends React.Component {
//     constructor(){
//         super()
//         this.state = {
//             fields: {},
//             data: {}
//         }
//     }
//     get(field){
//         let state = this.state;
//         if(field in state.data) return state.data[field];
//         if(!state.fetching){
//             state.fields = {}
//             state.sentinel = field => {
//                 state.fields[field] = 1
//                 if(field in state.data) return state.data[field];
//                 return 'hi'
//             }
//             console.groupCollapsed('dry render')
//             dryRender(elementFromFiber(this.rootFiber), this.rootFiber)    
//             state.fetching = this.props.client(Object.keys(state.fields))
//                 .then(data => {
//                     state.data = data
//                     delete state.fetching
//                 })
//             this.setState({})
//         }
//         throw state.fetching;
//     }
//     render(){
//         this.rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
//         return <PrimerContext.Provider value={this.state.sentinel ? this.state.sentinel : this.get.bind(this)}>
//             {this.props.children}
//         </PrimerContext.Provider>
//     }
// }

// <Autograph></Autograph>

// const clientMap = new Map()

// function usePrimer(client){
//     if(!clientMap.has(client)){
//         clientMap.set(client, {
//             fields: {},
//             data: {},
//             callbacks: {}
//         })
//     }
//     let state = clientMap.get(client);
//     let [ callbackID, triggerCallback ] = useState(() => Math.random().toString(36).slice(3))

//     if(state.sentinel) return state.sentinel;
//     if(state.fetching) throw state.fetching;
    
//     let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current
//     state.callbacks[callbackID.split('#')[0]] = [ rootFiber, () => {
//         console.log('rerender', callbackID)
//         triggerCallback(callbackID.split('#')[0] + '#' + Math.random())
//     } ]
//     console.log('render', callbackID)

//     return field => {
//         if(field in state.data) return state.data[field];
//         console.log('missing data', field, state.data)
//         if(!state.fetching){
//             console.groupCollapsed('dry render')
//             state.fields = {}
//             state.sentinel = field => {
//                 console.log('sentinel read', field)
//                 state.fields[field] = 1
//                 if(field in state.data) return state.data[field];
//                 return 'hi'
//             }
//             for(let id in state.callbacks){
//                 let rootFiber = state.callbacks[id][0]
//                 dryRender(elementFromFiber(rootFiber), rootFiber)    
//             }
            
//             delete state.sentinel;
//             console.groupEnd('dry render')

//             state.fetching = client(Object.keys(state.fields))
//                 .then(data => {
//                     state.data = data
//                     delete state.fetching
//                 })
            
//             // trigger a re-render for all autograph roots which are
//             // attached to this client
//             for(let id in state.callbacks) state.callbacks[id][1]();
//             state.callbacks = {}
//         }
//         throw state.fetching;
//     }
// }





// ReactDOM.unstable_createRoot(document.getElementById('root'))
// .render(<React.Suspense fallback={<div>Loading...</div>}>
//     <App />
// </React.Suspense>)



ReactDOM.render(
    <App />
, document.getElementById('root'))

