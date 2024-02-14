const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const registrationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        Joi.string().email().validate(value).error === undefined,
      message: "Invalid email format"
    }
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  personType: {
    type: String,
    required: true,
    validate: {
      validator: (value) => Joi.string().validate(value).error === undefined,
      message: "Invalid personType, must be a string"
    }
  }
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
