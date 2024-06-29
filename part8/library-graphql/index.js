const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('./config');
const typeDefs = require('./typeDefs');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message);
  });

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

      let author = await Author.exists({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
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
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

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
      return Book.find({ author: author._id }).countDocuments();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
