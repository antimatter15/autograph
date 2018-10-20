import { encodeField, decodeField, encodeArguments, decodeArguments } from "./autograph";

test("encodeField/decodeField", () => {
  let fieldWithArgs = {
    name: "pokemons",
    args: [
      {
        name: "first",
        type: {}
      }
    ]
  };
  let encodedWithArgs = encodeField(fieldWithArgs, {
    first: 'test'
  })

  expect(typeof encodedWithArgs).toBe('string')

  expect(decodeField(encodedWithArgs))
    .toEqual(['pokemons', { first: 'test' }]);

  let encodedWithArgsNull = encodeField(fieldWithArgs, null)
  expect(typeof encodedWithArgsNull).toBe('string')

  expect(decodeField(encodedWithArgsNull)).toEqual(['pokemons', {}]);

  let fieldWithoutArgs = {
    name: "attacks",
    args: []
  };
  let encodedWithoutArgs = encodeField(fieldWithoutArgs, null)
  expect(typeof encodedWithoutArgs).toBe('string')
  expect(decodeField(encodedWithoutArgs)).toEqual(['attacks', null]);
});



test("encodeArguments/decodeArguments", () => {
  const encodeInvar = value => {
    expect(typeof value).toBe('string')
    return value
  }
  let enc1 = encodeArguments('pokemons', {}),
      enc2 = encodeArguments('pokemons', { merp: 42 }),
      enc3 = encodeArguments('pokemons', null),
      enc4 = encodeArguments('attacks', null)
  
  expect(decodeArguments(encodeInvar(enc1)))
    .toEqual(['pokemons', true])

  expect(decodeArguments(encodeInvar(enc2)))
    .toEqual(['pokemons', true])

  expect(decodeArguments(encodeInvar(enc3)))
    .toEqual(['pokemons', true])


  expect(enc1).toEqual(enc3)
  expect(enc1).not.toEqual(enc2)
  expect(enc3).not.toEqual(enc4)
});




