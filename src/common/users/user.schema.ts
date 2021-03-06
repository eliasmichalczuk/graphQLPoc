import User from './user.model';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const userTypeDefs = `
 
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String
  }
  input UserFilterInput {
    limit: Int
  }
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }
  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const userResolvers = {
  Query: {
    users: async (_, { filter = {} }) => {
      const users = await User.find({}, null, filter);
      return users.map(user => user.toGraph());
    },
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user.toGraph();
    }
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const user = await User.create(input);
      return user.toGraph();
    },
    editUser: async (_, { id, input }) => {
      const user = await User.findByIdAndUpdate(id, input);
      return user.toGraph();
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndRemove(id);
      return user ? user.toGraph() : null;
    }
  }
};
