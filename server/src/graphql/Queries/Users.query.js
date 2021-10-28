const graphql = require("graphql");
const { GraphQLList, GraphQLID } = graphql;

const { isTokenValid } = require("../../helper/auth");
const User = require("../../models/user.model");
const UserType = require("../types/user_type");

const users = {
  type: new GraphQLList(UserType),
  async resolve(_, __, context) {
    console.log("Hola Mundo");
    await isTokenValid(context.token);

    return User.find({});
  },
};

const user = {
  type: UserType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(_, args, context) {
    await isTokenValid(context.token);

    return User.findById(args.id);
  },
};

module.exports = { user, users };
