const mongoose = require("mongoose");
const Genre = require("./genre");
const Author = require("./author");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "book title is required"],
    trim: true,
  },
  isbn13: String,
  genres: Array,
  authors: [String],
  publishedDate: String,
  pageCount: Number,
  averageRating: Number,
  description: String,
  image: String,
  audioUrl: String,
});

// schema.pre("save", async function (next) {
//   this.author = await Author.findById(this.author);
//   const genreArray = this.genres.map(async (el) => await Genre.findById(el));

//   this.genres = await Promise.all(genreArray);
//   next();
// });

const Book = mongoose.model("Book", schema);

module.exports = Book;
