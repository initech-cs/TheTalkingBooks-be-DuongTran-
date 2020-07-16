var express = require("express");
var router = express.Router();
const { getUserList, createUser } = require("../../controllers/userControllers")

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.route("/users")
  .get(getUserList)
  .post(createUser)

//router.route("/login/Facebook").post(loginWithFacebook);

module.exports = router;
