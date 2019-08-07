import React from 'react'
import ReactDOM from 'react-dom'

import { createRoot, useQuery, Directive, withQuery, Query, AutographBasicClient } from '../../src/autograph'
import * as GQL from './shopify.schema'

const AutographRoot = createRoot({
    client: new AutographBasicClient({
        url: 'https://toeglo.myshopify.com/api/2019-07/graphql.json',
        headers: {
            'X-Shopify-Storefront-Access-Token': '41593dce8779b1da26cc3ec49ffb39d6'
        }
    })
})

function App(){
    let query: GQL.Query = useQuery();

    if(query._loading) return <div>Loading...</div>;
    return <div style={{
        fontFamily: 'Avenir, Helvetica, sans-serif',
        background: 'whiteSmoke'
    }}>
        <h1>{query.shop.name} Store</h1>
        {query.products({
            first: 100
        }).edges.map((k: GQL.ProductEdge) => <div style={{
            boxShadow: '4px 7px 10px rgba(0,0,0,0.2)',
            padding: 20,
            margin: 20,
            background: 'white',
            borderRadius: 5
        }}>
            <h2>{k.node.title}</h2>
            <h3>${k.node.priceRange.minVariantPrice.amount} {k.node.priceRange.minVariantPrice.currencyCode}</h3>
            <div dangerouslySetInnerHTML={{
                __html: k.node.descriptionHtml
            }} />
           </div>
        )}
    </div>
}


let dom = <AutographRoot>
    <App />
</AutographRoot>

ReactDOM.render(dom, document.getElementById('root'))

// global.ag = AutographRoot._root;

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(dom)