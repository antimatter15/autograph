---
id: api
title: API
sidebar_label: API
---


## Setup


Client-Provider API:

`createClient(URL)`

`<AutographRoot client={} />`


Create-Root API

`const AutographRoot = createRoot(URL)`


## Autograph Client

`.refetchQuery(queryConfig)`


`.mutation.Whatever(args, whatToReturn) => Promise<????>`


`.subscription.Whatever(args, whatToReturn) => Promise<???>`



## Hooks

`useQuery(queryConfig = 'default', handleOptions = {})`


## HOC

`withQuery(queryConfig = 'default', handleOptions = {}, mapProps = (props, query) => ({ ...props, query }))`


## Render Prop

`<Query query={'default'} handle={handleOptions}>{query => JSX.Element}</Query>`

`<Query>{query => query.x.y.z}</Query>`


## Directive

`Directive(directive: string, value: any)`


`Directive('@skip', query.x.y).z.w`



## Loading

`Loading(fn: () => JSX.Element)`

`Loading(fallback: JSX.Element, fn: () => JSX.Element)`


```
return Loading(<div>Loading...</div>, () => <div>
    {query.whatever.soemthing}
</div>)
```

## Eager

```
if(Eager(x.y)){
    return query.x.y.w
}else{
    return query.x.y.z
}
```