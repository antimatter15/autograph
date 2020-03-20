import * as React from 'react'
import * as ReactDOM from 'react-dom'

export const App = () => {
    return (
        <React.Suspense fallback="loading">
            <SuspenseTest />
        </React.Suspense>
    )
}

function delay(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

let promise: any
promise = delay(1000).then(() => {
    console.log(fetchStack)
    promise = null
    console.log('resolved')
})

let fetchStack = []
function fetchData(name: string): string {
    console.log('fetching', name)
    fetchStack.push(name)
    return name
}

function ThrowSuspense() {
    if (promise) throw promise
    return <div>[LOADED]</div>
}

function GrandchildComponent() {
    return <div>{fetchData('grandchild-dependency')}</div>
}

function ChildComponent() {
    // console.log('child component')

    return (
        <div>
            {fetchData('child-dependency')}
            <GrandchildComponent />
        </div>
    )
}
function SuspenseTest(props) {
    let data = (ChildComponent as any)(props)

    return (
        <React.Fragment>
            <ThrowSuspense />
            {data}
        </React.Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// console.log(
//     ReactDOMServer.renderToStaticMarkup(
//         <React.Suspense fallback={<div>fallback loading</div>}>
//             <SuspenseTest />
//         </React.Suspense>
//     )
// )
