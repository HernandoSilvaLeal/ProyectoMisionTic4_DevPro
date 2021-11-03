const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = require("./user_type");

const UserTokenType = new GraphQLObjectType({
  name: "UserToken",
  fields: () => ({
    user: {
      type: UserType,
    },
    token: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserTokenType;
