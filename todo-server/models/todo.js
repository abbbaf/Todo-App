const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
todoSchema.index({ title: 'text', description: 'text' });


const Todo = mongoose.model("Todo", todoSchema);

function validate(todo) {
    const schema = Joi.object({
      title: Joi.string().min(2).max(255).required(),
      description: Joi.string().min(2).max(255).required().email(),
    });
    const result = schema.validate(todo);
    const error = result && result.error.details[0];
    if (error) return { [error.path[0]] : error.message };
    else return null;
}

exports.Todo = Todo;
exports.validate = validate;

