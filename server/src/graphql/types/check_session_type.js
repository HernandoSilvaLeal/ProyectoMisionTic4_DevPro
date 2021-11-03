const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const CheckSessionType = new GraphQLObjectType({
  name: "CheckSession",
  fields: () => ({
    isValid: {
      type: ,
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
