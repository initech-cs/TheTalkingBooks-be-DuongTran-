var express = require("express");
var router = express.Router();
const { createBook, readBook } = require("../../controllers/bookControllers");

/* GET books. */
router.get("/", readBook);

/* POST Create new books. */
router.post("/", createBook);

module.exports = router;
