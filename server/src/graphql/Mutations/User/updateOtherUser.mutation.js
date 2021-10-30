const { GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = require("../../types/user_type");
const User = require("../../models/user.model");

const { STATE_ENUM } = require("../../Enums/State.enum");
const { ROLE_ENUM } = require("../../Enums/Role.enum");
const { isTokenValid } = require("../../../helper/auth");

const updateOtherUser = {
  type: UserType,
  args: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    state: {
      type: STATE_ENUM,
      defaultValue: STATE_ENUM.getValue("PENDING").value,
    },
  },
  async resolve(_, args, context) {
    const user = await isTokenValid(context.token);
    if (user.role === ROLE_ENUM.getValue("ADMIN").value) {
      return await User.findByIdAndUpdate(
        args.userId,
        { state: args.state },
        { new: true }
      );
    }

    if (user.role !== ROLE_ENUM.getValue("LEADER").value) {
      if (args.state !== STATE_ENUM.getValue("NOT_APPROVED").value) {
        return await User.findByIdAndUpdate(
          args.userId,
          { state: args.state },
          { new: true }
        );
      }
    }

    throw new Error("You don't have permissions to do this");
  },
};

module.exports = { updateOtherUser };
