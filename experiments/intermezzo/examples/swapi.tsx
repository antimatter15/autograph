import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D, withQuery, Query } from '../autograph'
import * as GQL from './swapi.schema'

const AutographRoot = createRoot({
    client: 'https://swapi-graphql-dvnngqcxrs.now.sh/'
})

let dom = <AutographRoot>
    <Query>{(query: GQL.Root) => {
        if(query._loading) return <div>Loading...</div>;

        return <div>{query.allFilms({}).films.map(film => 
            <div>
                <h2>{film.title}</h2>
                <table>
                    <tbody>
                        <tr><td>Director:</td><td>{film.director}</td></tr>
                        <tr><td>Release Date:</td><td>{film.releaseDate}</td></tr>
                        <tr><td>Producers:</td><td>{film.producers.join(', ')}</td></tr>
                    </tbody>
                </table>
            </div>)}</div>
    }}</Query>
</AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)