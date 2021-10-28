const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString } = graphql;

const { isTokenValid } = require("../../helper/auth");

const ObservationType = require("../types/observation_type");
const Observation = require("../../models/observation.model");

const addObservation = {
  type: ObservationType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    contributionId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    const user = await isTokenValid(context.token);
    const observation = new Observation({
      ...args,
      userId: user.id,
    });

    return observation.save();
  },
};

module.exports = { addObservation };
