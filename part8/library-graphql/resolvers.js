const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const config = require('./config');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        const author = await Author.exists({ name: args.author });
        if (author) {
          filter = { author: author._id };
        }
      }

      if (args.genre) {
        filter = {
          ...filter,
          genres: {
            $elemMatch: {
              name: args.genre,
            },
          },
        };
      }

      return Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const books = await Book.find({});

      const genres = [
        ...new Set(
          books
            .map((b) => b.genres)
            .flat()
            .map((g) => g.name)
        ),
      ];

      return genres.map((g) => {
        return {
          name: g,
        };
      });
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author, books: [] });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const book = new Book({
        ...args,
        genres: args.genres.map((g) => {
          return { name: g };
        }),
        author,
      });

      try {
        await book.save();
        const updatedAuthor = {
          name: author.name,
          born: author.born,
          books: author.books.concat(book._id),
        };
        await Author.findByIdAndUpdate(author._id, updatedAuthor);
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      const authorToUpdate = {
        name: args.name,
        born: args.setBornTo,
        books: author.books,
      };

      const updatedAuthor = await Author.findByIdAndUpdate(
        author._id,
        authorToUpdate,
        {
          new: true,
        }
      );

      try {
        await updatedAuthor.save();
      } catch (error) {
        throw new GraphQLError("Can't update author", {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });

      return author.books.length;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
