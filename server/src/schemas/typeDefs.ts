const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
}

type Book {
    _id: ID
    title: String
    authors: [String]!
    description: String
    image: String
    link: String
}

input UserInput {
    username: String!
    email: String!
    password: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    user(username: String!): User
    me: User
}

type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBook(userId: ID!, title: String!, authors: [String]!, description: String!, image: String!, link: String!): User
    removeBook(userId: ID!, bookId: ID!): User
}
`;

export default typeDefs;