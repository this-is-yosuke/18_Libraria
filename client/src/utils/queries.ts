import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            bookCount
            savedBooks {
            _id
            title
            authors
            description
            image
            link
            }
        }
    }`;

    export const QUEY_ME = gql`
        query me {
            me {
                _id
                username
                email
                bookCount
                savedBooks {
                    _id
                    title
                    authors
                    description
                    image
                    link
                }
            }
        }
    `;

