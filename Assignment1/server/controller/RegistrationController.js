// controller/RegistrationController.js

const Registration = require("../model/Registration"); // Assuming you have a Registration model
const Joi = require("joi");
const bcrypt = require("bcrypt");
// Controller function to handle registration
const RegistrationController = async (req, res) => {
  //   console.log(req.body);
  try {
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email, password, and personType already exist in the database
    let existingRegistration = await Registration.findOne({
      email: req.body.email,
      encryptedPassword: req.body.encryptedPassword,
      personType: req.body.personType
    });
    if (existingRegistration) {
      return res
        .status(404)
        .send("Email, password, and personType already exist. Please log in.");
    }
    const hashedPassword = await bcrypt.hash(req.body.encryptedPassword, 10);

    // Create a new registration object
    let registration = new Registration({
      username: req.body.username,
      email: req.body.email,
      encryptedPassword: hashedPassword,
      personType: req.body.personType
    });

    // Save the registration object to the database
    registration = await registration.save();
    res.status(200).send(registration);
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Validate registration data against Joi schema
function validateRegistration(registration) {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    encryptedPassword: Joi.string().required(),
    personType: Joi.string().required()
  });

  return schema.validate(registration);
}

module.exports = { RegistrationController }; // Export as an object with the correct property name
