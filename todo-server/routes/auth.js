const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = require("../router")();


router.post("/", async (req, res, next) => {
  let user;
  const { email, password } = req.body;
  const success = !validate(req.body).error 
                 && (user = await User.findOne({ email }))
                 && await bcrypt.compare(password, user.password);

  if (!success) res.badRequest({ email: "Invalid email or password" });
  else res.json({ token: user.generateAuthToken() });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
