import accessLogToGraphQL from '../graphql'

test('Empty Log', () => {
    expect(accessLogToGraphQL({})).toMatchInlineSnapshot(`
        "{
          __typename
        }"
    `)
})

test('Property', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {},
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            __typename
          }
        }"
    `)
})

test('Property Field', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "PROP", "name": "name"}': {
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name 
          }
        }"
    `)
})

test('Property Field (with Directive)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                __directive: '@skip',
                '{"type": "PROP", "name": "name"}': {
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users @skip{
            name 
          }
        }"
    `)
})

test('Property Field (with Directive 2)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "PROP", "name": "name"}': {
                    __directive: '@skip',
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name @skip
          }
        }"
    `)
})

test('Property Method', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "METHOD", "key": "name___7xk9a7", "name": "name", "args": {"capitalize": true}}': {
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name___7xk9a7: name(capitalize: true) 
          }
        }"
    `)
})

test('Property Method (No args)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "METHOD", "key": "name___3horh", "name": "name", "args": {}}': {
                    __get: true,
                },
            },
            '{"type": "FEAT"}': {},
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name___3horh: name 
          }
        }"
    `)
})

test('Property Method (Array)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "METHOD", "key": "name___7708j7", "name": "name", "args": {"whitelist": ["Steve", "Charles"]}}': {
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name___7708j7: name(whitelist: [\\"Steve\\", \\"Charles\\"]) 
          }
        }"
    `)
})

test('Property Method (Object)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "METHOD", "name": "name", "key": "name___nk8ia2", "args": {"rename": {"Steve":  "Charles"} }}': {
                    __get: true,
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            name___nk8ia2: name(rename: {Steve: \\"Charles\\"}) 
          }
        }"
    `)
})

test('Inline Fragment', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "AS", "name": "Human"}': {
                    '{"type": "METHOD", "name": "name", "key": "name___nk8ia2", "args": {"rename": {"Steve":  "Charles"} }}': {
                        __get: true,
                    },
                    '{"type": "PROP", "name": "name"}': {
                        __get: true,
                    },
                    '{"type": "PROP", "name": "flumbo"}': {},
                },
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            ... on Human {
              __AS_Human___name___nk8ia2: name(rename: {Steve: \\"Charles\\"}) 
              __AS_Human___name: name 
              __AS_Human___flumbo: flumbo {
                __typename
              }
            }
          }
        }"
    `)
})

test('Inline Fragment (empty)', () => {
    expect(
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "AS", "name": "Human"}': {},
            },
        })
    ).toMatchInlineSnapshot(`
        "{
          users {
            ... on Human {
              __AS_Human_____typename: __typename
            }
          }
        }"
    `)
})

test('Unsupported Types', () => {
    expect(() =>
        accessLogToGraphQL({
            '{"type": "PROP", "name": "users"}': {
                '{"type": "ZOOP", "name": "Human"}': {},
            },
        })
    ).toThrowErrorMatchingInlineSnapshot(`"Encountered unexpected navigation type \\"ZOOP\\""`)
})
