import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot, Loading, useQuery, Directive } from '../../src/autograph'
import * as GQL from './pokemon.schema'

const AutographRoot = createRoot({
    client: 'https://graphql-pokemon.now.sh/graphql'
})

function App() {
    let [text, setText] = React.useState('pikachu')
    let query: GQL.Query = useQuery('Blah');

    if(query._error) return <div>{query._error.toString()}</div>
    return <div>
        <input key="thang" type="text" value={text} onChange={e => setText(e.target.value)} />
        <div>
            {Loading(() => {
                let pokemon = query.pokemon({ name: text });
                // if(pokemon === null) debugger;
                return ((pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>))
            })}
        </div>
    </div>
}


function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    // console.log('pokedex', pokemon)
    let [expand, setExpand] = React.useState(false)


    return <div>
        <h1>{pokemon.number} - {pokemon.name}</h1>
        <img src={Directive('@skip(if: false)', pokemon.image)} />
        <div>Types:</div>
        <ul>{pokemon.types.map(k =>
            <li key={k}>{k}</li>)}</ul>

        <a onClick={e => setExpand(x => !x)}>{expand ? '▲ Collapse' : '▶ Expand'}</a>
        {expand && Loading(() => <ul>{pokemon.attacks.fast.map((k, i) =>
            <li key={i}>Fast: {k.name} ({k.type})</li>)}
            {pokemon.attacks.special.map((k, i) =>
        <li key={i}>Special: {k.name} ({k.type})</li>)}</ul>, <div>Loading attacks...</div>)}
    </div>
}


ReactDOM.render(<AutographRoot>
    <App />
</AutographRoot>, document.getElementById('root'))