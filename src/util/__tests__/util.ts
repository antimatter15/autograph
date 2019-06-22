import { hashArguments } from '../util'

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
