import makeFixedArray from "../fixarray";

describe('Fix array', () => {
    test('length', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        expect(arr.length).toBe(5)
    })

    test('iterate', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        for(let i = 0; i < arr.length; i++){
            expect(arr[i]).toBe(i + 1)
        }
    })

    test('filter', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        expect(arr.filter(k => false).length).toBe(5)
    })

    test('sort', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        expect(arr.sort((a, b) => a - b).filter(k => false).length).toBe(5)
    })

    test('slice', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        expect(arr.slice(0, 1).filter(k => false).length).toBe(5)
    })

    test('reverse', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        expect(arr.reverse().filter(k => false).length).toBe(5)
    })


    test('splice', () => {
        let arr = makeFixedArray([1, 2, 3, 4, 5]);
        arr.splice(0, 5)
        expect(arr.length).toBe(5)
    })
})
