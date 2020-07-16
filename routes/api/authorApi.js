var express = require("express");
var router = express.Router();

const {
  createAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../../controllers/authorController");

router.route("/authors").get(readAuthor).post(createAuthor);

router.route("/authors/:id").delete(deleteAuthor).put(updateAuthor);

module.exports = router;
