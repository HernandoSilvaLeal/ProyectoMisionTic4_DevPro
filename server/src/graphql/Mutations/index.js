const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { addProject } = require("./Project.mutation");
const { addObservation } = require("./Observation.mutation");
const { addContribution } = require("./Contribution.mutation");

const { login } = require("./Login.mutation");
const { register } = require("./Register.mutation");

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject,
    addObservation,
    addContribution,
    login,
    register,
  },
});

module.exports = Mutation;
