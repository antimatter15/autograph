# WIP Autograph Mutations

Is there a way to make mutations good? 

    function CommentForm(){
        let [ text, setText ] = useState('')
        return <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button onClick={e => mutation.AddComment({ text: text })}>Submit</button>
        </div>
    }

But what are we ultimately doing with the that comment? Ideally we want to inject that comment into our comment list optimistically. 




    mutate(mutation => {
        let data = mutation.ChangeThis({
            arg1: string
        })
        dryRender(<Blah data={data} />)
        return () => {
            // this gets called when the data is actually available?
        }
    })




Alternative: how about we make all of our mutations into async functions that just return everything one level deep (Prisma style). 

    let data = await Mutation.ChangeThis({
        
    }, ['*'])


