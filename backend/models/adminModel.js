const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  devid: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: function () {
      return this.type === "admin";
    },
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const adminModel = mongoose.model("User", adminSchema);

module.exports = adminModel;
