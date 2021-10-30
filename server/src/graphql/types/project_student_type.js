const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const UserType = require("./user_type");
const User = require("../models/user.model");

const ProjectUserType = new GraphQLObjectType({
  name: "ProjectUserType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    student: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.studentId);
      },
    },
    status: {
      type: GraphQLString,
    },
    activationDate: {
      type: GraphQLString,
    },
    inacivationDate: {
      type: GraphQLString,
    },
  }),
});

module.exports = ProjectUserType;
