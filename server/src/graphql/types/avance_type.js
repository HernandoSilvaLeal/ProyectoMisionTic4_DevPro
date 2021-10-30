const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const UserType = require("./user_type");
const ObservationType = require("./observation_type");

const User = require("../models/user.model");
const Observation = require("../models/observation.model");

const AvanceType = new GraphQLObjectType({
  name: "Avance",
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
        return Observation.find({ avanceId: parent.id });
      },
    },
  }),
});

module.exports = AvanceType;
