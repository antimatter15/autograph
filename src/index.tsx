import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './types'
import Autograph from './autograph'


function App(){
    return <Autograph
        url="https://graphql-pokemon.now.sh/graphql"
        render={(Query: GQL.Query) => <Demo Query={Query} />} />
}

function Demo({ Query }: { Query: GQL.Query }){
    if(location.pathname === '/'){
        return <div>
            {Query.pokemons({ first: 20 }).map(k => 
                <div key={k.id}>
                    <PokemonSummary pokemon={k} />
                </div>)}
        </div>    
    }else{
        let pokemon = Query.pokemon({ id: location.pathname.slice(1) });

        return <div>
            <div>
                <a href="/">&larr; Back</a>
            </div>

            <PokemonSummary pokemon={pokemon} />
            
            <div>
                <fieldset>
                <legend>Evolutions:</legend>
                {pokemon.evolutions.map(k => <div key={k.id}>
                    <PokemonSummary pokemon={k} />
                </div>)}
                </fieldset>
            </div>
        </div>    
    }
}


function PokemonSummary({ pokemon } : { pokemon: GQL.Pokemon }){
    return <fieldset>
        <legend><a href={'/' + pokemon.id}>{pokemon.number} - {pokemon.name}</a></legend>
        <img src={pokemon.image} style={{ width: 100 }} />
        <div>{pokemon.types.map(k => <li key={k}>{k}</li>)}</div>
    </fieldset>
}

// function App(){
//     return <Autograph 
//         url="https://graphql-pokemon.now.sh/graphql"
//         render={(Query: GQL.Query) => 
//             <Demo pokemon={Query.pokemon({ name: 'pikachu' })} />
//         } />
// }

// function Demo({ pokemon }: { pokemon: GQL.Pokemon }){
//     return <div>
//         <h1>{pokemon.number} - {pokemon.name}</h1>
//         <img src={pokemon.image} />
//         <div>Types:</div>
//         <ul>{pokemon.types.map(k => 
//             <li key={k}>{k}</li>)}</ul>

//         <ul>{pokemon.evolutions.map(k => 
//             <li key={k.id}>{k.name}</li>)}</ul>
//     </div>
// }



ReactDOM.render(<App />, document.getElementById('root'))