const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");

const router = require("../router")();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res,) => {
  if (validate(req.body)) return;
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.badRequest({ email: "Email is taken" });
  user = new User(
    _.pick(req.body, ["name", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
