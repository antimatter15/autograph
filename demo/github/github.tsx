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
import * as GQL from './github.schema'

const AutographRoot = createRoot({
    client: new AutographBasicClient({
        url: 'https://api.github.com/graphql',
        headers: {
            authorization: `Bearer ${localStorage.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
    }),
})

function App() {
    let query: GQL.Query = useQuery()

    if (query._loading) return <div>Loading...</div>

    let repositories = query.viewer.repositories({ first: 5, after: null })
    return (
        <div>
            {repositories.nodes.map(repo => <div>{repo.name}</div>)}
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
