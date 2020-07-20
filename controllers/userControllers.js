const User = require("./../models/user");
const { generateToken } = require("./../services/authenticationService");

exports.getUserList = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({
    status: "ok",
    data: users,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing info",
    });
  }
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    role,
  });

  //const token = await generateToken(newUser);
  res.status(201).json({
    status: "ok",
    data: newUser,
  });
};
exports.getMe = (req, res) => {
  return res.json(req.user);
};

exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      status: "fail",
      message: "Missing info",
    });
  }

  const newUser = await User.find({});
};

exports.logInWithFacebook = async (request, response) => {
  try {
    const { fbToken } = request.body;
    if (!fbToken) throw new Error("Token is missing");
    const data = await axios.get(
      `https://graph.facebook.com/v7.0/me?fields=id%2Cname%2Cemail&access_token=${fbToken}`
    );
    const info = data.data;
    const words = info.name.split(" ");
    let user = await User.findOne({ email: info.email });
    if (!user)
      user = await User.create({
        email: info.email,
        firstName: words.pop(),
        lastName: words.join(" "),
      });
    const token = await generateToken(user);
    response.status(200).json({
      status: "Success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("email and password is required");
    const user = await User.loginWithEmail(email, password);

    const token = await generateToken(user);
    console.log(user);

    return res.status(200).json({
      status: "success",
      message: "password is right",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  const token = res.body.tokens;
  if (!token) {
    return res.status(400).json({
      message: error.message,
    });
  }

  const user = await User.findOne({ tokens: token });
  if (user) {
    user.tokens = user.tokens.filter((token) => token != token);
    await user.save();
  }

  res.status(200).json({});
};
