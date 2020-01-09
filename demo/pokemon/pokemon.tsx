import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot, LoadingBoundary, useQuery, Directive, Eager } from '../../src/autograph'
import * as GQL from './pokemon.schema'

const AutographRoot = createRoot({
    client: 'https://graphql-pokemon.now.sh/graphql',
    schema: GQL.schema,
})

function AppSuspense() {
    let [text, setText] = React.useState('pikachu')
    const deferredValue = React.useDeferredValue(text, {
        timeoutMs: 5000,
    })
    let query: GQL.Query = useQuery('Pokemon Query')
    let pokemon = query.pokemon({ name: deferredValue })

    return (
        <div>
            <input key="thang" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <React.Suspense fallback={<div>Querying pokedex</div>}>
                {pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>}
            </React.Suspense>
        </div>
    )
}

function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    // console.log('pokedex', pokemon)
    let [expand, setExpand] = React.useState(false)
    const [startTransition, isPending] = React.useTransition({ timeoutMs: 1000 })

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

const App = AppSuspense

ReactDOM.createRoot(document.getElementById('root')).render(
    <AutographRoot>
        <App />
    </AutographRoot>
)
