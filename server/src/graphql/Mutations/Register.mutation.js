const { GraphQLString, GraphQLNonNull } = require("graphql");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const UserTokenType = require("../types/user_token_type");

const { generateToken } = require("../../helper/auth");
const { validateRegisterInput } = require("../../helper/validate");
const { ROLE_ENUM } = require("../Enums/Role.enum");
const { STATE_ENUM } = require("../Enums/State.enum");

const register = {
  type: UserTokenType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    confirmPassword: {
      type: new GraphQLNonNull(GraphQLString),
    },
    identification: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: ROLE_ENUM,
      defaultValue: ROLE_ENUM.getValue("STUDENT").value,
    },
  },
  async resolve(_, args) {
    const userExists = await User.findOne({ email: args.email });

    if (userExists) {
      throw new Error("User already exists");
    }

    const { errors, valid } = validateRegisterInput(args);

    if (!valid) {
      throw new Error(errors);
    }

    const hashPassword = await bcrypt.hash(args.password, 10);

    const user = new User({
      ...args,
      password: hashPassword,
      state: "Pendiente",
    });

    try {
      const res = await user.save();
      const token = generateToken({
        id: res._id,
        name: res.name,
        email: res.email,
        state: res.state,
        role: res.role,
      });

      return {
        user: { ...user._doc, id: user._id },
        token: token,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { register };
