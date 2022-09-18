// external imports
const { check, validationResult } = require("express-validator");
const { createError } = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// internal imports
const People = require("../../models/People");

// add new user
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must be alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await People.findOne({ email: value });
        if (user) {
          throw createError("Email already used");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already used");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 characters long and contain lowercase, uppercase, number, symbol"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(path.join(__dirname, `/../public/uploads/avatars/${filename}`)),
        (err) => {
          if (err) console.log(err);
        };
    }

    // response the errors
    res.status(500).json({
      error: mappedErrors,
    });
  }
};

module.exports = { addUserValidators, addUserValidationHandler };
