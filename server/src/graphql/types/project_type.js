const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const UserType = require("./user_type");
const AvanceType = require("./avance_type");
const ProjectStudentType = require("./project_student_type");

const User = require("../models/user.model");
const Avance = require("../models/avance.model");

const { STATUS_ENUM } = require("../Enums/Status.enum");

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
      type: STATUS_ENUM,
    },
    fase: {
      type: GraphQLString,
    },
    lider: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.leader);
      },
    },
    avances: {
      type: new GraphQLList(AvanceType),
      resolve(parent) {
        return Avance.find({ projectId: parent.id });
      },
    },
    students: {
      type: new GraphQLList(ProjectStudentType),
    },
  }),
});

module.exports = ProjectType;
