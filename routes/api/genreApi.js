var express = require("express");
var router = express.Router();
const {
  createGenre,
  readGenres,
} = require("../../controllers/genreControllers");

/* GET books. */
router.get("/", readGenres);

/* POST Create new books. */
router.post("/", createGenre);

module.exports = router;
