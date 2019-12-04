import React from 'react'
import * as GQL from './schema'
import { types } from '@babel/core'

interface Schema {
    _query: any
    _mutation: any
    _schema: any
}

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn

function createAutograph<T extends Schema>(url: string, schema?: T) {
    return {
        // This is the core API surface
        // which is accessible within a render
        useQuery(): T['_query'] {
            return null as any
        },
        Eager<T>(bool: T): T {
            return bool
        },
        Directive<T>(directive: string, value: T): T {
            return value
        },
        // These are React Components

        // This is functionally just a little two line function
        // that makes it easier to write inline suspense bits
        Suspense({ children, ssr, fallback }) {
            if (typeof children === 'function') {
                let Children = children
                children = <Children />
            }
            if (ssr === false) {
                // Yes this technically violates the rules of hooks...
                // but noSSR isn't something that can change between component updates

                let [isLoaded, setLoaded] = React.useState(false)
                React.useEffect(() => {
                    setLoaded(true)
                }, [])
                return isLoaded ? (
                    <React.Suspense fallback={fallback}>{children}</React.Suspense>
                ) : (
                    fallback
                )
            } else {
                return <React.Suspense fallback={fallback}>{children}</React.Suspense>
            }
        },
        Root({ children, initialCache }) {
            return children
        },

        // These are the methods that are singletons
        // and aren't available during the render pass
        async refetch() {},
        get mutation(): {
            // [key in keyof T['_mutation']]: ReplaceReturnType<
            //     T['_mutation'][key],
            //     Promise<ReturnType<T['_mutation'][key]>>
            // >
            [key in keyof T['_mutation']]: (
                args: Parameters<T['_mutation'][key]>[0],
                fetch: string
            ) => Promise<void>
        } {
            return null as any
        },
    }
}

let Ag = createAutograph('http://whatever.com', GQL)

Ag.mutation.changeMessage({ message: 'hello' }, 'merp').then(() => {
    console.log('changed!')
})

// The problem with inline functional components is that they always get
// re-run even if they haven't materially changed

// One notable thing about SSR is that we don't actually need to
// use Suspense on the server, we can instead just trigger a dry-render
// and determine queries which need to be run. This saves an extra render.

// We could potentially use our special SSR component to implement
// the noSSR attribute.
