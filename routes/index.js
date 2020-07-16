const express = require("express");
const router = express.Router();

// All route of User
const userRoutes = require("./api/userApi");
router.use("/users", userRoutes);

// All route of book
const bookRoutes = require("./api/bookApi");
router.use("/books", bookRoutes);

// All route of author
const authorRoutes = require("./api/authorApi");
router.use("/authors", authorRoutes);

// All route of Genre
const genreRoutes = require("./api/genreApi");
router.use("/genres", genreRoutes);

module.exports = router;
