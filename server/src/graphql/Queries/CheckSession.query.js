const { isTokenValid } = require("../../helper/auth");
const { generateToken } = require("../../helper/auth");
const User = require("../models/user.model");
const UserTokenType = require("../types/user_token_type");

const checkSession = {
  type: UserTokenType,
  async resolve(_, __, context) {
    const args = await isTokenValid(context.token);

    const user = await User.findById(args.id);

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      user: { ...user._doc, id: user._id },
      token: token,
    };
  },
};

module.exports = { checkSession };
