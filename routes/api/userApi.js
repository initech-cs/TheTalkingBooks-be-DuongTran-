var express = require("express");
var router = express.Router();
const {
  getUserList,
  createUser,
  updateUser,
  login,
  getMe,
} = require("../../controllers/userControllers");
const { loginRequired } = require("../../services/authenticationService");
/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.route("/users").get(getUserList).post(createUser);

router.post("/me", loginRequired, getMe);
router.route("/users/:id").put(updateUser);
router.route("/login").post(login);

//router.route("/login/Facebook").post(loginWithFacebook);

module.exports = router;
