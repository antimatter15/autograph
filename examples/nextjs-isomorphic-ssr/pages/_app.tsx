import * as React from 'react'
import App, { Container } from 'next/app'
import 'isomorphic-fetch'

import { getDataFromTree, makeRetriever } from '../../../dist/index'

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }: { Component: any, router: any, ctx: any }) {
        let pageProps = {
            gqlData: null,
            gqlSchema: null,
            ctx: {
                pathname: ctx.pathname,
                query: ctx.query
            }
        }
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        
        pageProps.gqlData = await getDataFromTree('https://graphql-pokemon.now.sh/graphql', 'query',
            Query => <Component { ...pageProps } Query={Query} />) as any
        
        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props

        if(pageProps.gqlData){
            pageProps.Query = makeRetriever(pageProps.gqlData)
        }

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        )
    }
}
