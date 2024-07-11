const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lc_handle: {
    type: String,
  },
  cf_handle: {
    type: String,
  },
  submission_date: {
    type: Array,
    default: [],
  },
  last_lc_updated: {
    date: {
      type: String,
    },
    count: {
      type: String,
    },
  },
  last_cf_updated: {
    date: {
      type: String,
    },
    count: {
      type: String,
    },
  },
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
