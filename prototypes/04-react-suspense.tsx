import React from 'react'
import ReactDOM from 'react-dom'

import * as GQL from './types'
import Autograph, { AutographSuspense } from './autograph'

const AsyncMode = (React as any).unstable_AsyncMode;
const Placeholder = (React as any).Placeholder;


function App(){
    return <Placeholder delayMs={100} fallback={<div>Loading....</div>}>
        <div>
            <h1>welcome to the async react future </h1>
            <AutographSuspense 
                url="https://graphql-pokemon.now.sh/graphql"
                render={(Query: GQL.Query) => <div>
                    {Query.pokemon({ name: 'pikachu'}).name}
                </div>}
            />
        </div>
    </Placeholder>
    
}    


ReactDOM.render(<AsyncMode><App /></AsyncMode>, document.getElementById('root'))