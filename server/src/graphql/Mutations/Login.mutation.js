const { GraphQLString, GraphQLNonNull } = require("graphql");
const bcrypt = require("bcrypt");

const UserTokenType = require("../types/user_token_type");
const { generateToken } = require("../../helper/auth");
const User = require("../models/user.model");

const checkUser = async (password, hashed) => {
  const match = await bcrypt.compare(password, hashed);
  if (!match) {
    throw new Error("Password fail");
  }
};

const login = {
  type: UserTokenType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, { email, password }) {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Your data doesn't match our records");
    }

    checkUser(password, user.password);

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      ...user._doc,
      id: user._id,
      token: token,
    };
  },
};

module.exports = { login };
