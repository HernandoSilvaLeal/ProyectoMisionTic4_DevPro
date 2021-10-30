const { GraphQLList, GraphQLID } = require("graphql");

const { isTokenValid } = require("../../helper/auth");
const ObservationType = require("../types/observation_type");
const Observation = require("../models/observation.model");

const observations = {
  type: new GraphQLList(ObservationType),
  async resolve(_, __, context) {
    await isTokenValid(context.token);

    return Observation.find({});
  },
};

const observation = {
  type: ObservationType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args, context) {
    await isTokenValid(context.token);

    return Observation.findById(args.id);
  },
};

module.exports = { observation, observations };
