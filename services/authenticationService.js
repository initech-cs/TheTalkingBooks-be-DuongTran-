const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.generateToken = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "7d",
  });
  console.log(user);
  console.log(user.tokens);
  user.tokens.push(token);
  await user.save();
  return token;
};

exports.loginRequired = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "No token",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decode.id, tokens: token });
    //find user in database through id and token typed from computer
    if (!user) throw new Error("Unauthorized");
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminRequired = async () => {
  const email = res.body.email;
  const user = await User.findOne({ email: email });
  if (user.role != "admin") {
    return res.status(400).json({
      status: "fail",
      message: "not admin",
    });
  }
  next();
};
