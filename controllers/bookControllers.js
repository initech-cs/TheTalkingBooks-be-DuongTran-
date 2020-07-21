const Book = require("../models/book");
const Genre = require("../models/genre");
const Author = require("../models/author");

exports.createBook = async function (req, res) {
  const {
    title,
    genres,
    authors,
    publishedDate,
    description,
    pageCount,
    isbn13,
    image,
    averageRating,
  } = req.body;
  // console.log("ok");
  const genreArray = await Genre.generateTags(genres);

  const book = new Book({
    isbn13,
    title: title,
    genres: genreArray,
    authors: authors,
    publishedDate: publishedDate,
    pageCount,
    description: description,
    image: image,
    averageRating: averageRating,
  });
  await book.save();
  return res.json({ status: "ok", data: book });
};

exports.readBook = async (req, res) => {
  const books = await Book.find();
  return res.status(200).json({
    status: "ok",
    data: books,
  });
};

exports.readSingleBook = async (req, res) => {
  const book = await Book.findById(req.params.idbook);
  return res.status(200).json({
    status: "ok",
    data: book,
  });
};

exports.updateBook = async (req, res) => {
  const idbook = req.params.idbook;
  const book = await Book.findById({ _id: idbook });
  const newAudioUrl = req.body.audioUrl;
  if (newAudioUrl) {
    book.audioUrl = newAudioUrl;
  }
  await book.save();
  return res.status(200).json({
    status: "ok",
    data: book,
  });
};
