const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  todo_id: { type: mongoose.Schema.ObjectId, required: true },
  user_id: { type: mongoose.Schema.ObjectId,  required: true }
});  

const Favorite = mongoose.model("Favorite", favoriteSchema)


exports.Favorite = Favorite;


