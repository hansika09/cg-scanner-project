const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Queued', 'In Progress', 'Success', 'Failed'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    // required: true,
  },
  rule: {
    type: String,
    // required: true,
  },
  path: {
    type: String,
    // required: true,
  },
  pos: {
    type: Number,
    // required: false,
  },
  desc: {
    type: String,
    // required: true,
  },
  severity: {
    type: String,
    // required: true,
  },
  queued: {
    type: String,
    required: true,
  },
  scanning: {
    type: String,
  },
  finished: {
    type: String,
  },
});

const result = new mongoose.model("scanners", resultSchema);
module.exports = result;