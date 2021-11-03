const { GraphQLObjectType } = require("graphql");

const { user, users } = require("./Users.query");
const { project, projects } = require("./Projects.query");
const { avance, avances } = require("./Avances.query");
const { observation, observations } = require("./Observations.query");
const { checkSession } = require("./CheckSession.query");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users,
    user,
    project,
    projects,
    avance,
    avances,
    observation,
    observations,
    checkSession,
  },
});

module.exports = RootQuery;
