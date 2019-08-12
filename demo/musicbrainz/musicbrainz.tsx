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
import * as GQL from './musicbrainz.schema'

const AutographRoot = createRoot({
    client: 'https://graphbrainz.herokuapp.com/',
})

function App() {
    let query: GQL.Query = useQuery()

    if (query._loading) return <div>Loading...</div>

    return (
        <div>
            {query.search!.artists({ query: 'metric', first: 10 })!.edges!.map((edge) => {
                let artist = edge.node!
                return (
                    <div>
                        <h3>{artist.name}</h3>
                        {artist.rating!.voteCount > 0 && (
                            <div>
                                {artist.rating!.value} ({artist.rating!.voteCount} votes)
                            </div>
                        )}
                        <ul>
                            {artist.works({ first: 10 })!.nodes!.map((work) => {
                                return <li>{work.title}</li>
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

let dom = (
    <AutographRoot>
        <App />
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))
