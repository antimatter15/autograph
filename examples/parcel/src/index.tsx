import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as GQL from './schemas/ethereum'
import { Autograph } from '../../../src/index'


    


class App extends React.Component<{Query: GQL.Query}> {
    render(){
        let Query = this.props.Query;
        let block = Query.block({ number: 5450945 })
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


ReactDOM.render(<Autograph config={GQL.url}>{
    Query => <App Query={Query} />
}</Autograph>, document.getElementById('root'))