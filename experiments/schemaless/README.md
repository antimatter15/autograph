# Schemaless Autograph

Autograph needs to have access to the GraphQL schema before it can do anything.
For large APIs the schema can be as large as several megabytes, which can slow
down the initial page load. This prototype is concerned with the possibility of 
using ES6 Proxies to generate GraphQL queries without needing a schema. 

### Advantages

- Simpler to implement as it does not require code to parse GQL schemas
- Faster to load because it does not use schemas
- Less overhead as schema does not have to be shipped with the app

### Disadvantages

- Doesn't support IE before Edge 12 since it requires Proxies
- Development experience is weirder as you don't get real objects with plausible types
- Enum arguments need to be wrapped with special function (cant pass raw strings)
- Custom scalar arguments need to be wrapped with special function
- Can't have GQL fields named `map`, `sort`, `filter`, `length` or other array methods. 

### Features

- Enums
- Variables / Custom scalars
- Inline fragments
- Fields / Arguments
- Array values (map, forEach, filter)

### Conclusion

The schemaless approach is an interesting one but 