const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ 
    typeDefs,
    playground: { version: '1.7.25' } 
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});