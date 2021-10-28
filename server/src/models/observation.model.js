const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const observationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  contributionId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Observation = mongoose.model("Observation", observationSchema);

module.exports = Observation;
