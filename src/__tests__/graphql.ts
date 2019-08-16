import accessLogToGraphQL from '../graphql'

test('Empty Log', () => {
    expect(accessLogToGraphQL({}, null)).toMatchInlineSnapshot(`
        Object {
          "query": "{
          __typename
        }",
          "variables": Object {},
        }
    `)
})

test('Property', () => {
    expect(
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {},
            },
            null
        )
    ).toMatchInlineSnapshot(`
        Object {
          "query": "{
          users {
            __typename
          }
        }",
          "variables": Object {},
        }
    `)
})

test('Property Field', () => {
    expect(
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {
                    '{"type": "PROP", "name": "name"}': {
                        __get: true,
                    },
                },
            },
            null
        )
    ).toMatchInlineSnapshot(`
        Object {
          "query": "{
          users {
            name 
          }
        }",
          "variables": Object {},
        }
    `)
})

test('Property Field (with Directive)', () => {
    expect(
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {
                    __directive: '@skip',
                    '{"type": "PROP", "name": "name"}': {
                        __get: true,
                    },
                },
            },
            null
        )
    ).toMatchInlineSnapshot(`
        Object {
          "query": "{
          users @skip{
            name 
          }
        }",
          "variables": Object {},
        }
    `)
})

test('Property Field (with Directive 2)', () => {
    expect(
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {
                    '{"type": "PROP", "name": "name"}': {
                        __directive: '@skip',
                        __get: true,
                    },
                },
            },
            null
        )
    ).toMatchInlineSnapshot(`
        Object {
          "query": "{
          users {
            name @skip
          }
        }",
          "variables": Object {},
        }
    `)
})

// test('Property Method', () => {
//     expect(
//         accessLogToGraphQL(
//             {
//                 '{"type": "PROP", "name": "users"}': {
//                     '{"type": "METHOD", "key": "name___7xk9a7", "name": "name", "args": {"capitalize": true}}': {
//                         __get: true,
//                     },
//                 },
//             },
//             null
//         )
//     ).toMatchInlineSnapshot(`
//                 "{
//                   users {
//                     name___7xk9a7: name(capitalize: true) 
//                   }
//                 }"
//         `)
// })

// test('Property Method (No args)', () => {
//     expect(
//         accessLogToGraphQL(
//             {
//                 '{"type": "PROP", "name": "users"}': {
//                     '{"type": "METHOD", "key": "name___3horh", "name": "name", "args": {}}': {
//                         __get: true,
//                     },
//                 },
//                 '{"type": "FEAT"}': {},
//             },
//             null
//         )
//     ).toMatchInlineSnapshot(`
//         Object {
//           "query": "{
//           users {
//             name___3horh: name 
//           }
//         }",
//           "variables": Object {},
//         }
//     `)
// })

// test('Property Method (Array)', () => {
//     expect(
//         accessLogToGraphQL(
//             {
//                 '{"type": "PROP", "name": "users"}': {
//                     '{"type": "METHOD", "key": "name___7708j7", "name": "name", "args": {"whitelist": ["Steve", "Charles"]}}': {
//                         __get: true,
//                     },
//                 },
//             },
//             null
//         )
//     ).toMatchInlineSnapshot(`
//                 "{
//                   users {
//                     name___7708j7: name(whitelist: [\\"Steve\\", \\"Charles\\"]) 
//                   }
//                 }"
//         `)
// })

// test('Property Method (Object)', () => {
//     expect(
//         accessLogToGraphQL(
//             {
//                 '{"type": "PROP", "name": "users"}': {
//                     '{"type": "METHOD", "name": "name", "key": "name___nk8ia2", "args": {"rename": {"Steve":  "Charles"} }}': {
//                         __get: true,
//                     },
//                 },
//             },
//             null
//         )
//     ).toMatchInlineSnapshot(`
//                 "{
//                   users {
//                     name___nk8ia2: name(rename: {Steve: \\"Charles\\"}) 
//                   }
//                 }"
//         `)
// })

// test('Inline Fragment', () => {
//     expect(
//         accessLogToGraphQL(
//             {
//                 '{"type": "PROP", "name": "users"}': {
//                     '{"type": "AS", "name": "Human"}': {
//                         '{"type": "METHOD", "name": "name", "key": "name___nk8ia2", "args": {"rename": {"Steve":  "Charles"} }}': {
//                             __get: true,
//                         },
//                         '{"type": "PROP", "name": "name"}': {
//                             __get: true,
//                         },
//                         '{"type": "PROP", "name": "flumbo"}': {},
//                     },
//                 },
//             },
//             null
//         )
//     ).toMatchInlineSnapshot(`
//                 "{
//                   users {
//                     ... on Human {
//                       __AS_Human___name___nk8ia2: name(rename: {Steve: \\"Charles\\"}) 
//                       __AS_Human___name: name 
//                       __AS_Human___flumbo: flumbo {
//                         __typename
//                       }
//                     }
//                   }
//                 }"
//         `)
// })

test('Inline Fragment (empty)', () => {
    expect(
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {
                    '{"type": "AS", "name": "Human"}': {},
                },
            },
            null
        )
    ).toMatchInlineSnapshot(`
        Object {
          "query": "{
          users {
            ... on Human {
              __AS_Human_____typename: __typename
            }
          }
        }",
          "variables": Object {},
        }
    `)
})

test('Unsupported Types', () => {
    expect(() =>
        accessLogToGraphQL(
            {
                '{"type": "PROP", "name": "users"}': {
                    '{"type": "ZOOP", "name": "Human"}': {},
                },
            },
            null
        )
    ).toThrowErrorMatchingInlineSnapshot(`"Encountered unexpected navigation type \\"ZOOP\\""`)
})
