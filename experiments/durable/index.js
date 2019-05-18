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


ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(
    <React.Suspense fallback={<div>test</div>}>
        blah
        <Meep></Meep>
        <Meep></Meep>
    </React.Suspense>)




// ReactDOM.render(
//     <App />
// , document.getElementById('root'))

