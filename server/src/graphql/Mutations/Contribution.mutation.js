const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const ContributionType = require("../types/contribution_type");
const Contribution = require("../../models/contribution.model");
const { isTokenValid } = require("../../helper/auth");

const addContribution = {
  type: ContributionType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    projectId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(parent, args, context) {
    const user = await isTokenValid(context.token);
    const contribution = new Contribution({
      title: args.title,
      description: args.description,
      userId: user.id,
      projectId: args.projectId,
    });
    return contribution.save();
  },
};

module.exports = { addContribution };
