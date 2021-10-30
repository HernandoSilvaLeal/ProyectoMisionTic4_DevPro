const { GraphQLEnumType } = require("graphql");

const ROLE_ENUM = new GraphQLEnumType({
  name: "Roles",
  values: {
    LEADER: {
      value: "Líder",
    },
    ADMIN: {
      value: "Administrador",
    },
    STUDENT: {
      value: "Estudiante",
    },
  },
});

module.exports = { ROLE_ENUM };
