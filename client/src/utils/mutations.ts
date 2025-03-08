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

export const ADD_BOOK = gql`
  mutation addBook(
    $bookId: String!
    $authors: [String]
    $description: String
    $title: String!
    $image: String
    $link: String
  ) {
    addBook(
      bookId: $bookId
      authors: $authors
      description: $description
      title: $title
      image: $image
      link: $link
    ) {
      _id
      username
      savedBooks {
        bookId
        title
        authors
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
        bookId
        title
        }
    }
}
`;