const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
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
    identification: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserType;
