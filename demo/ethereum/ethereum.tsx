import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D, withQuery, Query } from '../../src/autograph'
import * as GQL from './ethereum.schema'

const AutographRoot = createRoot({
    client: 'https://ethql-alpha.infura.io/graphql',
})

function App({ query }: { query: GQL.Query }) {
    if (query._loading) return <div>Loading...</div>

    let block = query.block({ number: 5450945 })
    return (
        <fieldset>
            <legend>Block {block.hash}</legend>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <b>Miner</b>
                        </td>
                        <td>{block.miner.address}</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Number</b>
                        </td>
                        <td>{block.number}</td>
                    </tr>
                </tbody>
            </table>
            {block.transactions({ filter: { withInput: false } }).map((tx) => (
                <fieldset key={tx.hash}>
                    <legend>
                        {tx.index}: {tx.hash}
                    </legend>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <b>From</b>
                                </td>
                                <td>{tx.from.address}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>To</b>
                                </td>
                                <td>{tx.to.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            ))}
        </fieldset>
    )
}

const AppW = withQuery()(App)
let dom = (
    <AutographRoot>
        <AppW />
    </AutographRoot>
)

// let dom = <AutographRoot>
//     <Query>{query => {
//         // console.log(query)
//         if(query._loading) return <div>Loading...</div>;

//         let block = query.block({ number: 5450945 })

//         console.log(query._loading, query._dry, block.hash)
//         return block.hash
//     }}</Query>
// </AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
