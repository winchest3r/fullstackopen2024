const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const express = require('express');
const cors = require('cors');
const http = require('http');

const mongoose = require('mongoose');
mongoose.set('debug', true);

const jwt = require('jsonwebtoken');

const config = require('./config');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const User = require('./models/user');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  httpServer.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}/`);
  });
};

start();
