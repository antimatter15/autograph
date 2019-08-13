import React from 'react'
import ReactDOM from 'react-dom'

import {
    createRoot,
    useQuery,
    Directive,
    withQuery,
    Query,
    AutographBasicClient,
} from '../../src/autograph'
import * as GQL from './todo.schema'

const AutographRoot = createRoot({
    client: 'http://localhost:3000/graphql',
})

function App() {
    let query: GQL.Query = useQuery()

    if (query._loading) return <div>Loading...</div>

    return (
        <div>
            {query.items.map((item, i) => (
                <div key={i}>{item}</div>
            ))}
        </div>
    )
}

let dom = (
    <AutographRoot>
        <App />
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
