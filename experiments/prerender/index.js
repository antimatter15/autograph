import React from 'react'
import ReactDOM from 'react-dom'
import * as Scheduler from "scheduler";

const Context = React.createContext()

let cache = {}
function useData(input){
    let ctx = React.useContext(Context)

    if(ctx === 100){
        return 0
    }

    if(input in cache){
        return cache[input]
    }

    throw Promise.resolve(-input).then(async k => {
        let batch = root.createBatch()
        batch.render(<Context.Provider value={100}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <App />
            </React.Suspense>
        </Context.Provider>)
        await batch;

        cache[input] = k;


        // await delay(1000)
        // batch.commit()
        // let batch = root.createBatch()
        // let batch = root.createBatch()
        batch.render(<Context.Provider value={42}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <App />
            </React.Suspense>
        </Context.Provider>)
        await batch;
        batch.commit()

        
    })
}


function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function App(){
    let [ state, setState ] = React.useState(0)
    let ctx = React.useContext(Context)

    console.log('called render', state, ctx)
    let info = useData(state);

    return <div>
        hello world {ctx} {state} {info}

        <button onClick={e => {
            Scheduler.unstable_next(() => {
                setState(x => x + 1)
            });
        }}>increment</button>

        <button onClick={async e => {
            
        }}>do stuff</button>
    </div>
}

let root = ReactDOM.unstable_createRoot(document.getElementById('root'))
root.render(<Context.Provider value={42}>
    <React.Suspense fallback={<div>Loading...</div>}>
        <App />
    </React.Suspense>
</Context.Provider>)


global.root = root;