const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQuery = require("./Queries");
const Mutation = require("./Mutations");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
