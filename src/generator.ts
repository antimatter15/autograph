import { GQLOperationTypes, GenericObject } from "./schema";
import { AccessLog } from "./logger";
import { hashArguments } from "./util";

type GraphQLGeneratorOptions = {
    operationType?: GQLOperationTypes
}

const DefaultGraphQLGeneratorOptions: GraphQLGeneratorOptions = {
    operationType: 'query'
}

export function accessLogToGraphQL(log: AccessLog, options: GraphQLGeneratorOptions = DefaultGraphQLGeneratorOptions): string {
    options = Object.assign({}, DefaultGraphQLGeneratorOptions, options)

    const encodeValue = (obj: any): string =>
        (typeof obj === 'object') ? 
            (Array.isArray(obj) ? 
                ('[' + obj.map(encodeValue).join(', ') + ']'):
                ('{' + encodeKV(obj) + '}') ) : 
            JSON.stringify(obj)
    
    const encodeKV = (obj: GenericObject): string => Object.keys(obj)
        .map(key => key + ': ' + encodeValue(obj[key]))
        .join(', ')

    const indent = (x: string) => x.split('\n').map(k => '  ' + k).join('\n')

    const convertRecursive = (log: AccessLog, prefix = ''): string => {
        if(log === 1) return '';

        let gql = ''
        gql += '{\n'
        for(let key of Object.keys(log)) {
            let info = JSON.parse(key)
            if(info.type == 'NAV'){
                if(info.hasArgs){
                    gql += indent(prefix + info.name + '___' + hashArguments(info.args) + ': ' + info.name + 
                        (Object.keys(info.args).length > 0 ? ('(' + encodeKV(info.args) + ')') : '') + ' ' + convertRecursive(log[key]))  + '\n'
                }else{
                    gql += indent((prefix ? (prefix + info.name + ': ') : '') + info.name + ' ' + convertRecursive(log[key])) + '\n'
                }
            }else if(info.type == 'AS'){
                gql += indent('... on ' + info.name + ' ' + convertRecursive(log[key], '__AS_' + info.name + '___')) + '\n'
            }else throw new Error(`Encountered unexpected navigation type "${info.type}"`)
        }

        if(Object.keys(log).length == 0){
            gql += indent((prefix ? (prefix + '__typename: ') : '') + '__typename') + '\n'
        }

        gql += '}'
        return gql;
    }

    if(options.operationType == 'query'){
        return convertRecursive(log, '')
    }else if(options.operationType == 'mutation'){
        return 'mutation ' + convertRecursive(log, '')
    }else{
        throw new Error(`Unsupported operation type "${options.operationType}"`)
    }
}

