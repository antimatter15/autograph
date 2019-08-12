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
import * as GQL from './gitlab.schema'

const AutographRoot = createRoot({
    client: 'https://gitlab.com/api/graphql',
})

function App() {
    let query: GQL.Query = useQuery()

    if (query._loading) return <div>Loading...</div>

    let project = query.project({ fullPath: 'inkscape/inkscape' })!

    return (
        <div
            style={{
                fontFamily: 'Avenir, Helvetica, sans-serif',
                background: 'whiteSmoke',
            }}
        >
            <img src={project.avatarUrl} style={{ width: 100 }} />
            <h1>{project.name}</h1>
            <div>{project.description}</div>

            <ul>
                {project
                    .repository!.tree({})!
                    .blobs({ first: 100 })
                    .edges!.map((k) => (
                        <li>{k.node!.path}</li>
                    ))}
            </ul>
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
