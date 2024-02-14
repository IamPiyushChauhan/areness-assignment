const Registration = require("../model/Registration");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SinginController = async (req, res) => {
  // Validate request data

  const schema = Joi.object({
    email: Joi.string().email().required(),
    encryptedPassword: Joi.string().required(),
    personType: Joi.string().valid("admin", "user").required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    console.log(req.body);
    // Check if user exists

    const user = await Registration.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "Wrong Details" });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.encryptedPassword,
      user.encryptedPassword
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const tokenName = req.body.personType === "admin" ? "admin" : "user";

    // Create JWT payload
    const payload = {
      name: user.username,
      role: user.personType,
      tokenName: tokenName
    };
    const expiresIn = req.body.personType === "admin" ? "30d" : "1d";

    // // Sign JWT token
    const token = jwt.sign(payload, "procesJWT_SECRET", { expiresIn });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { SinginController };
