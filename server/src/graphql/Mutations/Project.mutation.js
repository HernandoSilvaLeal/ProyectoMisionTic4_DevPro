const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull } = graphql;

const ProjectType = require("../types/project_type");
const { isTokenValid } = require("../../helper/auth");
const Project = require("../../models/project.model");

const addProject = {
  type: ProjectType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(parent, args, context, info) {
    const user = await isTokenValid(context.token);

    console.log(user);

    const project = new Project({
      title: args.title,
      description: args.description,
      status: args.status,
      userId: user.id,
    });
    return project.save();
  },
};

module.exports = { addProject };
