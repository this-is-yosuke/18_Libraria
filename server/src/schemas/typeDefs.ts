const typeDefs = `
type User {
    id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Number
}

type Book {
    id: ID
    title: String
    authors: String[]
    description: String
    image: String
    link: String
}

input UserInput {
    username: String!
    email: String!
    password: String!
}

input BookInput {
    title: String!
    authors: String[]!
    description: String!
    image: String!
    link: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(username: String!): User
    books: [Book]!
    book(bookId: ID!): Book
    me: User
}

type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: ID!, title: String!, authors: String[]!, description: String!, image: String!, link: String!): User
    removeBookuser(bookId: ID!): User
}
`;

export default typeDefs;