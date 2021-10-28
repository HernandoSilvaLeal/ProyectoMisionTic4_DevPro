const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estate: { type: String, required: true },
  identification: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
