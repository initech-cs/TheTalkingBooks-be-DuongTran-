const jwt = require("jsonwebtoken");
const User = require("../models/user")

exports.generateToken = async (user) => {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '7d' });
    console.log(user)
    console.log(user.tokens)
    user.tokens.push(token);
    await user.save();
    return token;
};
