const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: "String",
    default: "",
  },
  lastname: {
    type: "String",
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
