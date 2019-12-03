import React, { Suspense, useState, useTransition, useDeferredValue, SuspenseList } from 'react'
import ReactDOM from 'react-dom'

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

let cache = {}
function get(field, data, ms=500){
    if(field in cache){
        if(cache[field] instanceof Promise){
            throw cache[field]
        }else{
            return cache[field]
        }    
    }else{
        cache[field] = delay(ms).then(k => {
            cache[field] = data
        })
        throw cache[field]
    }
}

function App() {
    let [state, setState] = React.useState(0)
    // let page = useDeferredValue(state, { timeoutMs: 200 })
    // let [startTransition, isPending] = useTransition({ timeoutMs: 5000 })
    let startTransition = useGlobalTransition()

    return <div>
        <button onClick={e => {
            startTransition(() => {
                setState(k => k + 1)    
            })

        }}>Next page</button>

        <div>
            Page: {state}

            <DataPage page={state} />

            <Suspense2>{
                () => {
                    return <div>{get(state, 'hello ' + state)}</div>
                }
            }</Suspense2>
        </div>
    </div>
}


function FE({ children }){ return children() }

function Suspense2(props){
    
    return <Suspense {...props}>{
        typeof props.children === 'function' ? 
        <FE>{props.children}</FE> : props.children
    }</Suspense>
}


const GlobalTransitionContext = React.createContext(null)
function useGlobalTransition(){
    return React.useContext(GlobalTransitionContext)
}
function GlobalTransition({ children }){
    let [startTransition, isPending] = useTransition({ timeoutMs: 5000 })
    return <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <GlobalTransitionContext.Provider value={startTransition}>
            {children} 
        </GlobalTransitionContext.Provider>
    </div>
}


function DataPage({ page }){
    return <div>{get(page, 'hello ' + page)}</div>
}



function App2(){
    return <SuspenseList revealOrder="forwards" tail="collapsed">
      <div><Suspense2 fallback={<h2>Loading posts...</h2>}>
        {() => get('blah1', 'meeple doople 1', 1500)}
      </Suspense2></div>
      <div><Suspense2 fallback={<h2>Loading fun facts 2 ...</h2>}>
        {() => get('blah2', 'meeple doople 2', 100)}
      </Suspense2></div>
      <div><Suspense2 fallback={<h2>Loading fun facts 3...</h2>}>
        {() => get('blah3', 'meeple doople 3', 1500)}
      </Suspense2></div>
      <div><Suspense2 fallback={<h2>Loading fun facts 4...</h2>}>
        {() => get('blah4', 'meeple doople 4', 500)}
      </Suspense2></div>
    </SuspenseList>
}


let root = ReactDOM.createRoot(
  document.getElementById('root')
)

console.log(root)

root.render(<Suspense fallback={<div>(Global fallback)</div>}>
    <GlobalTransition><App2 /></GlobalTransition>
</Suspense>);


// root.render(<App2 />);

