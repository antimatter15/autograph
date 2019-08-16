import React from 'react'
import ReactDOM from 'react-dom'

import {
    createRoot,
    useQuery,
    Directive,
    withQuery,
    Query,
    AutographBasicClient,
    Loading,
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
            {repositories.nodes.map(repo => <RepoCard repo={repo} key={repo.id} />)}
        </div>
    )
}


function RepoCard({ repo }: { repo: GQL.Repository }){
    let [ expanded, setExpanded ] = React.useState(false)
    let query: GQL.Query = useQuery()

    return <div>
        {repo.name}
        <button onClick={e => setExpanded(k => !k)}>Toggle</button>
        {expanded && <Loading>{() => <div>
            {query.repository({
                owner: query.viewer.login,
                name: repo.name
            }).description}
        </div>}</Loading>}
    </div>
}

let dom = (
    <AutographRoot>
        <App />
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
