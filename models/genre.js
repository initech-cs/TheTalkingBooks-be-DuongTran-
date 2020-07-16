const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genre: {
    type: String,
    required: [true, "genre name is required"],
    trim: true,
    unique: true,
  },
});

genreSchema.statics.generateTags = async function (tags) {
  const ltags = tags.map(e => e.toLowerCase().trim()); // trim and lowerCase all strings
  const tagIDs = ltags.map(async e => {
    let tag = await this.findOne({ genre: e });
    // check if tag exists, return tag document
    if (tag)
      return tag
    // else create a new tag document
    tag = await this.create({ genre: e })
    return tag
  })
  const result = Promise.all(tagIDs) // execute all promises in the array
  return result
}

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
