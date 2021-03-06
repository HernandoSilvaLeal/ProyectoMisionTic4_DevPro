const { GraphQLObjectType, GraphQLString } = require("graphql");

const { ROLE_ENUM } = require("../Enums/Role.enum");
const { STATE_ENUM } = require("../Enums/State.enum");

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
      type: ROLE_ENUM,
    },
    state: {
      type: STATE_ENUM,
    },
    identification: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserType;
