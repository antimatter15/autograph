import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, Directive, withQuery, Query, AutographBasicClient } from '../../src/autograph'
import * as GQL from './countries.schema'

const AutographRoot = createRoot({
    client: 'https://countries.trevorblades.com/'
})

function App(){
    let query: GQL.Query = useQuery();

    if(query._loading) return <div>Loading...</div>;

    return <div>{
        query.countries!.map(k => <fieldset key={k.code}>
            <legend>{k.name} {k.emoji}</legend>
            <table>
                <tbody>
                    <tr><td>Name</td><td>{k.name} ({k.native})</td></tr>
                    <tr><td>Country Code</td><td>{k.code}</td></tr>
                    <tr><td>Continent</td><td>{k.continent!.name}</td></tr>
                    <tr><td>Official Languages</td><td>{
                        k.languages!.map(lang => lang.name).join(', ')
                    }</td></tr>
                </tbody>
            </table>
        </fieldset>)
    }</div>
}


let dom = <AutographRoot>
    <App />
</AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)