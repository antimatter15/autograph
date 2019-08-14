// For arrays, we bypass the result of filter so that it always returns the same
// list. This is so that we can observe which parts of the list get used in the
// map or forEach that may follow a filter.
export default function makeFixedArray(obj: any[]) {
    return new FixedPointArray(...obj)
}

class FixedPointArray extends Array {
    filter(callbackfn: (value: any, index: number, array: any[]) => any): any[] {
        Array.prototype.filter.apply(this, arguments as any)
        return this
    }
    splice(start: number, deleteCount?: number, ...insert: any[]): any[] {
        Array.prototype.splice.apply([...this], arguments as any)
        return this
    }
    slice(start?: number, end?: number): any[] {
        Array.prototype.slice.apply(this, arguments as any)
        return this
    }
    reverse(): any[] {
        Array.prototype.reverse.apply(this, arguments as any)
        return this
    }
    sort(compareFn?: (a: any, b: any) => number) {
        Array.prototype.sort.apply(this, arguments as any)
        return this
    }
}
