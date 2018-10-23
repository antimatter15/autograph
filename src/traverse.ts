import * as React from 'react'
import { GenericObject } from './schema';

export function traverseTree(element: any): void {
    if(Array.isArray(element)){ // render all children
        for(let el of element) traverseTree(el);
        return
    }
    if(!React.isValidElement(element)){
        if(typeof element == 'object'){
            for(let key in element){
                traverseTree(element[key])
            }
        }
        return
    }
    if((element.props as GenericObject).children)
        traverseTree((element.props as GenericObject).children);
    if(typeof element.type === 'function'){
        if(element.type.prototype.render){
            // stateful react components
            let clone = React.cloneElement(element)
            let el = new (clone.type as any)(clone.props)
            el.render()
        }else{
            // stateless functional react components
            traverseTree((element.type as (props: GenericObject) => JSX.Element)(element.props))    
        }
    }
}

