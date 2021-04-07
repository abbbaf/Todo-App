const { Favorite }  = require("../models/favorite");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

const router = require("../router")();

const ObjectId = mongoose.Types.ObjectId;

router.post("/:id",auth,async (req, res) => {
  const id = req.params.id;
  const exist = await Favorite.findOne({ todo_id: id, user_id: req.user._id });
  if (exist) return res.badRequest("Todo is already in favorites");
  obj = {
    todo_id : id,
    user_id: req.user._id
  }
  const favorite = new Favorite(obj);
  await favorite.save();
  res.send();
});

router.delete('/:id', auth, async (req, res) => {
  const todo = await Favorite.findOneAndRemove({ todo_id: req.params.id, user_id: req.user._id });
  if (!todo) res.notFound("Todo id doesn't exist");
  res.send();
});



router.get("/list",auth,async (req, res) => {
  const favorites = await Favorite
                        .aggregate([
                          { 
                            $match: { user_id:  ObjectId(req.user._id) }
                          },
                          {
                            $lookup: {
                              from: "todos",
                              "let": { id: "$todo_id" },
                              pipeline: [
                                 { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                                 { $project: { user_id: 0 } }
                              ],
                              as: "todo"
                            }
                          },
                        ]);
  const todos = favorites.map(favorite => favorite.todo[0]); 
  res.send(todos);
})


module.exports = router;
