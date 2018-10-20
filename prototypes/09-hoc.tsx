import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './schemas/spotify'
import Autograph, { AutographHOC } from './autograph'

    
function App({ Query } : { Query: GQL.Query }){
    let name = 'The Killers';

    return <div>
        {Query.hi({ message: 'whats up'})}
        <h1>Results for {name}</h1>
        
        <table><tbody>{Query.queryArtists({ byName: name}).map(artist => <tr key={artist.id}>
            <td><img src={artist.image} style={{ width: 200 }} /></td>
            <td><h2>{artist.name}</h2></td>
            <td>
                <ul>{artist.albums({ limit: 5 }).map(album => <li key={album.id}>
                    {album.name}
                </li>)}</ul>
            </td>

        </tr>)}</tbody></table>
    </div>
}


const AutographApp = AutographHOC(GQL.url)(App)

ReactDOM.render(<AutographApp />, document.getElementById('root'))