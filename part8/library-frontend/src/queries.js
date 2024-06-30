import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    author {
      name
      born
      id
    }
    genres {
      name
    }
    published
    title
  }
`;

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
  query ($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOKS_BY_GENRE = gql`
  query getBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres {
      name
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
