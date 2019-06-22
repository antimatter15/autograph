import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './schemas/countries'
import Autograph from './autograph'

    
function App(){
    return <Autograph
        url={GQL.url}
        render={(Query: GQL.Query) => <div>
            {Query.countries.map(k => <fieldset key={k.code}>
                <legend>{k.name} {k.emoji}</legend>
                <table>
                    <tbody>
                        <tr><td>Name</td><td>{k.name} ({k.native})</td></tr>
                        <tr><td>Country Code</td><td>{k.code}</td></tr>
                        <tr><td>Continent</td><td>{k.continent.name}</td></tr>
                        <tr><td>Official Languages</td><td>{
                            k.languages.map(lang => lang.name).join(', ')
                        }</td></tr>
                    </tbody>
                </table>
            </fieldset>)}
        </div>} />
}



ReactDOM.render(<App />, document.getElementById('root'))