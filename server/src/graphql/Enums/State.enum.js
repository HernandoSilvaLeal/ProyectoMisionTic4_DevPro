const { GraphQLEnumType } = require("graphql");

const STATE_ENUM = new GraphQLEnumType({
  name: "States",
  values: {
    PENDING: {
      value: "Pendiente",
    },
    APPROVED: {
      value: "Aprovado",
    },
    NOT_APPROVED: {
      value: "No Aprovado",
    },
  },
});

module.exports = { STATE_ENUM };
