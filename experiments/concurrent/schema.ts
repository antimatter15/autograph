type Message = {
    value: string
}

export type Query = {
    hello(args: { name: string }): string
    getMessage: Message
}

export type Mutation = {
    changeMessage(args: { message: string }): Message
}

export const _query: Query = null as any
export const _mutation: Mutation = null as any

export const _schema = {
    hello: {
        type: 'string',
    },
}
