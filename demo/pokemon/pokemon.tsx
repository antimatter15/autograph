import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot, LoadingBoundary, useQuery, Directive, Eager } from '../../src/autograph'
import * as GQL from './pokemon.schema'

const AutographRoot = createRoot({
    client: 'https://graphql-pokemon.now.sh/graphql',
})

function AppLoadingGuard() {
    let [text, setText] = React.useState('pikachu')
    let query: GQL.Query = useQuery('Blah')

    if (query._error) return <div>{query._error.toString()}</div>
    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <div>
                <LoadingBoundary>
                    {() => {
                        let pokemon = query.pokemon({ name: text })
                        return pokemon ? (
                            <Pokedex pokemon={pokemon} />
                        ) : (
                            <div>No matching pokemon</div>
                        )
                    }}
                </LoadingBoundary>
            </div>
        </div>
    )
}

function AppEarlyReturn() {
    let [text, setText] = React.useState('pikachu')
    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <PokemonSearcherEarlyReturn text={text} />
        </div>
    )
}

function PokemonSearcherEarlyReturn({ text }) {
    let query: GQL.Query = useQuery('Blah')
    if (query._error) return <div>{query._error.toString()}</div>
    if (query._loading) return <div>searching the pokedex....</div>
    let pokemon = query.pokemon({ name: text })
    if (!pokemon) return <div>No matching pokemon</div>
    return <Pokedex pokemon={pokemon} />
}

function AppSuspense() {
    let [text, setText] = React.useState('pikachu')
    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <React.Suspense fallback={<div>Querying pokedex</div>}>
                <PokemonSearcherSuspense text={text} />
            </React.Suspense>
        </div>
    )
}

function PokemonSearcherSuspense({ text }) {
    let query: GQL.Query = useQuery('Blah')
    if (query._error) return <div>{query._error.toString()}</div>
    let pokemon = query.pokemon({ name: text })
    if (!pokemon) return <div>No matching pokemon</div>
    return <Pokedex pokemon={pokemon} />
}

function AppNoLoader() {
    let [text, setText] = React.useState('pikachu')
    let query: GQL.Query = useQuery('Blah')

    if (query._error) return <div>{query._error.toString()}</div>
    let pokemon = query.pokemon({ name: text })

    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <div>{pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>}</div>
        </div>
    )
}

function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    // console.log('pokedex', pokemon)
    let [expand, setExpand] = React.useState(false)

    return (
        <div>
            <h1>
                {pokemon.number} - {pokemon.name}
            </h1>
            <img src={Directive('@skip(if: false)', pokemon.image)} />
            <div>Types:</div>
            <ul>
                {pokemon.types.map((k) => (
                    <li key={k}>{k}</li>
                ))}
            </ul>

            <a onClick={(e) => setExpand((x) => !x)}>{expand ? '▲ Collapse' : '▶ Expand'}</a>
            {Eager(expand) && (
                <LoadingBoundary fallback={<div>Loading attacks...</div>}>
                    {() => (
                        <ul>
                            {pokemon.attacks.fast.map((k, i) => (
                                <li key={i}>
                                    Fast: {k.name} ({k.type})
                                </li>
                            ))}
                            {pokemon.attacks.special.map((k, i) => (
                                <li key={i}>
                                    Special: {k.name} ({k.type})
                                </li>
                            ))}
                        </ul>
                    )}
                </LoadingBoundary>
            )}
        </div>
    )
}

const App = AppEarlyReturn

ReactDOM.render(
    <AutographRoot>
        <App />
    </AutographRoot>,
    document.getElementById('root')
)
