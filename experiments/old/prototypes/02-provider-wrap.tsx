// The problem with this implementation is ultimately this:

function App(){
    let pokemon = GQL.Query.pokemon({ name: 'pikachu' })

    return <Autograph>
        <Demo pokemon={pokemon} />
    </Autograph>
}

// Since the access to GQL.Query.pokemon here is being called
// outside of Autograph, we can't actually intercept it and send 
// in a different value, so this whole premise doesn't work.

// We need something like a render prop that we can freely
// mess around with. 




import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './types'

type QueryType = {
    pokemons({ first }: { first: number }): GQL.Pokemon[]
    pokemon({ id, name }: { id?: string, name?: string }): GQL.Pokemon
}

function Autograph({ children }){
    // return render({
    //     pokemon(params){
    //         return {
    //             "number":"025",
    //             "name":"Pikachu",
    //             "image":"https://img.pokemondb.net/artwork/pikachu.jpg",
    //             "types":["Electric"],
    //             "weaknesses":["Ground"],
    //             "evolutions":[
    //                 {"id":"UG9rZW1vbjowMjY=","name":"Raichu","number":"026","image":"https://img.pokemondb.net/artwork/raichu.jpg"}
    //             ],
    //             "id":"UG9rZW1vbjowMjU="
    //         }
    //     }
    // })
}


function App(){
    return <Autograph>
        <Demo pokemon={Query.pokemon({ name: 'pikachu' })} />
    </Autograph>
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