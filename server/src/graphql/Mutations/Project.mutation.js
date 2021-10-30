const { GraphQLString, GraphQLNonNull } = require("graphql");

const ProjectType = require("../types/project_type");
const { isTokenValid } = require("../../helper/auth");
const Project = require("../models/project.model");

const addProject = {
  type: ProjectType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    const user = await isTokenValid(context.token);

    const project = new Project({
      title: args.title,
      description: args.description,
      status: "",
      leader: user.id,
    });

    return project.save();
  },
};

module.exports = { addProject };
