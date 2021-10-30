const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avanceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const Avance = mongoose.model("Avance", avanceSchema);

module.exports = Avance;
