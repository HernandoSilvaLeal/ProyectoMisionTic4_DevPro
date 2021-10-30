const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = require("./user_type");
const User = require("../models/user.model");

const ObservationType = new GraphQLObjectType({
  name: "Observation",
  fields: () => ({
    _id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

module.exports = ObservationType;
