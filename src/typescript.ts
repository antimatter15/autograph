import { GQLSchema, GQLTypeRef } from './graphql'

// We try to generate code here which is both valid Flow and Typescript

export default function convertGQLSchemaToTypescript(schema: GQLSchema) {
    const INDENT = '    ' // 4 spaces
    let ts = ''

    if (schema.queryType.name !== 'Query' && !schema.types.some((k) => k.name === 'Query')) {
        ts += 'export type Query = ' + schema.queryType.name + '\n\n'
    }

    if (
        schema.mutationType &&
        schema.mutationType.name !== 'Mutation' &&
        !schema.types.some((k) => k.name === 'Mutation')
    ) {
        ts += 'export type Mutation = ' + schema.mutationType.name + '\n\n'
    }

    ts += 'type GQLType = {\n'
    ts += INDENT + '/** The name of the object type */\n'
    ts += INDENT + '__typename: string,\n'
    ts += '}\n\n'

    const BUILTIN_TYPES = [
        '__Directive',
        '__DirectiveLocation',
        '__EnumValue',
        '__Field',
        '__InputValue',
        '__Schema',
        '__Type',
        '__TypeKind',
    ]

    const SCALAR_MAP = {
        Int: 'number',
        Float: 'number',
        ID: 'string',
    }

    for (let type of schema.types) {
        if (BUILTIN_TYPES.indexOf(type.name!) !== -1) continue
        if (type.kind === 'OBJECT') {
            if (type.description) ts += '/** ' + type.description + ' */\n'
            ts += 'export type ' + type.name + ' = GQLType & {\n'

            for (let field of type.fields!) {
                if (field.description) ts += INDENT + '/** ' + field.description + ' */\n'
                if (field.deprecationReason)
                    ts += INDENT + '/** @deprecated ' + field.deprecationReason + ' */\n'
                if (field.args.length > 0) {
                    ts +=
                        INDENT +
                        field.name +
                        '(args' +
                        (field.args.every((arg) => IsGQLTypeNullable(arg.type)) ? '?' : '') +
                        ': { ' +
                        field.args
                            .map(
                                (arg) =>
                                    arg.name +
                                    (IsGQLTypeNullable(arg.type) ? '?: ' : ': ') +
                                    GQLType2TS(arg.type)
                            )
                            .join(', ') +
                        ' }): ' +
                        GQLType2TS(field.type) +
                        (IsGQLTypeNullable(field.type) ? ' | null' : '') +
                        ',\n'
                } else {
                    ts +=
                        INDENT +
                        field.name +
                        (IsGQLTypeNullable(field.type) ? '?: ' : ': ') +
                        GQLType2TS(field.type) +
                        ',\n'
                }
            }

            if (type.name === schema.queryType.name) {
                ts += '\n'
                ts += INDENT + '/** Check this to determine whether the query is loading */\n'
                ts += INDENT + '_loading?: boolean,\n'
                ts += INDENT + '/** Check this to display error messages */\n'
                ts += INDENT + '_error?: any,\n'
                ts +=
                    INDENT + '/** This field is defined when Autograph is executing a dry run */\n'
                ts += INDENT + '_dry?: boolean,\n'
            }
            ts += '}\n\n'
        } else if (type.kind === 'INTERFACE') {
            if (type.description) ts += '/** ' + type.description + ' */\n'

            ts += 'export interface ' + type.name + ' extends GQLType {\n'

            for (let field of type.fields!) {
                if (field.description) ts += INDENT + '/** ' + field.description + ' */\n'
                if (field.deprecationReason)
                    ts += INDENT + '/** @deprecated ' + field.deprecationReason + ' */\n'
                ts +=
                    INDENT +
                    field.name +
                    (IsGQLTypeNullable(field.type) ? '?: ' : ': ') +
                    GQLType2TS(field.type) +
                    ',\n'
            }

            // This way, for instance if we have Droid, Human implementing Character
            // and a query hero() which returns type Character, we can then call
            // hero.asDroid.primaryFunction and compile that into an inline fragment
            for (let obj of schema.types) {
                if (obj.kind !== 'OBJECT') continue
                if (!obj.interfaces!.some((interf) => interf.name === type.name)) continue
                ts +=
                    INDENT +
                    '/** Use `as' +
                    obj.name +
                    '` to access fields on the underlying concrete type. */\n'
                ts += INDENT + 'as' + obj.name + ': ' + obj.name + '\n'
            }
            ts += '}\n\n'
        } else if (type.kind === 'SCALAR') {
            if (type.name === 'String' || type.name === 'Boolean') continue
            if (type.description) ts += '/** ' + type.description + ' */\n'
            if (type.name! in SCALAR_MAP) {
                ts += 'export type ' + type.name + ' = ' + SCALAR_MAP[type.name!] + '\n\n'
            } else {
                ts += 'export type ' + type.name + ' = any\n\n'
            }
        } else if (type.kind === 'UNION') {
            if (type.description) ts += '/** ' + type.description + ' */\n'
            ts +=
                'export type ' +
                type.name +
                ' = ' +
                type.possibleTypes!.map((type) => GQLType2TS(type)).join(' | ') +
                '\n\n'
        } else if (type.kind === 'ENUM') {
            if (type.description) ts += '/** ' + type.description + ' */\n'
            // TODO: determine whether this is the right way to think about enums
            ts +=
                'export type ' +
                type.name +
                ' = ' +
                type.enumValues!.map((val) => JSON.stringify(val.name)).join(' | ') +
                '\n\n'
        } else if (type.kind === 'INPUT_OBJECT') {
            if (type.description) ts += '/** ' + type.description + ' */\n'

            ts += 'export type ' + type.name + ' = {\n'
            for (let field of type.inputFields!) {
                if (field.description) ts += INDENT + '/** ' + field.description + ' */\n'
                ts +=
                    INDENT +
                    field.name +
                    (IsGQLTypeNullable(field.type) ? '?: ' : ': ') +
                    GQLType2TS(field.type) +
                    ',\n'
            }
            ts += '}\n\n'
        } else {
            throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
        }
    }
    return ts
}

function GQLType2TS(type: GQLTypeRef): string {
    if (type.kind === 'LIST') return GQLType2TS(type.ofType!) + '[]'
    if (type.kind === 'NON_NULL') return GQLType2TS(type.ofType!)
    if (type.name === 'String') return 'string'
    if (type.name === 'Boolean') return 'boolean'
    if (type.kind === 'SCALAR') return type.name!
    if (type.kind === 'UNION') return type.name!
    if (type.kind === 'OBJECT') return type.name!
    if (type.kind === 'INPUT_OBJECT') return type.name!
    if (type.kind === 'ENUM') return type.name!
    if (type.kind === 'INTERFACE') return type.name!
    throw new Error(`Unable to handle type "${type.kind}" named "${type.name}"`)
}

function IsGQLTypeNullable(type: GQLTypeRef): boolean {
    return type.kind !== 'NON_NULL'
}
