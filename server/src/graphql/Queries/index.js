const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { user, users } = require("./Users.query");
const { project, projects } = require("./Projects.query");
const { contribution, contributions } = require("./Contributions.query");
const { observation, observations } = require("./Observations.query");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users,
    user,
    project,
    projects,
    contribution,
    contributions,
    observation,
    observations,
  },
});

module.exports = RootQuery;
