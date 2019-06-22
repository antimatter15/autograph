test('hello world', () => {
    let callRender = jest.fn()
    callRender()
    expect(callRender.mock.calls.length).toBe(1)
})