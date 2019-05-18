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






// function usePrimer(client){
//     let state = useStateDurable(() => ({
//         fields: {},
//         data: {}
//     }))
//     let [ updateCount, setUpdateCount ] = useState(0)
    
//     if(state.sentinel) return state.sentinel;
//     if(state.fetching) throw state.fetching;
    
//     let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current

//     return field => {
//         if(field in state.data) return state.data[field];
//         if(!state.fetching){
//             state.fields = {}
//             state.sentinel = field => {
//                 state.fields[field] = 1
//                 if(field in state.data) return state.data[field];
//                 return 'hi'
//             }
//             console.groupCollapsed('dry render')
//             dryRender(elementFromFiber(rootFiber), rootFiber)    
//             console.groupEnd('dry render')
//             delete state.sentinel
//             state.fetching = client(Object.keys(state.fields))
//                 .then(data => {
//                     state.data = data
//                     delete state.fetching
//                     setUpdateCount(x => x + 1) // trigger autograph root re-render with new data
//                 })
//         }
//         throw state.fetching;
//     }
// }

const PrimerContext = React.createContext(null)
let durableStates = [];

function usePrimer(){
    return React.useContext(PrimerContext)
}

class Primer extends React.Component {
    
    componentDidMount(){
        if(this.state && this.state.path){
            delKV(durableStates, this.state.path)
        }
    }

    render(){
        if(!this.state){
            console.log('creating state', durableStates)

            let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
            let path = getFiberPath(rootFiber),
                state = getKV(durableStates, path)

            if(state !== undefined){
                this.state = state
            }else{
                this.state = {
                    fields: {},
                    data: {},
                    path: path
                }
                setKV(durableStates, path, this.state)
            }
        }

        let state = this.state;
        if(state.fetching) throw state.fetching;
        let client = this.props.client;
        let triggerUpdate = () => this.setState({ })

        let rootFiber = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current
        let query = state.sentinel ? state.sentinel : field => {
            if(field in state.data) return state.data[field];
            console.log('cache miss', state.data, field)
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
                        triggerUpdate() // trigger autograph root re-render with new data
                    })
            }
            throw state.fetching;
        }
        
        let children;
        // children can be a function (render prop) or ordinary jsx
        if(typeof this.props.children === 'function'){
            // use an external runner component so that it can read contexts from within
            children = <Runner query={query}>{this.props.children}</Runner>
        }else{
            children = this.props.children;
            
            if(this.props.context === null){
                console.warn('Context is null and render prop is unused. This Autograph root does nothing.')
            }
        }

        if(this.props.context !== null){
            // if we aren't explicitly disabling contexts, inject a context provider int the render tree
            const ContextProvider = (this.props.context || PrimerContext).Provider;
            children = <ContextProvider value={query}>{children}</ContextProvider>
        }

        if(this.props.fallback === null){
            // if we're explicitly disabling the automatic suspense boundary
            return children
        }else{
            return <React.Suspense fallback={this.props.fallback || <div>Loading (default)...</div>}>{
                children
            }</React.Suspense>
        }
        
    }
}


function Runner(props){
    return props.children(props.query)
}

function getFiberPath(fiber){
    let path = [];
    while(fiber.return){
        path.unshift(fiber.type, fiber.key || fiber.index)
        fiber = fiber.return;
    }
    path.unshift(fiber.stateNode)
    return path;
}


// this is basically an implementation of association lists
// with arbitrary custom predicates. this is because javascript
// maps don't support tuple keys. 

function tupleEqual(a, b){
    return a.length === b.length && a.every((k, i) => k === b[i])
}

function getKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    return index < 0 ? undefined : store[index][1]
}

function setKV(store, key, value, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store[index][1] = value;
    else store.push([ key, value ]);
}

function delKV(store, key, cmp = tupleEqual){
    let index = store.findIndex(([k, v]) => cmp(key, k));
    if(index != -1) store.splice(index, 1);
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




// ReactDOM.unstable_createRoot(document.getElementById('root'))
// .render(<Meep>
//     <App />
// </Meep>)


ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(<Primer client={fetchData}>
    <Part1 />
    <App />
</Primer>)







// ReactDOM.render(
//     <App />
// , document.getElementById('root'))

