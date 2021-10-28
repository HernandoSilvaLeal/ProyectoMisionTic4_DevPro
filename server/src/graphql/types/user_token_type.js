const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const UserTokenType = new GraphQLObjectType({
  name: "UserToken",
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    role: {
      type: GraphQLString,
    },
    estate: {
      type: GraphQLString,
    },
    token: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserTokenType;
