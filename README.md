# autograph


Probably the slickest way to get started with Autograph is with the React API. To use that, you simply wrap your application with an `<Autograph>` component, which passes along a `Query` handle. Just use that `Query` handle as if it was a JSON blob that contained all of your data (fields with arguments turn into simple function calls).

    <Autograph url="Your GraphQL Endpoint">{
        Query => <div>{
            Query.me.friends({ limit: 50 }).map(friend => 
                <div key={friend.id}>{friend.name} ({friend.mutuals.length} mutual friends)</div>
            )
        }</div>
    }</Autograph>

Autograph will automatically generate the following GraphQL query, and feed the right data into your app.

    query {
        me {
            friends(limit: 50) {
                id
                name
                mutuals {
                    __typename
                }
            }
        }
    }

It doesn't require any compilation plugins either— so you don't have to worry about messing up your precarious `.babelrc`. You can use it with Webpack, Babel, Parcel, Next.JS, or even plain Javascript. 

That said, things get even better if you write your app in Typescript. Autograph can import a GraphQL schema and automatically generate a Typescript definition file, so that your editor can autocomplete fields in GraphQL while providing inline documentation, and your typechecker can ensure that all your UI code fits the data access schema. 

You might ask, how does this sorcery work? It's actually quite simple. We render your component twice— the first time, instead of threading in actual data through the `Query` object, we pass in a special object that we dynamically construct using the GraphQL schema. This object has methods and getters defined in all the right places that all output fake data. Whenever any field of the object gets accessed, it records the path of the data that was requested. At the end of the special rendering pass, all the paths are added up, and we generate the exact GraphQL query that fetches all the right data. Now it's just a simple matter of feeding the real data into your render function by calling it one last time.

Since React rendering functions typically have no side effects, most of the time things should just work. You can even pass the `Query` object or any of its descendents as a prop to other components, and it'll still do the right thing. It does have a few gotchas though— most notably, if there's any code path that accesses data which doesn't get called during the scouting phase, Autograph won't know to fetch that data. 

So we've seen Autograph for running queries, but what about for running mutations and updating a form on your site? 

    const doMutation = MakeMutation("Your GraphQL Endpoint")
    await doMutation(mutation => 
        <Review review={mutation.UpdateReview({ 
            id: ReviewID, 
            review: {
                author: 'Rodger Qbert',
                title: 'A Midwinter Days Trip',
                rating: 3
            }
        })} />
    )

Here we use a `MakeMutation` which returns a function that you can call with another function. You can pretend that it's just a Javascript object containing all your mutations, so you can any of its methods as ordinary functions. Our `UpdateReview` method here returns the updated `Review` instance with the changed fields, but we'll somehow need to signal what fields we're interested in fetching. The simple thing we can do is just pass the result of the mutation into the React component which typically renders `Review` objects. This will allow Autograph to figure out exactly what fields needs to be pulled. 

When these updated fields are pulled, the underlying GraphQL caching engine can notice this and update all the appropriate components on the page. 

What if you don't want to deal with React components at all? That's fine, the `doMutation` method (and as you might expect there's an almost identical `doQuery` method) doesn't care what you do with it— it just passes the finished result back through. 

    let data = await doQuery(query => {
        return {
            name: query.me.name,
            numberOfFriends: query.me.friends.length
        }
    })
    // data = { name: 'Bob Smitterjensen', numberOfFriends: 3 }

You might say that all of this looks pretty neat, but what if I want to do something stateful? What if I want to run a query and call some sort of external method with the results, without having to worry about a phantom scouting phase that feeds fake data? Conveniently every fake object in the initial phase includes a `__dryRun` field, which you can use to guard stateful calls. 

    await doQuery(query => {
        _.uniqBy(query.me.favoriteBooks
            .map(book => book.author),
            author => author.name
        ).forEach(author => {
            skipIf(query.__dryRun, drawAuthor)({
                name: author.name,
                image: author.image,
                books: author.books.length
            })
        })
    })

We've included a helper method `skipIf(shouldSkip: boolean, fn: function)` which you can use to easily substitute a function for a dummy function (you shouldn't use if statements because then Autograph won't know which fields are needed to run the query when it's actually time to call the function). 





## What is autograph?

Autograph lets you use graphql to load data. 

## Ways to use Autograph:

- React Suspense (suspend rendering until data loaded / loading placeholder boundaries)
- NextJS (server side isomorphic rendering)
- React Render Prop (show placeholder until data is loaded)
- React Higher Order Component (wrap a component so that it is passed Query as a prop)


## How autograph works

React works by first rendering to a virtual dom, figuring out which elements need to be created and updated, and applying the appropriate changes to the DOM. Autograph essentially makes use of a virtual virtual dom— a cursory rendering pass where it tries to figure out what pieces of data your app needs to render. From this it automatically generates a GraphQL query that fetches only the data that your app needs and nothing more. 

If you use typescript, you can import the type definitions generated by Autograph and have typescript statically ensure that all of your rendering code is compliant with your graphql schema. 

## Browser Compatibility

Autograph supports all browsers that React supports (IE9+). 


## What does it look like?
