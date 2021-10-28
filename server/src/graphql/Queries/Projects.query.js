const graphql = require("graphql");
const { GraphQLList, GraphQLID } = graphql;

const { isTokenValid } = require("../../helper/auth");
const Project = require("../../models/project.model");
const ProjectType = require("../types/project_type");

const projects = {
  type: new GraphQLList(ProjectType),
  async resolve(_, __, context) {
    await isTokenValid(context.token);

    return Project.find({});
  },
};

const project = {
  type: ProjectType,
  args: {
    id: {
      type: GraphQLID,
    },
  },
  async resolve(_, args, context) {
    await isTokenValid(context.token);

    return Project.findById(args.id);
  },
};

module.exports = { project, projects };
