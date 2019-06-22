import { hashArguments, shallowCompare, nextFrame, invar } from '../util'

describe('hashArguments', () => {
    test('normal', () => {
        expect(
            hashArguments({
                test: 'wumbo',
            })
        ).toMatchInlineSnapshot(`"48c3nt"`)
    })
    test('empty', () => {
        expect(
            hashArguments(null)
        ).toMatchInlineSnapshot(`"3horh"`)
    })
})


test('shallowCompare', () => {
    expect(shallowCompare({ a: 42 }, { a: 42 })).toBe(true)
    expect(shallowCompare({ a: 42 }, { a: 41 })).toBe(false)
})


test('nextFrame', async () => {
    let start = Date.now()
    await nextFrame()
    expect(Date.now() - start).toBeLessThan(100);
})


test('invar', () => {
    expect(() => {
        invar(true, 'not to throw')
    }).not.toThrow()
    expect(() => {
        invar(false, 'to throw')
    }).toThrow()
})