import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as GQL from './schemas/pokemon'
import { Autograph } from '../../../src/index'


    
function App(){
    return <Autograph config="https://graphql-pokemon.now.sh/graphql">{
        (query: GQL.GQLQuery) => <div>
            {query.pokemons({ first: 10 })
                .map(pokemon => <Merp pokemon={pokemon} />)}
        </div>
    }</Autograph>
}

function Merp({ pokemon }){
    return <div>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} />
    </div>
}


ReactDOM.render(<App />, document.getElementById('root'))