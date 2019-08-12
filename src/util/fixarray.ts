// For arrays, we bypass the result of filter so that it always returns the same
// list. This is so that we can observe which parts of the list get used in the
// map or forEach that may follow a filter.
export default function makeFixedArray(obj: any[]) {
    return new FixedPointArray(...obj)
}

class FixedPointArray extends Array {
    filter(test) {
        Array.prototype.filter.apply(this, arguments)
        return this
    }
    splice(index, del, ...insert) {
        Array.prototype.splice.apply([...this], arguments)
        return this
    }
    slice(start, end?) {
        Array.prototype.slice.apply(this, arguments)
        return this
    }
    reverse() {
        Array.prototype.reverse.apply(this, arguments)
        return this
    }
    sort(cmp) {
        Array.prototype.sort.apply(this, arguments)
        return this
    }
}
