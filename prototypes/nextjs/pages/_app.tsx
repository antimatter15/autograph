import React from 'react'
import App, { Container } from 'next/app'
import 'isomorphic-fetch'

import { autographData, makeRetriever } from '../autograph'

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
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
        
        pageProps.gqlData = await autographData({
            url: 'https://graphql-pokemon.now.sh/graphql',
            render: Query => <Component { ...pageProps } Query={Query} />
        })
     
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
