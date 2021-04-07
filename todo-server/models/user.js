const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
    const schema = Joi.object({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required(),
    });
    const result = schema.validate(user);
    const error = result.error && result.error.details[0];
    if (error) return { [error.path[0]] : error.message };
    else return null;
}

exports.User = User;
exports.validate = validate;
