const _ = require("lodash");
const { Todo, validate } = require("../models/todo");
const auth = require("../middleware/auth");
const {Favorite} = require("../models/favorite");

const router = require("../router")();
const MAX_RESULTS = 50;
const MAX_QUERY = 255;

router.post("/update/:id",auth,async (req, res) => {
  if (!validate(req.body)) res.badRequest("Invalid request");
  const todoObj = _.pick(req.body, ["title", "description"]);
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, todoObj);
  if (!todo) res.notFound("Todo id doesn't exist");
  res.send();
});

router.post("/add",auth,async (req, res) => {
  if (!validate(req.body)) res.badRequest("Invalid request");
  const todoObj = _.pick(req.body, ["title", "description"]);
  todoObj.user_id = req.user._id;
  const todo = new Todo(todoObj);
  const result = await todo.save();
  res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
  const todo = await Todo.findOneAndRemove({ _id: req.params.id, user_id: req.user._id });
  if (!todo) res.notFound("Todo id doesn't exist");
  res.send();
});

router.get("/mytodos",auth,async (req, res) => {
  const todo = await Todo.find({ user_id: req.user._id });
  res.send(todo);
})

router.post('/search',auth, async (req, res) => {
  const query = req.body.query && req.body.query.slice(0,MAX_QUERY);
  const aggregate = [];
  if (query) {
    aggregate.push({ $match: { $text: { $search: query } } });
    aggregate.push({ $sort: { score: { $meta: 'textScore' } } });
  }
  else aggregate.push( { $match: { _id: { $exists: true }} });
  aggregate.push( { $limit: MAX_RESULTS });
  aggregate.push( {
      $lookup: {
        from: "users",
        "let": { id: "$user_id" },
        pipeline: [
           { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
           { $project: { name: 1, _id: 0 } }
        ],
        as: "user"
      }
  });
  const todos = await Todo.aggregate(aggregate);
  for (const todo of todos) 
    todo.is_in_favorites = (await Favorite.findOne({ todo_id: todo._id, user_id: req.user._id })) ? true : false;
  res.send(todos);
})

router.get('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) return res.notFound.send("Todo id doesn't exist");
    res.send(todo);
  }
  catch (e) { res.badRequest("Invalid id") }
});


module.exports = router;
