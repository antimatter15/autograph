import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './schemas/spotify'
import Autograph from './autograph'

    
function App(){
    let name = 'The Killers';

    return <Autograph
        url={GQL.url}
        render={(Query: GQL.Query) => <div>
            {Query.hi({ message: 'whats up'})}
            <h1>Results for {name}</h1>
            
            <table><tbody>{Query.queryArtists({ byName: name}).map(artist => <tr>
                <td><img src={artist.image} style={{ width: 200 }} /></td>
                <td><h2>{artist.name}</h2></td>
                <td>
                    <ul>{artist.albums({ limit: 5 }).map(album => <li>
                        {album.name}
                    </li>)}</ul>
                </td>

            </tr>)}</tbody></table>
        </div>} />
}


ReactDOM.render(<App />, document.getElementById('root'))