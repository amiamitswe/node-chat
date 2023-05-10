// internal imports
const User = require("../models/People");

// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function getLogin(req, res, next) {
  res.render("index");
}

async function doLogin(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWE_EXPIRES_IN,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWE_EXPIRES_IN,
          httpOnly: true,
          singed: true,
        });

        // set logged in user info on local
        res.locals.loggedInUser = userObject;

        // render inbox
        res.render("inbox");
      } else {
        throw createError("Login failed, please try again 1");
      }
    } else {
      throw createError("Login failed, please try again 2");
    }
  } catch (error) {
    res.render("index", {
      data: { username: req.body.username },
      errors: { common: { msg: error.message } },
    });
  }
}

module.exports = { getLogin, doLogin };
