const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const UserType = require("./user_type");
const AvanceType = require("./avance_type");

const User = require("../models/user.model");
const Avance = require("../models/avance.model");

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
    mainGoal: {
      type: GraphQLString,
    },
    generalGoal: {
      type: GraphQLString,
    },
    budget: {
      type: GraphQLString,
    },
    startDate: {
      type: GraphQLString,
    },
    endDate: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    fase: {
      type: GraphQLString,
    },
    lider: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
    avances: {
      type: new GraphQLList(AvanceType),
      resolve(parent, args) {
        return Avance.find({ projectId: parent.id });
      },
    },
    students: {
      userId: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return User.findById(parent.student.userId);
        },
      },
      // status: { type: String, required: true },
      // activationDate: { type: Date, required: true },
      // inacivationDate: { type: Date, required: false },
    },
  }),
});

module.exports = ProjactType;
