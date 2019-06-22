// inline render prop
function App(){
    return <Autograph
        url="https://graphql-pokemon.now.sh/graphql"
        render={(Query: GQL.Query) => <Demo Query={Query} />} />
}

// children as render prop
function App(){
    return <Autograph url="https://graphql-pokemon.now.sh/graphql">{
        (Query: GQL.Query) => <Demo Query={Query} />
    }</Autograph>
}




// inline render prop
function App(){
    return <Autograph
        url="https://graphql-pokemon.now.sh/graphql"
        render={(Query: GQL.Query) => <div>
            {Query.pokemon({ name: 'pikachu' }).number}
        </div>} />
}

// children as render prop
function App(){
    return <Autograph url="https://graphql-pokemon.now.sh/graphql">{
        (Query: GQL.Query) => <div>
            {Query.pokemon({ name: 'pikachu' }).number}
        </div>
    }</Autograph>
}



// inline render prop
function App() {
    return (
        <Autograph
            url="https://graphql-pokemon.now.sh/graphql"
            render={(Query: GQL.Query) => (
                <div>{Query.pokemon({ name: "pikachu" }).number}</div>
            )}
        />
    );
}

// children as render prop
function App() {
    return (
        <Autograph url="https://graphql-pokemon.now.sh/graphql">
            {(Query: GQL.Query) => (
                <div>{Query.pokemon({ name: "pikachu" }).number}</div>
            )}
        </Autograph>
    );
}





