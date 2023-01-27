const User = require("../Models/user.js");
const jwt = require("jsonwebtoken");

const Validemailandusername = async (req, res, next) => {
  const { username, email } = req.body;
  console.log(username, email);
  const checkUsername = User.findOne({ username: username });
  const checkEmail = User.findOne({ email: email });

  Promise.all([checkUsername, checkEmail])
    .then((users) => {
      if (users[0] || users[1]) {
        res
          .status(400)
          .send({ message: "Failed! Username or email is already in use" });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Something went wrong" });
    });
};

const authorization = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send({ message: "Token Not Available" });
  }
  try {
    const data = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    req.username = data.username;
    req.password = data.password;
    return next();
  } catch (error) {
    return res
      .status(403)
      .send({ message: error.message || "Something went Wrong" });
  }
};

module.exports = { Validemailandusername, authorization };
