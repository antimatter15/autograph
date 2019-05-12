# WIP Autograph Subscriptions API

We basically want to pretend that we have live queries....

    function Comments({ postId }){
        let query = useAutograph()
        let data = query.getComments({ postId: postId })
        
        Subscription.commentAdded({ postId: postId })

        return <div>{
            data.comments.map(comment => 
                <Comment key={comment.id} data={comment} />)
        }</div>
    }


What's the ideal use case:

    Subscription.commentAdded({
        repoFullName: string
    }, update => {
        // here is my subscription update!
    })

But maybe that's not what we actually want?


React Hooks:

    useSubscription(subscription => {
        let data = subscription.commentAdded({
            repoFullName: string
        })
        return <Comment data={data} />
    })

This would essentially create a `useEffect` hook that would create a subscription object. 


Low level:

    doSubscription(subscription => {
        let data = subscription.commentAdded({
            repoFullName: string
        })
        void data.stuff
        dryRender(<Comment data={data} />)
    }, (update) => {
        console.log(update)
    })

