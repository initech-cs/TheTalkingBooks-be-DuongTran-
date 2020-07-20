var express = require("express");
var router = express.Router();
const { createBook, readBook } = require("../../controllers/bookControllers");

const {
  loginRequired,
  adminRequired,
} = require("./../../services/authenticationService");

/* GET books. */
router.get("/", readBook);

/* POST Create new books. */
// router.post("/", createBook);
router.route("/books").post(loginRequired, adminRequired, createBook);
module.exports = router;
