// Schemaless Autograph
// Advantages: 
// - Simpler to implement as it does not require code to parse GQL schemas
// - Faster to load because it does not use schemas
// - Less overhead as schema does not have to be shipped with the app

// Disadvantages:
// - Doesn't support IE before Edge 12 since it requires Proxies
// - Development experience is weirder as you don't get real objects with plausible types
// - Enum arguments need to be wrapped with special function (cant pass raw strings)
// - Custom scalar arguments need to be wrapped with special function
// - Can't have GQL fields named `map`, `sort`, `filter`, `length` or other array methods. 


function makeHandle(log){
    function asMethod(args = {}){
        let key = '#' + JSON.stringify(args)
        let sub = (log[key] = log[key] || {})
        return makeHandle(sub)
    }
    const arrayMethods = {
        map(fn){
            return [ fn(proxy) ]
        },
        forEach(fn){
            fn(proxy)
        },
        filter(fn){
            fn(proxy)
            return proxy
        }
    }
    const proxyHandlers = {
        get(target, key){
            if(key in arrayMethods) return arrayMethods[key];
            if(key === 'length'){
                proxy.__typename;
                return 1
            }
            let sub = (log[key] = log[key] || {})
            return makeHandle(sub)
        }
    }
    const proxy = new Proxy(asMethod, proxyHandlers);
    return proxy
}

const Enum = new Proxy({}, {
    get(target, key){
        return {
            __enum: key
        }
    }
})

const indent = (x) =>
    x
        .split('\n')
        .map((k) => '  ' + k)
        .join('\n')


function generateGQL(log){
    const variables = {}
    let vardecls = []
    const encodeArg = x => {
        if(typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean') return JSON.stringify(x)
        if(!x) return 'null';
        if(Array.isArray(x)) return '[' + x.map(k => encodeArg(k)).join(', ') + ']';
        if(x.__enum){
            if(!/^[_A-Za-z][_0-9A-Za-z]*$/.test(x.__enum)) throw new Error('Invalid ENUM');
            return x.__enum;
        }else if(x.__var){
            let key = 'a' + Object.keys(variables).length.toString(36);
            vardecls.push('$' + key + ': ' + x.__var)
            variables[key] = x.__val;
            return '$' + key
        }
        return '{' + Object.keys(x)
            .filter(k => /^[_A-Za-z][_0-9A-Za-z]*$/.test(k))
            .map(k => k + ': ' + encodeArg(x[k])).join(', ') + '}'
    }

    const generateGQLRecursive = (log) => {
        let gql = ''
        for(let key in log){
            if(key[0] === '#') continue;
            if(key.startsWith('as')){
                gql += indent(`... as ${key.slice(2)} ${generateGQLRecursive(log[key], key)}`) + '\n'
            }else{
                gql += indent(`${key} ${generateGQLRecursive(log[key], key)}`) + '\n'
            }
            for(let subkey in log[key]){
                if(subkey[0] !== '#') continue;
                let args = JSON.parse(subkey.slice(1))
                gql += indent(`${key}(${encodeArg(args)}) ${generateGQLRecursive(log[key][subkey])}`) + '\n'
            }
        }
        if(gql != ''){
            gql = '{\n' + gql + '}'
        }
        return gql
    }
    let gql = generateGQLRecursive(log);
    if(vardecls.length > 0){
        gql = 'query (' + vardecls.join(', ') + ') ' + gql
    }
    return {
        query: gql,
        variables: variables 
    }
}

function Variable(type, value){
    return {
        __var: type,
        __val: value
    }
}

let log = {}
let query = makeHandle(log)


// query.dogs.length

query.friends.map(k => ({
    name: k.name,
    age: k.age
}))

query.friends({
    named: 'bob',
    order: Enum.ASC,
    card: Variable('JSON', {
        x: 42
    })
}).map(k => k.hometown)

query.dogs.length


query.favoriteCharacter.asHuman.name

let q = generateGQL(log)
console.log(q.query)
console.log(q.variables)