import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import useStateDurable from './durable'


let loader, data;
function loadData(){
    if(data) return data;
    if(!loader){
        loader = new Promise((resolve) => {
            setTimeout(() => {
                data = 42
                resolve()
            }, 1000)
        })
    }
    throw loader
}



function Meep(){
    
    let state = useStateDurable(() => Math.random())
    
    console.log(state)

    loadData()

    let [ count, setCount ] = React.useState(0)

    return <div>
    hello
    <button onClick={e => setCount(count + 1)}>{count + state}</button>
    </div>
}

function A(){
    let [ n, setN ] = useState(0)
    return <button onClick={e => setN(x => x + 1)}>Clicked {n} times</button>
}

function B(){
    loadData()
    return <div>loaded!</div>
}

function Suspense2(props){
    let [ state, setState ] = React.useState(false);
    
    React.useEffect(() => {
        setTimeout(() => setState(true), 100 * Math.random())
    }, [])

    return <React.Suspense 
        fallback={props.fallback}>
            {state ? props.children : null}
        </React.Suspense>
}

ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(
    <div>
        Blarp
        <Suspense2 fallback={<div>test</div>}>
            blah
            <A />
        </Suspense2>

        <Suspense2 fallback={<div>test</div>}>
            <B />
        </Suspense2>
        
    </div>)



// ReactDOM.unstable_createRoot(document.getElementById('root'))
// .render(
//     <React.Suspense fallback={<div>test</div>}>
//         blah
//         <Meep></Meep>
//         <Meep></Meep>
//     </React.Suspense>)




// ReactDOM.render(
//     <App />
// , document.getElementById('root'))

