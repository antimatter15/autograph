import * as React from 'react'
import * as ReactDOM from 'react-dom'

export const App = () => {
    return (
        <React.Suspense fallback="loading">
            <ChildComponent />
        </React.Suspense>
    )
}

function delay(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// let cache = {}
// let misses = {}

// function fetchData(key: string): any {
//     if (key in cache) {
//         return cache[key]
//     } else {
//         misses[key] = 1
//         return '<loading>'
//     }
// }

// function gqless(component) {
//     let cache = {}
//     let misses = {}
//     function fetchData(key) {
//         if (key in cache) {
//             return cache[key]
//         } else {
//             misses[key] = 1
//             return '<loading>'
//         }
//     }
//     let promise
//     function Suspender() {
//         if (promise) throw promise
//         console.log('done')
//         return null
//     }
//     return (props) => {
//         misses = {}
//         const [x, setX] = React.useState({})
//         const data = component(fetchData)
//         const missed_keys = Object.keys(misses)
//         if (missed_keys.length === 0) {
//             return data
//         } else {
//             console.log('fetching', missed_keys)
//             promise = delay(1000).then(() => {
//                 missed_keys.forEach((k) => (cache[k] = 'loaded' + k))
//                 promise = null
//                 setX({})
//             })
//             return (
//                 <React.Fragment>
//                     {data}
//                     <Suspender />
//                 </React.Fragment>
//             )
//         }
//     }
// }

let cache = {}
let misses = {}

// let resolvePromise;
// let resolveTimeout;
// let promise = new Promise(resolve => resolvePromise = resolve)

let promise
let resolvePromise
let batchTimeout
function batchedFetch() {
    if (!promise) promise = new Promise((resolve) => (resolvePromise = resolve))
    clearTimeout(batchTimeout)
    batchTimeout = setTimeout(fetchCore, 100)
}

function fetchCore() {
    let missed_keys = Object.keys(misses)
    console.log(missed_keys)
    delay(500).then(() => {
        missed_keys.forEach((k) => (cache[k] = 'loaded' + k))
        resolvePromise()
        promise = null
    })
}

function fetchData(key) {
    if (key in cache) {
        console.log('cache hit', key)
        return cache[key]
    } else {
        console.log('cache miss', key)
        misses[key] = 1
        batchedFetch()
        return '<loading>'
    }
}

function Suspender() {
    if (promise) throw promise
    return null
}

function gqless(component) {
    return () => {
        let [version, setVersion] = React.useState({})
        let data = component()

        if (promise) {
            promise.then(() => setVersion({}))

            return (
                <React.Fragment>
                    {data}
                    <Suspender />
                </React.Fragment>
            )
        } else {
            return data
        }
    }
    // return component
}

const ChildComponent = gqless(() => {
    return (
        <div>
            child {fetchData('child data')}
            <GrandchildComponent />
        </div>
    )
})

const GrandchildComponent = gqless(() => {
    return <div>grandchild {fetchData('grandchild data')}</div>
})

// let promise: any
// promise = delay(1000).then(() => {
//     console.log(fetchStack)
//     promise = null
//     console.log('resolved')
// })

// let fetchStack = []
// function fetchData(name: string): string {
//     console.log('fetching', name)
//     fetchStack.push(name)
//     return name
// }

// function ThrowSuspense() {
//     if (promise) throw promise
//     return <div>[LOADED]</div>
// }

// function GrandchildComponent() {
//     return <div>{fetchData('grandchild-dependency')}</div>
// }

// function ChildComponent() {
//     // console.log('child component')

//     return (
//         <div>
//             {fetchData('child-dependency')}
//             <GrandchildComponent />
//         </div>
//     )
// }
// function SuspenseTest(props) {
//     let data = (ChildComponent as any)(props)

//     return (
//         <React.Fragment>
//             <ThrowSuspense />
//             {data}
//         </React.Fragment>
//     )
// }

ReactDOM.render(<App />, document.getElementById('root'))

// console.log(
//     ReactDOMServer.renderToStaticMarkup(
//         <React.Suspense fallback={<div>fallback loading</div>}>
//             <SuspenseTest />
//         </React.Suspense>
//     )
// )
