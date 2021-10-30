const { GraphQLString, GraphQLNonNull } = require("graphql");

const AvanceType = require("../types/avance_type");
const Avance = require("../models/avance.model");
const { isTokenValid } = require("../../helper/auth");

const addAvance = {
  type: AvanceType,
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
    const avance = new Avance({
      title: args.title,
      description: args.description,
      userId: user.id,
      projectId: args.projectId,
    });
    return avance.save();
  },
};

module.exports = { addAvance };
