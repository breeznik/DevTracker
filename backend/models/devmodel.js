const mongoose = require("mongoose");

const devschema = mongoose.Schema({
  adminid: {
    type: String,
  },
  devname: {
    type: String,
  },
  devid: {
    type: String,
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

const DevModel = mongoose.model("dev", devschema);

module.exports = DevModel;
