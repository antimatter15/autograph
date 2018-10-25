import { GenericObject, GQLSchema, GQLTypeDef } from "./schema";
import { hashArguments } from "./util";

export function makeRetriever(data: any, schema?: GQLSchema, obj?: GQLTypeDef): any {
    if(!data) return data;
    if(typeof data != 'object') return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k, schema, obj));

    let retriever : GenericObject = {}

    const getFieldType = (key: string) => undefined

    for(let key in data){
        if(key.startsWith('__AS_')){
            // inline fragments for interfaces
            let name = 'as' + key.slice(5, key.indexOf('___'))
            if(!retriever[name]) retriever[name] = {}
            Object.assign(retriever[name], makeRetriever({ 
                [key.slice(key.indexOf('___') + 3)]: data[key] 
            }))
        }else if(key.indexOf('___') > 0){
            // function calls & fields with arguments
            let name = key.split('___')[0]
            retriever[name] = (args: GenericObject) => 
                makeRetriever(data[name + '___' + hashArguments(args)], schema, getFieldType(name))
        }else{
            // fields with no arguments
            retriever[key] = makeRetriever(data[key], schema, getFieldType(key))
        }
    }
    return retriever
}
