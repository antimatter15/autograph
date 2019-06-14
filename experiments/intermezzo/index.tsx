import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D } from './autograph'
import * as GQL from './schema'

const AutographRoot = createRoot({
    client: 'https://graphql-pokemon.now.sh/graphql'
})


let done = false;
let x = new Promise(resolve => setTimeout(resolve, 1000)).then(x => done = true)


function App(){
    let [text, setText] = React.useState('pikachu')

    let query: GQL.Query = useQuery();
    // if(query._loading) return <div>Loading...</div>;

    let pokemon = query.pokemon({ name: text });
    // if(!done) throw x;
    // console.log(query._dry, query._loading, pokemon)
    // if(!pokemon) return <div>No data!</div>
    // return 'hello'
    // console.log('render')
    return <div>
        <input key="thang" type="text" value={text} onChange={e => setText(e.target.value)} />
        <div>
            { query._loading ? <div>Loading...</div> : ((pokemon ? <Pokedex pokemon={pokemon} /> : <div>No matching pokemon</div>)) }
        </div>
    </div>
}

function Pokedex({ pokemon }){
    // console.log('pokedex', pokemon)
    return <div>
        <h1>{pokemon.number} - {pokemon.name}</h1>
        <img src={D('@skip(if: false)', pokemon.image)} />
        <div>Types:</div>
        <ul>{pokemon.types.map(k => 
            <li key={k}>{k}</li>)}</ul>
    </div>
}

let dom =  <AutographRoot>
    <App />
</AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)