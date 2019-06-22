import { AutographConfig, GQLSchema, runGQL, introspectionQuery, getQueryRoot, GenericObject, GQLOperationTypes } from "./schema";
import { makeAccessLogger } from "./logger";
import { accessLogToGraphQL } from "./generator";
import { makeRetriever } from "./retriever";
import { traverseTree } from "./traverse";

// This function fetches the schema from the given graphql endpoint,
// passes a synthetic access logger do a single dry run with the render
// function, generates the corresponding graphql query, executes the
// query and returns the results as plain JSON. 

// This function is useful for server side rendering (SSR) applications
// which may require a pure JSON-serializable response. 


export async function loadGQLSchema(config: AutographConfig): Promise<GQLSchema> {
    return (await runGQL(config, introspectionQuery)).data.__schema
}

export async function getDataFromTree<QueryType, Result>(
    config: AutographConfig, 
    operationType: GQLOperationTypes, 
    render: ((query: QueryType) => Result)
): Promise<GenericObject> {
    let schema = await loadGQLSchema(config)
    let accessLog = {}
    traverseTree(render(makeAccessLogger(schema, getQueryRoot(schema, operationType), accessLog) as QueryType))
    let gql = accessLogToGraphQL(accessLog, { operationType: operationType })
    return (await runGQL(config, gql)).data
}

export function CreateMutation<MutationType>(config: AutographConfig) {
    return async function Mutation<Result>(render: ((mutation: MutationType) => Result)): Promise<Result> {
        return render(makeRetriever(await getDataFromTree(config, 'mutation', render)))
    }
}

export function CreateQuery<QueryType>(config: AutographConfig) {
    return async function Query<Result>(render: ((query: QueryType) => Result)): Promise<Result> {
        return render(makeRetriever(await getDataFromTree(config, 'query', render)))
    }
}

// export var globalURL: GQLEndpoint;

// export function configureGlobal(config: GQLEndpoint) {
//     globalURL = config
// }