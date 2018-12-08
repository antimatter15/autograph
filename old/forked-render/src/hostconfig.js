export const supportsMutation = true;

export const isPrimaryRenderer = false;
export const now = Date.now;

export const scheduleTimeout = setTimeout;
export const cancelTimeout = clearTimeout;
export const noTimeout = -1;


export function shouldSetTextContent(type, props) {
    console.warn('shouldSetTextContent', type, props)
    return false;
}

export function shouldDeprioritizeSubtree(type, props) {
    console.log('shouldDeprioritizeSubtree')
    return false;
}


// import ReactDOMHostConfig from 'react-dom/src/client/ReactDOMHostConfig'

// export function getRootHostContext(rootContainerInstance){
//     // return ReactDOMHostConfig.getRootHostContext(rootContainerInstance)
//     return 'namespace'
// }


export function getRootHostContext(){

}
export function prepareForCommit(){
    console.log('prepareForCommit')
}
export function resetAfterCommit(){
    console.log('resetAfterCommit')
}
export function getChildHostContext(){

}
export function createInstance(){
    console.log('createInstance')
}
export function createTextInstance(){
    console.log('createTextInstance')
}
export function appendInitialChild(){
    console.log('appendInitialChild')
}
export function finalizeInitialChildren(){
    console.log('finalizeInitialChildren')
}

export function appendChildToContainer(){
    console.log('appendChildToContainer')
}
export function scheduleDeferredCallback(fn){
    console.log('scheduleDeferredCallback')
    fn()
}

export function removeChildFromContainer(){
    console.log('removeChildFromContainer')
}