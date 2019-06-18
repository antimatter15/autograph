import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, D, withQuery, Query } from '../autograph'
import * as GQL from './api-platform.schema'

const AutographRoot = createRoot({
    client: 'https://demo.api-platform.com/graphql'
})


function App(){
    let query: GQL.Query = useQuery();

    if(query._loading) return <div>Loading...</div>;
    let books = query.books({author: "Fermin Larkin"});

    return <div>    
        {books.totalCount}

        {books.edges.map(result => <div>
            {result.node.title}
        </div>)}
    </div>
}

let dom = <AutographRoot>
        <App />
</AutographRoot>
ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)