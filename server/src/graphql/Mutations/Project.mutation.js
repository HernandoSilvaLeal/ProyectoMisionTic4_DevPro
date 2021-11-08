const { GraphQLString, GraphQLNonNull } = require("graphql");

const ProjectType = require("../types/project_type");
const { isTokenValid } = require("../../helper/auth");
const Project = require("../models/project.model");

const { STATUS_ENUM } = require("../Enums/Status.enum");
const { ROLE_ENUM } = require("../Enums/Role.enum");

const addProject = {
  type: ProjectType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mainGoal: {
      type: new GraphQLNonNull(GraphQLString),
    },
    generalGoal: {
      type: new GraphQLNonNull(GraphQLString),
    },
    budget: {
      type: new GraphQLNonNull(GraphQLString),
    },
    startDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    endDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_, args, context) {
    const user = await isTokenValid(context.token);

    if (user.role !== ROLE_ENUM.getValue("LEADER").value)
      throw new Error("No tienes permisos para crear Proyectos");

    const project = new Project({
      ...args,
      status: STATUS_ENUM.getValue("INACTIVE").value,
      leader: user.id,
    });

    return project.save();
  },
};

const projectJoinStudent = {
  type: ProjectType,
  args: {
    projectId: {
      type: GraphQLString,
    },
  },
  resolve(parent) {},
};

const toggleProjectStatus = {
  type: ProjectType,
  args: {
    projectId: {
      type: GraphQLString,
    },
  },
  async resolve(_, args, context) {
    const user = await isTokenValid(context.token);
    try {
      if (user.role !== ROLE_ENUM.getValue("ADMIN").value) {
        throw new Error("No tienes permisos para editar un estado");
      }
      const project = await Project.findByIdAndUpdate(args.projectId);

      project.status =
        project.status === STATUS_ENUM.getValue("ACTIVE").value
          ? STATUS_ENUM.getValue("INACTIVE").value
          : STATUS_ENUM.getValue("ACTIVE").value;

      console.log(project);
      return project.save();
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = { addProject, toggleProjectStatus };
