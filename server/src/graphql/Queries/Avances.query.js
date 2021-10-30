const { GraphQLList, GraphQLID } = require("graphql");

const { isTokenValid } = require("../../helper/auth");
const Avance = require("../models/avance.model");
const AvanceType = require("../types/avance_type");

const avances = {
  type: new GraphQLList(AvanceType),
  async resolve(_, __, context) {
    await isTokenValid(context.token);

    return Avance.find({});
  },
};

const avance = {
  type: AvanceType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(parent, args, context) {
    await isTokenValid(context.token);

    return Avance.findById(args.id);
  },
};

module.exports = { avance, avances };
