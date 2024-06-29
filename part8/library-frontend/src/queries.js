import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
        born
        id
      }
      genres {
        name
      }
      id
      published
      title
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author {
        name
        born
        id
      }
      genres {
        name
      }
      id
      published
      title
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation changeBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      bookCount
      born
      id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
