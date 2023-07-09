const mongoose = require("mongoose");

const devschema = mongoose.Schema({
  adminid: {
    type: String,
    unique: true,
  },
  devname: {
    type: String,
  },
  devid: {
    type: String,
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
