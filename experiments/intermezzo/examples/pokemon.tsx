import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D } from '../autograph'
import * as GQL from './pokemon.schema'

const AutographRoot = createRoot({
    client: 'https://graphql-pokemon.now.sh/graphql'
})


function App() {
    // console.log('render')
    let [text, setText] = React.useState('pikachu')

    let query: GQL.Query = useQuery('Blah');

    if(query._error) return <div>{query._error.toString()}</div>

    // let pokemon = query.pokemon({ name: text });
    // console.log(query._dry, query._loading, pokemon)
    // {((pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>))}
    return <div>
        <input key="thang" type="text" value={text} onChange={e => setText(e.target.value)} />
        <div>
            {loading(() => {
                let pokemon = query.pokemon({ name: text });
                // if(pokemon === null) debugger;
                return ((pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>))
            }, <div>Loading...</div>)}
        </div>
    </div>
}

function loading(render, fallback){
    try {
        return render()
    } catch (err){
        if(err instanceof Promise){
            return fallback;
        }else{
            throw err;
        }
    }
}

function Pokedex({ pokemon }: { pokemon: GQL.Pokemon }) {
    // console.log('pokedex', pokemon)
    let [expand, setExpand] = React.useState(false)


    return <div>
        <h1>{pokemon.number} - {pokemon.name}</h1>
        <img src={D('@skip(if: false)', pokemon.image)} />
        <div>Types:</div>
        <ul>{pokemon.types.map(k =>
            <li key={k}>{k}</li>)}</ul>

        <a onClick={e => setExpand(x => !x)}>{expand ? '▲ Collapse' : '▶ Expand'}</a>
        {expand && loading(() => <ul>{pokemon.attacks.fast.map((k, i) =>
            <li key={i}>Fast: {k.name} ({k.type})</li>)}
            {pokemon.attacks.special.map((k, i) =>
        <li key={i}>Special: {k.name} ({k.type})</li>)}</ul>, <div>Loading...</div>)}
    </div>
}

let dom = <AutographRoot>
    <App />
</AutographRoot>

// ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)