import { parse } from 'graphql'
import { graphql, buildASTSchema } from 'graphql'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { succinctIntrospectionQuery, GQLSchema } from '../src/schema';

export async function parseGraphQL(schemaSource: string): Promise<GQLSchema> {
    let doc = buildASTSchema(parse(schemaSource), {
        commentDescriptions: true
    })
    let data = await graphql(doc, succinctIntrospectionQuery) as any;
    return data.data.__schema;
}

export async function runGraphQL(schemaSource: string, query: string, resolvers = {}): Promise<{ errors?: any[], data?: any }> {

    const schema = makeExecutableSchema({ 
        typeDefs: schemaSource,
        // resolverValidationOptions: {
        //     requireResolversForResolveType: false
        //   },

        resolvers: resolvers,
        inheritResolversFromInterfaces: true,
        // typeResolvers: typeResolvers

    });

    // addResolveFunctionsToSchema({ 
    //     schema, 
    //     resolvers,
    //     inheritResolversFromInterfaces: true
    // })

    addMockFunctionsToSchema({ schema, preserveResolvers: true });
    return await graphql(schema, query) as any

    // if(result.errors) throw result.errors[0];

    // return result.data
}