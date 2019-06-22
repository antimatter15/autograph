import { hashArguments } from "./util/util";

export default function accessLogToGraphQL(log) {
    const encodeValue = (obj) =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj) => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    const indent = (x) => x.split('\n').map(k => '  ' + k).join('\n')

    const convertRecursive = (log, prefix = '') => {
        let gql = ''
        if(log.__directive) gql += log.__directive;

        if(log.__get) return gql;

        gql += '{\n'
        for(let key of Object.keys(log)) {
            if(key === '__directive') continue;
            let info = JSON.parse(key)
            if(info.type === 'METHOD'){
                gql += indent(prefix + info.name + '___' + hashArguments(info.args) + ': ' + info.name + 
                        (Object.keys(info.args).length > 0 ? ('(' + encodeKV(info.args) + ')') : '') + ' ' + convertRecursive(log[key]))  + '\n'
            }else if(info.type === 'PROP'){
                gql += indent((prefix ? (prefix + info.name + ': ') : '') + info.name + ' ' + convertRecursive(log[key])) + '\n'
            }else if(info.type === 'AS'){
                gql += indent('... on ' + info.name + ' ' + convertRecursive(log[key], '__AS_' + info.name + '___')) + '\n'
            }else if(info.type === 'FEAT'){
                // ignore these
            }else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
        }

        if(Object.keys(log).length === 0){
            gql += indent((prefix ? (prefix + '__typename: ') : '') + '__typename') + '\n'
        }

        gql += '}'
        return gql;
    }

    return convertRecursive(log, '')
}

