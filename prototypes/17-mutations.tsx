`
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`


GQL.Mutation.updateMessage({
    id: 'my id',
    input: {
        content: 'ateasfd',
        author: 'asdfwe'
    }
})


Autograph.Mutation('URL', Mutation => 
    Mutation.updateMessage({
        id: 'my id',
        input: {
            content: 'ateasfd',
            author: 'asdfwe'
        }
    }), message => <RenderMessage message={message} />)



GQL.Mutation.updateMessage({
    id: 'my id',
    input: {
        content: 'ateasfd',
        author: 'asdfwe'
    }
}).render(message => <RenderMessage message={message} />)


let Mutation: GQL.Mutation = await Autograph.createMutator('GQL URL')

Mutation.updateMessage({
    id: 'my id',
    input: {
        content: 'ateasfd',
        author: 'asdfwe'
    }
}, message => <RenderMessage message={message} />)


mutate('URL', Mutation => <RenderMessage message={Mutation.updateMessage({
        id: 'my id',
        input: {
            content: 'ateasfd',
            author: 'asdfwe'
        }
    })} />)







