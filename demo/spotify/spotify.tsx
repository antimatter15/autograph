import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, Loading } from '../../src/autograph'
import * as GQL from './spotify.schema'

const AutographRoot = createRoot({
    client: 'https://spotify-graphql-server.herokuapp.com/graphql',
})

function App() {
    let [text, setText] = React.useState('Coldplay')

    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />

            <ArtistList text={text} />
        </div>
    )
}

function ArtistList({ text }) {
    let query: GQL.Query = useQuery()

    if (query._error) return <div>{query._error.toString()}</div>
    if (query._loading) return <div>Loading artists....</div>

    let artists = query.queryArtists({ byName: text })! || []

    return (
        <table>
            <tbody>
                {artists.map((artist) => (
                    <Artist artist={artist} key={artist.id} />
                ))}
            </tbody>
        </table>
    )
}

// function App() {
//     let [text, setText] = React.useState('Coldplay')
//     let query: GQL.Query = useQuery();

//     if (query._error) return <div>{query._error.toString()}</div>

//     return <div>
//         <input key="thang" type="text" value={text} onChange={e => setText(e.target.value)} />

//         {Loading(() => {
//             let artists = query.queryArtists({ byName: text }) || [];
//             return <table><tbody>
//                 {artists.map(artist => <Artist artist={artist} key={artist.id} />)}
//             </tbody></table>
//         })}
//     </div>
// }

function Artist({ artist }: { artist: GQL.Artist }) {
    return (
        <tr>
            <td style={{ verticalAlign: 'top' }}>
                {artist.image ? <img src={artist.image} style={{ width: 200 }} /> : 'N/A'}
            </td>
            <td style={{ verticalAlign: 'top' }}>
                <h2>{artist.name}</h2>
            </td>
            <td style={{ verticalAlign: 'top' }}>
                <table>
                    <tbody>
                        {artist.albums({}).map((album) => (
                            <tr key={album.id}>
                                <td>
                                    {album.image ? (
                                        <img src={album.image} style={{ width: 100 }} />
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>{album.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </td>
        </tr>
    )
}

// let dataCache = {}
// let promises = {}

// function App2(){
//     let [text, setText] = React.useState('Coldplay')
//     // if(text !== 'Coldplay'){

//     // }
//     if(!(text in dataCache)){
//         if(!(text in promises)){
//             promises[text] = new Promise(resolve => {
//                 dataCache[text] = 'wumbo'
//                 // setTimeout(resolve, 0)
//                 setImmediate(resolve)
//             })
//         }
//         throw promises[text]
//     }

//     return <div>
//         <button onClick={e => setText('asdf')}>thing</button>
//         <input key="thang" onBlur={e => {
//         // debugger
//     }}type="text" value={text} onChange={e => setText(e.target.value)} />

// </div>
// }

// let dom = <React.Suspense fallback={<div>what is this placeholder</div>}>
//     <App2 />
// </React.Suspense>

// class ErrorBoundary extends React.Component {
//     static getDerivedStateFromError(error) {
//         // Update state so the next render will show the fallback UI.
//         return { hasError: true };
//     }

//     componentDidCatch(err) {
//         console.log(err)
//     }

//     render() {
//         return this.props.children;
//     }
// }

let dom = (
    <AutographRoot>
        <App />
    </AutographRoot>
)

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)
