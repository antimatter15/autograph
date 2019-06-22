
export function hashArguments(args) {
    // This is a simple implementation of Dan Bernstein's djb2 non-cryptographic hash algorithm
    // which should suffice to keep adjacent gql queries with different arguments from colliding
    let json = JSON.stringify(args || {})
    for(var i = 0, hash = 5381; i < json.length; i++)
        hash = (((hash << 5) + hash) + json.charCodeAt(i)) | 0;
    return Math.abs(hash).toString(36);
}



export function shallowCompare(a, b){
    return JSON.stringify(a) === JSON.stringify(b)
}


export function nextFrame(){
    return new Promise(resolve => { 
        if(typeof process !== 'undefined' && process.nextTick){
            process.nextTick(resolve)
        }else{
            requestAnimationFrame(() => {
                resolve()
            })   
        }
    })
}



export function invar(invariant, message){
    if(!invariant) throw new Error(message)
}