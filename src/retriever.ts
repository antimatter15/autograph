import { GenericObject } from "./schema";
import { hashArguments } from "./util";

export function makeRetriever(data: any): any {
    if(!data) return data;
    if(typeof data != 'object') return data;
    if(Array.isArray(data)) return data.map(k => makeRetriever(k));

    let retriever : GenericObject = {}

    for(let key in data){
        if(key.startsWith('__AS_')){
            let name = 'as' + key.slice(5, key.indexOf('___'))
            if(!retriever[name]) retriever[name] = {}
            Object.assign(retriever[name], makeRetriever({ 
                [key.slice(key.indexOf('___') + 3)]: data[key] 
            }))
        }else if(key.indexOf('___') > 0){
            let name = key.split('___')[0]
            retriever[name] = (args: GenericObject) => makeRetriever(data[name + '___' + hashArguments(args)])
        }else{
            retriever[key] = makeRetriever(data[key])
        }
    }
    return retriever
}