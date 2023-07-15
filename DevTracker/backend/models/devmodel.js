const mongoose = require("mongoose");

const devschema = mongoose.Schema({
  adminid: {
    type: String,
    require: true,
  },
  devname: {
    type: String,
    required: true,
  },
  devid: {
    type: String,
    unique: true,
    required: true,
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
