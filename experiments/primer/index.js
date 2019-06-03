import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { Primer, usePrimer, InlineFallback } from './primer'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


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

let loadingCount = 0;

function fetchData(fields){
    return new Promise((resolve, reject) => {
        if(loadingCount === 0){
            NProgress.start()    
        }
        
        loadingCount++

        setTimeout(function(){
            if(--loadingCount == 0){
                NProgress.done()    
            }

            if(Math.random() < 0.1) return reject(new Error('welp we randomly failed'))
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



function LoadingDemo(){
    let get = usePrimer(fetchData)
    // let get = React.useContext(PrimerContext)
    let [ x, setX ] = useState(42)
    let isLoading = get('_loading');

    // note that hooks don't get loaded with the same value when running in the inline fallback mode

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{isLoading ? '(loading)' : (get(x) || x)}</button>
        <p>{get('time')}</p>
    </div>
    // return <Derp x={x} setX={setX} get={get} />
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




function NoSuspense(){
    let get = usePrimer('1')
    let [ x, setX ] = useState(42)

    if(get('_error')) return <div>HELP HELP WE HAVE ERROR HELP</div>;
    if(get('_loading')) return <div>Loaidng (no suspense)</div>;

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
}


function NoSuspense2(){
    let get = usePrimer('2')
    let [ x, setX ] = useState(42)

    if(get('_error')) return <div>HELP HELP WE HAVE ERROR HELP</div>;
    if(get('_loading')) return <div>Loaidng (no suspense)</div>;

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
}


function NoSuspense3(){
    let get1 = usePrimer('B')
    let get2 = usePrimer('A')
    let [ x, setX ] = useState(42)

    if(get1('_error')) return <div>[GET 1] HELP HELP WE HAVE ERROR HELP</div>;
    if(get1('_loading')) return <div>[GET 1] Loaidng (no suspense)</div>;

    if(get2('_error')) return <div>[GET 2] HELP HELP WE HAVE ERROR HELP</div>;
    if(get2('_loading')) return <div>[GET 2] Loaidng (no suspense)</div>;

    return <div>
        <div>
            GET1: {get1('message1')}<button onClick={e => setX(x + 1)}>{get1(x) || x}</button>
            <p>{get1('time')}</p>
        </div>
        <div>
            GET2: {get2('message2')}<button onClick={e => setX(x + 1)}>{get2(x) || x}</button>
            <p>{get2('time')}</p>
        </div>
    </div>
}

// function GlobalProgress(props){
//     return <React.Suspense fallback={<div>wat</div>} maxDuration={500}>{props.children}</React.Suspense>
// }
// function useIsLoading(){
//     return React.useContext(LoadingContext)
// }

// ReactDOM.unstable_createRoot(document.getElementById('root'))
// .render(<Meep>
//     <App />
// </Meep>)


// ReactDOM.unstable_createRoot(document.getElementById('root'))
// .render(<div>
//     <Primer client={fetchData}>
//         <InlineFallback>
//             <LoadingDemo />
//         </InlineFallback>
//         <Part1 />
//         <App />
//     </Primer>
// </div>)







ReactDOM.render(
    <Primer client={fetchData}>
        <NoSuspense />
        <NoSuspense2 />
        <NoSuspense3 />
    </Primer>
, document.getElementById('root'))

