const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const UserType = require("./user_type");
const ContributionType = require("./contribution_type");

const User = require("../../models/user.model");
const Contribution = require("../../models/contribution.model");

const ProjectType = new GraphQLObjectType({
  name: "project",
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
    status: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    contributions: {
      type: new GraphQLList(ContributionType),
      resolve(parent, args) {
        return Contribution.find({ projectId: parent.id });
      },
    },
  }),
});

module.exports = ProjectType;
