const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainGoal: { type: String, required: true },
  generalGoal: { type: String, required: true },
  budget: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, required: true },
  students: {
    student: { type: mongoose.Schema.Types.ObjectId, required: false },
    status: { type: String, required: false },
    activationDate: { type: Date, required: false },
    inacivationDate: { type: Date, required: false },
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
