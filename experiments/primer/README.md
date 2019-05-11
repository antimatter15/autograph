# Primer
(a primer)


We want this to support multiple clients and multiple Autographs with potentially overlapping subtrees.

    let query1 = useAutograph(Endpoint 1)
    let query2 = useAutograph(Endpoint 2)
    return <div>{query1.stuff} {query2.stuff}</div>

In fact we actually want to support multiple instances of the same endpoint. Maybe we could store each update hook but we only fire them once. 


