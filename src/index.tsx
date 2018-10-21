import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './schemas/ethereum'
import Autograph, { AutographHOC } from './autograph'


    
function App({ Query } : { Query: GQL.Query }){
    let block = Query.block({ number: 5450945 })
    return <fieldset>
        <legend>Block {block.hash}</legend>
        <table><tbody>
            <tr><td><b>Miner</b></td><td>{block.miner.address}</td></tr>
            <tr><td><b>Number</b></td><td>{block.number}</td></tr>
            
        </tbody></table>
        {block.transactions({ filter: { withInput: false }}).map(tx => <fieldset key={tx.hash}>
            <legend>{tx.index}: {tx.hash}</legend>
            <table><tbody>
                <tr><td><b>From</b></td><td>{tx.from.address}</td></tr>
                <tr><td><b>To</b></td><td>{tx.to.address}</td></tr>

            </tbody></table>
        </fieldset>)}
    </fieldset>
}


// const AutographApp = AutographHOC('https://api.graphcms.com/simple/v1/swapi')(App)
// ReactDOM.render(<AutographApp />, document.getElementById('root'))

ReactDOM.render(<Autograph url={GQL.url} render={Query => 
    <App Query={Query as GQL.Query} />} />, document.getElementById('root'))