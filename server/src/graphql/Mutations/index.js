const { GraphQLObjectType } = require("graphql");

const { addProject, toggleProjectStatus } = require("./Project.mutation");
const { addObservation } = require("./Observation.mutation");
const { addAvance } = require("./Avance.mutation");

const { login } = require("./Login.mutation");
const { register } = require("./Register.mutation");

const { updateSelfUser } = require("./User/updateSelf.mutation");
const { updateOtherUser } = require("./User/updateOtherUser.mutation");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject,
    toggleProjectStatus,
    addObservation,
    addAvance,
    login,
    register,
    updateSelfUser,
    updateOtherUser,
  },
});

module.exports = Mutation;
