// this approach unfortunately doesn't make a huge amount of sense because
// it makes it basically impossible to pass props into the autographed node

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as GQL from './schemas/spotify'
import Autograph, { AutographHOC } from './autograph'


function AutographX(url: string, render: (Query: GQL.Query) => JSX.Element): React.ComponentType {
    return function(props){
        return <Autograph url={url} render={render} />
    }
}

const App = AutographX(GQL.url, Query => {
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
})


ReactDOM.render(<App />, document.getElementById('root'))