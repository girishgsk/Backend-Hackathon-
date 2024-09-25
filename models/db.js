const mongoose = require("mongoose");
const { type } = require("os");
const validator = require("validator");

//-------mongoose schema --------------

const digitalusersSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ---- creating model ---------

const member = new mongoose.model("member", digitalusersSchema);

const postschema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email is already in use"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid opreation");
      }
    },
  },
  mobileNo: {
    type: String,
    unique: [true, "Mobile number already exist"],
  },
  role: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

//--------model for posts / lists ----------

const postModel = new mongoose.model("postModel", postschema);

module.exports = { member, postModel };
