const { GraphQLString, GraphQLNonNull } = require("graphql");
const bcrypt = require("bcrypt");

const User = require("../../models/user.model");
const UserType = require("../../types/user_type");
const { isTokenValid } = require("../../../helper/auth");
const { validateUpdateSelfUser } = require("../../../helper/validate");

const updateSelfUser = {
  type: UserType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLString,
    },
    confirmPassword: {
      type: GraphQLString,
    },
    identification: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    // TODO: validate password and confirmPassword (done)
    // TODO: find the user to update (done)
    // TODO: validate is the same user updating self (pending)
    // TODO: validate identity (done)
    const userFromToken = await isTokenValid(context.token);

    const { errors, valid } = validateUpdateSelfUser({ ...args });

    if (!valid) {
      throw new Error(JSON.stringify(errors));
    }

    fields = {
      ...args,
    };

    if (args.password) {
      fields = {
        ...args,
        password: await bcrypt.hash(args.password, 10),
      };
    }

    const user = await User.findByIdAndUpdate(
      userFromToken.id,
      { $set: fields },
      {
        new: true,
      }
    );

    return user;
  },
};

module.exports = { updateSelfUser };
