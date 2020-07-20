const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const round = 10;
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    tokens: [String],
    role: {
      type: String,
      enum: ["host", "normal"],
      default: "normal",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// const obj =  new Person({name: "Khoa", age: 32})
// obj => { name: "Khoa", age: 32} =>> instance of Person class
// Person.loginWithEmail()

// const user = new User({name: "Khoa", age: 32})
// user.toJSON()

schema.methods.toJSON = function () {
  // inside methods, `this` will refer to the instance
  const obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  delete obj.id;
  return obj;
};

// generate TOken
schema.methods.generateToken = async function () {
  // this will refer to the instance of User
  // { _id: something, name: "khoa", email:"khoa@coderschool.vn"}
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  this.tokens.push(token);
  await this.save();
  return token;
};

// User.loginWithEmail()
schema.statics.loginWithEmail = async function (email, password) {
  // inside statics, `this` will refer to the class User
  // find user from database using email
  const user = await this.findOne({ email: email });
  if (!user) {
    return null;
  }
  // compare raw password with hashed Password
  const match = await bcrypt.compare(password, user.password); // match is a boolean
  // if  true return user
  if (match) {
    return user;
  }
  return null;
  // else return null
};

// user.save()
schema.pre("save", async function (next) {
  // this = the instance of User model
  // console.log(this)
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, round);

  next();
});

// =>> [pre, pre pre, save, post, post post post]

module.exports = mongoose.model("User", schema);
