const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { STATE_ENUM } = require("../Enums/State.enum");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true, enum: STATE_ENUM },
  identification: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
