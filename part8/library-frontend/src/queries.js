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
      author
      genres
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
      author
      genres
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
