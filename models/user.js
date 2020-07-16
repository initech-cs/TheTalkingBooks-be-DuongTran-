const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    }

});

//create model
const User = mongoose.model("User", userSchema);

//export model
module.exports = User;