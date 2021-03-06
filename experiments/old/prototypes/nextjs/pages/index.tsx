import Link from 'next/link'
import * as GQL from '../types'

export default ({ Query }: { Query: GQL.Query }) => {
    console.log(Query)
    return <div>{Query.pokemons({ first: 20 }).map(k => 
            <div key={k.id}>
                <PokemonSummary pokemon={k} />
            </div>)}</div>
}



function PokemonSummary({ pokemon } : { pokemon: GQL.Pokemon }){
    return <fieldset>
        <legend>
            <Link  href={{ pathname: '/info', query: { id: pokemon.id } }}>
                <a>{pokemon.number} - {pokemon.name}</a>
            </Link>
        </legend>
        <img src={pokemon.image} style={{ width: 100 }} />
        <div>{pokemon.types.map(k => <li key={k}>{k}</li>)}</div>
    </fieldset>
}
