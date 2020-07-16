const mongoose = require("mongoose");

//create Schema
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
});

//create model
const Author = mongoose.model("Author", authorSchema);

//export model
module.exports = Author;
