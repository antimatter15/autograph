import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as GQL from './schemas/ethereum'
// import { Autograph } from '../../../src/index'

import { unsafeUseQuery } from 'autograph/src/experimental'
const Suspense = (React as any).Suspense;


    
class App extends React.Component<{ blockNo: number }> {
    render(){
        // let Query = this.props.Query;
        let query: GQL.Query = unsafeUseQuery(GQL.url)

        let block = query.block({ number: this.props.blockNo })

        // console.log(block)
        return <fieldset>
            <legend>Block {block.hash}</legend>
            <table><tbody>
                <tr><td><b>Miner</b></td><td>{block.miner.address}</td></tr>
                <tr><td><b>Number</b></td><td>{block.number}</td></tr>
                
            </tbody></table>
            <TXViewer block={block} />
        </fieldset>
    }
}


class TXViewer extends React.Component<{block: GQL.Block}, {input: boolean}> {
    state = {
        input: false
    }
    render(){
        let { block } = this.props;
        console.log(block)
        return <div>
            <label>
                <input type="checkbox" checked={this.state.input} onChange={e => this.setState({ input: e.target.checked })} />
                include transactions with input
            </label>

        {block.transactions({ filter: { withInput: this.state.input }}).map(tx => <fieldset key={tx.hash}>
            <legend>{tx.index}: {tx.hash}</legend>
            <table><tbody>
                <tr><td><b>From</b></td><td>{tx.from.address}</td></tr>
                <tr><td><b>To</b></td><td>{tx.to.address}</td></tr>

            </tbody></table>
        </fieldset>)}</div>
    }
}


ReactDOM.render(<Suspense fallback={<div>Loading...</div>}>
        <App blockNo={5450945} />
    </Suspense>, document.getElementById('root'))