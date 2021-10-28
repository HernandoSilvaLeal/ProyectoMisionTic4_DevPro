const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const User = require("../../models/user.model");
const UserTokenType = require("../types/user_token_type");
const { validateRegisterInput } = require("../../helper/validate");

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
    identification: {
      type: new GraphQLNonNull(GraphQLString),
    },
    role: {
      type: new GraphQLNonNull(GraphQLString),
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
      estate: "Pendiente",
    });

    try {
      const res = await user.save();
      const token = generateToken({
        id: res._id,
        name: res.name,
        email: res.email,
        estate: res.state,
        role: res.role,
      });

      return {
        ...res._doc,
        id: res._id,
        token: token,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { register };
