import React from 'react'
import ReactDOM from 'react-dom'



let dataCache = {}
let promises = {}

function App2(){
    let [text, setText] = React.useState('Coldplay')
    // if(text !== 'Coldplay'){

    // }
    if(!(text in dataCache)){
        if(!(text in promises)){
            promises[text] = new Promise(resolve => {
                dataCache[text] = 'wumbo'
                setTimeout(resolve, 100)
            })
        }
        throw promises[text]
    }
    
    return <div>
        <button onClick={e => setText('asdf')}>thing</button>
        <input key="thang" onBlur={e => {
        // debugger
    }}type="text" value={text} onChange={e => setText(e.target.value)} />

</div>
}

let dom = <React.Suspense fallback={<div>my fallback</div>}>
    <App2 />
</React.Suspense>

// let dom =  <Primer client={fetchData}>
//         <NoSuspense />
//         <NoSuspense2 />
//         <NoSuspense3 />
//         <hr />
//         <React.Suspense fallback={<div>(im loaing with a custom suspense fallback)</div>}>
//             <ErrorBoundary>
//                 <WithSuspense3 />
//             </ErrorBoundary>
//         </React.Suspense>
//     </Primer>

// ReactDOM.render(
//    dom
// , document.getElementById('root'))

ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)


