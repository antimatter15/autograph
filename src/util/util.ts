export function hashArguments(args: any): string {
    // This is a simple implementation of Dan Bernstein's djb2 non-cryptographic hash algorithm
    // which should suffice to keep adjacent gql queries with different arguments from colliding
    let json = JSON.stringify(args || {})
    for (var i = 0, hash = 5381; i < json.length; i++)
        hash = ((hash << 5) + hash + json.charCodeAt(i)) | 0
    return Math.abs(hash).toString(36)
}

export function shallowCompare(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b)
}

export function nextFrame() {
    return Promise.resolve(true)
}

export function invar(invariant: boolean, message: string) {
    if (!invariant) throw new Error(message)
}
