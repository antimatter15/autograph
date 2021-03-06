import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { Autograph, useAutograph, InlineFallback } from './lib/autograph'

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

function fetchData(fields){
    console.log('fetching fields', fields)
    return new Promise((resolve) => {
        NProgress.start()

        setTimeout(function(){
            let result = {}
            for(let field of fields){
                if(typeof Database[field] === 'function'){
                    result[field] = Database[field]()
                }else{
                    result[field] = Database[field]    
                }
            }

            NProgress.done()
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
    let get = useAutograph(fetchData)
    // let get = React.useContext(PrimerContext)
    let [ x, setX ] = useState(42)

    return <div>
        {get('message1')}<button onClick={e => setX(x + 1)}>{get(x) || x}</button>
        <p>{get('time')}</p>
    </div>
    // return <Derp x={x} setX={setX} get={get} />
}


function Part2(){
    let get = useAutograph(fetchData)
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
    let get = useAutograph(fetchData)
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


ReactDOM.unstable_createRoot(document.getElementById('root'))
.render(<div>
    <Autograph client={fetchData}>
        <InlineFallback>
            <LoadingDemo />
        </InlineFallback>
        <Part1 />
        <App />
    </Autograph>
</div>)







// ReactDOM.render(
//     <App />
// , document.getElementById('root'))

