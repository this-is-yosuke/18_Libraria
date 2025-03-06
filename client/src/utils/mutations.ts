import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            _id
            username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
        user {
            username
            _id
        }
        token
    }
}
`;

export const ADD_Book = gql`
    mutation addBook($userId: ID!, $title: String!, $authors: [String]!, $description: String!, $image: String!, $link: String!) {
        addBook(userId: $userID, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
            _id
            username
            bookCount
            savedBooks {
                title
                authors
                description
            }
        }
    }
`;