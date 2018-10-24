import * as React from 'react'
import * as ReactDOM from 'react-dom'

// import * as GQL from './schemas/ethereum'
import { Autograph, AutographProvider } from '../../../src/index'
const Suspense = (React as any).Suspense
const ConcurrentMode = (React as any).unstable_ConcurrentMode

    
function App({ Query } : { Query: any }){
    if(Query.__loading){
        return <div>jasdoifjaiosdjfoijasfd</div>
    }
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


ReactDOM.render(<AutographProvider  url="https://ethql-alpha.infura.io/graphql">
    <Suspense fallback={<div>Loading....</div>}>
        <Autograph suspense>{
            Query => <App Query={Query} />
        }</Autograph>
    </Suspense>
</AutographProvider>, document.getElementById('root'))