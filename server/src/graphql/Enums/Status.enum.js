const { GraphQLEnumType } = require("graphql");

const STATUS_ENUM = new GraphQLEnumType({
  name: "Status",
  values: {
    ACTIVE: {
      value: "Activo",
    },
    INACTIVE: {
      value: "Inactivo",
    },
  },
});

module.exports = { STATUS_ENUM };
