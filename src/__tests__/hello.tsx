import { hi } from '../basic'

test('hello world', () => {
    let callRender = jest.fn()
    callRender()
    expect(callRender.mock.calls.length).toBe(1)
})

test('hi test', () => {
    
    expect(hi(3)).toBe(7)
})