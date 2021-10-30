const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainGoal: { type: String, required: true },
  generalGoal: { type: String, required: true },
  budget: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, required: true },
  students: {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
    activationDate: { type: Date, required: true },
    inacivationDate: { type: Date, required: false },
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
