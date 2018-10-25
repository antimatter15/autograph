import React from 'react'

import Link from 'next/link'
import Router from 'next/router'
import * as GQL from '../types'


export default ({ Query, ctx }: { Query: GQL.Query, ctx }) => {
    let pokemon = Query.pokemon({ id: ctx.query.id })

    return <div>
        <div>
            <Link href="/"><a>&larr; Back</a></Link>
        </div>
        <h1>{pokemon.name}</h1>
        <i>{ctx.query.id}</i>

        <div>
            <img src={pokemon.image} />
        </div>

        <div>{pokemon.types.map(k => <li key={k}>{k}</li>)}</div>

         <div>
            <fieldset>
            <legend>Evolutions:</legend>
            {(pokemon.evolutions || []).map(k => <div key={k.id}>
                <PokemonSummary pokemon={k} />
            </div>)}
            </fieldset>
        </div>



    </div>
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
