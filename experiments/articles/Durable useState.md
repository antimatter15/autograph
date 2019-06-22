# useStateDurable

In order to explain why we need something like `useStateDurable`, we need to take a few steps back. Let's start with a simple example using custom React Hooks to fetch some data from a remote source. 

    function useFetch(fetcher){
        let [ data, setData ] = useState(null)
        useEffect(async () => {
            setData(await fetcher())
        }, [])
    }

    function App(){
        let data = useFetch(fetchData)
        if(!data) return <div>Loading...</div>
        return <div>{data}</div>
    }

The custom `useFetch` hook creates a little state store scoped to the component instance that calls it. So when an instance of the `App` component calls `useFetch`, it creates a little stateful pocket that can be used to store the results of a server fetch. 


Let `fetchData` be some function which returns a promise that returns the data loaded from a server, and this example should suffice to load data and render it. 

There's just one little annoyance about this `useFetch` hook— when we perform the initial render before any data has been loaded from the server, the function simply returns `null`. We need to detect this and return our own loading state  within that component. 

Scaled up to an entire frontend application, we wind up with an app where each little component can potentially have its own independent loading states that flash in and out of existence quickly enough to merely startle and confuse. 

React has another feature: Suspense, which allows a component to "suspend" rendering when data is being loaded. The loading interface is delegated to some fallback boundary somewhere higher up the component tree— and critically can be bypassed entirely if the loading process is quick enough. 

Here's a little toy example of how React Suspense can be used to fetch data. 

    let MyDataCache;
    function fetchDataWithSuspense(){
        if(!MyDataCache) MyDataCache = fetchData()
        if(MyDataCache instanceof Promise) throw MyDataCache;
        return MyDataCache;
    }
    
    function App(){
        let data = fetchDataWithSuspense()
        return <div>{data}</div>
    }

This data fetcher cache is global— every instance of App shares the same underlying data fetcher. If you're trying to fetch potentially multiple endpoints, you have to worry about cache eviction and garbage collection issues. 

It'd be nice if there were some way that this data were scoped to a single component instance. Let's see if we can somehow combine Suspense with Hooks.

    function useFetchMyData(){
        let [ data, setData ] = useState(null)
        if(!data){
            throw fetchData().then(data => setData(data))
        }
        return data;
    }

    function App(){
        let data = useFetchMyData()
        return <div>{data}</div>
    }


This doesn't work. 

The reason it doesn't work is that if we throw a promise during the first render of a component, React never saves the component's state. So when the thrown promise finally resolves and React tries to re-render App, it doesn't notice that it's already fetched the data, and tries to fetch again. 

 
Here's where `useStateDurable` comes in. It's a kind of weirder version of `useState` that still works in aborted renders. 






