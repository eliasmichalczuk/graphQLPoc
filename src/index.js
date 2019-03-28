import { mongoose } from 'mongoose';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server';

mongoose.connect('mongodb://localhost/graphql-demo', {
  useNewUrlParser: true
});

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs]
});

const server = new ApolloServer({
  schema,
  formatError(error) {
    if (process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('error');
    }
    return error;
  }
});

server.listen().then(({ url }) => {
  console.log('server at ' + url);
});
