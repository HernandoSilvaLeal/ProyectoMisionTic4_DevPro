const graphql = require("graphql");
const { GraphQLList, GraphQLID } = graphql;

const { isTokenValid } = require("../../helper/auth");
const Contribution = require("../../models/contribution.model");
const ContributionType = require("../types/contribution_type");

const contributions = {
  type: new GraphQLList(ContributionType),
  async resolve(_, __, context) {
    await isTokenValid(context.token);

    return Contribution.find({});
  },
};

const contribution = {
  type: ContributionType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args, context) {
    await isTokenValid(context.token);

    return Contribution.findById(args.id);
  },
};

module.exports = { contribution, contributions };
