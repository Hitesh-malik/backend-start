const mongoose = require('mongoose');

const UserData = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

module.exports = mongoose.model('UserData', UserData);