
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
    // console.log('before throw')
    return new Promise(resolve => { 
        // setTimeout(resolve, 0)
        // resolve()
        requestAnimationFrame(() => {
            // console.log('resolvin')
            resolve()
            // console.log('resolved')
        }) 

        // setTimeout(() => {
        //     console.log('resolvin')
        //     resolve()
        //     console.log('resolved')
        // }, 0)
        
    })
}

