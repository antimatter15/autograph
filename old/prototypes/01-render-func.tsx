import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './types'

type QueryType = {
    pokemons({ first }: { first: number }): GQL.Pokemon[]
    pokemon({ id, name }: { id?: string, name?: string }): GQL.Pokemon
}

function Autograph({ render } : { render: (query) => JSX.Element }){
    return render({
        pokemon(params){
            return {
                "number":"025",
                "name":"Pikachu",
                "image":"https://img.pokemondb.net/artwork/pikachu.jpg",
                "types":["Electric"],
                "weaknesses":["Ground"],
                "evolutions":[
                    {"id":"UG9rZW1vbjowMjY=","name":"Raichu","number":"026","image":"https://img.pokemondb.net/artwork/raichu.jpg"}
                ],
                "id":"UG9rZW1vbjowMjU="
            }
        }
    })
}


function App(){
    return <Autograph 
        render={
            (Query: QueryType) => 
                <Demo pokemon={Query.pokemon({ name: 'pikachu' })} />
        } />
}

function Demo({ pokemon }: { pokemon: GQL.Pokemon }){
    return <div>
        <h1>{pokemon.number} - {pokemon.name}</h1>
        <img src={pokemon.image} />
        <div>Types:</div>
        <ul>{pokemon.types.map(k => 
            <li key={k}>{k}</li>)}</ul>
    </div>
}



ReactDOM.render(<App />, document.getElementById('root'))