import React from 'react'
import ReactDOM from 'react-dom'

import {
    createRoot,
    useQuery,
    Directive,
    withQuery,
    Query,
    AutographBasicClient,
    LoadingBoundary,
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
    if (!localStorage.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN) {
        return (
            <div>
                Please configure <pre>localStorage.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN</pre> and
                then refresh the page.
            </div>
        )
    }
    let query: GQL.Query = useQuery()
    if (query._loading) return <div>Loading...</div>

    let repositories = query.viewer.repositories({ first: 5, after: null })
    return (
        <div>
            {repositories.nodes.map((repo, i) => (
                <RepoCard repo={repo} key={repo.id} defaultShow={i < 2} />
            ))}
        </div>
    )
}

function RepoCard({ repo, defaultShow }: { defaultShow: boolean; repo: GQL.Repository }) {
    let [expanded, setExpanded] = React.useState(defaultShow)
    let query: GQL.Query = useQuery()

    return (
        <div>
            {repo.name}
            <button onClick={(e) => setExpanded((k) => !k)}>Toggle</button>
            {expanded && (
                <LoadingBoundary>
                    {() => (
                        <div>
                            {
                                query.repository({
                                    owner: query.viewer.login,
                                    name: repo.name,
                                }).description
                            }
                        </div>
                    )}
                </LoadingBoundary>
            )}
        </div>
    )
}

let Blah = React.createContext(null)

let dom = (
    <AutographRoot>
        <Blah.Provider value={234}>
            <App />
        </Blah.Provider>
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
