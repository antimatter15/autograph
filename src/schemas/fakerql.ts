export const url = "https://fakerql.com/graphql"

export type Query = {
    me?: User

    allUsers(args: { count?: number }): User[] | null

    User(args: { id: string }): User | null

    allProducts(args: { count?: number }): Product[] | null

    Product(args: { id: string }): Product | null

    Todo(args: { id: string }): Todo | null

    allTodos(args: { count?: number }): Todo[] | null

    Post(args: { id: string }): Post | null

    allPosts(args: { count?: number }): Post[] | null

}

export type User = {
    id: string

    firstName: string

    lastName: string

    email: string

    avatar?: string

}

export type Product = {
    id: string

    price: string

    name: string

}

export type Todo = {
    id: string

    title: string

    completed: boolean

}

export type Post = {
    id: string

    title: string

    body: string

    published: boolean

    createdAt: string

    author: User

}

export type Mutation = {
    register(args: { email: string, password: string, expiresIn?: string }): AuthPayload | null

    login(args: { email: string, password: string, expiresIn?: string }): AuthPayload | null

    updateUser(args: { id: string, email?: string, firstName?: string, lastName?: string }): User | null

    createTodo(args: { title: string, completed?: boolean }): Todo | null

}

export type AuthPayload = {
    token: string

}

export type Subscription = {
    todoAdded?: Todo

}