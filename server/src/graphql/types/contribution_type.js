const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const UserType = require("./user_type");
const ObservationType = require("./observation_type");

const User = require("../../models/user.model");
const Observation = require("../../models/observation.model");

const ContributionType = new GraphQLObjectType({
  name: "Contribution",
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
    observation: {
      type: new GraphQLList(ObservationType),
      resolve(parent, args) {
        return Observation.find({ contributionId: parent.id });
      },
    },
  }),
});

module.exports = ContributionType;
