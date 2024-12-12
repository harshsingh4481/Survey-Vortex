const mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Polling schema

// user schema
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: [127, "max length is 127 characters"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  phone: { type: Number, required: true, max: [9999999999], min: [1000000000] },
  address: String,
  image: { type: String },
  voted: Boolean,

  registration_date: { type: Date, default: Date.now() },
});

// admin schema
var adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: [127, "max length is 127 characters"],
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // otp:{type:String },
  registration_date: { type: Date, default: Date.now() },
});

//candidate schema
var candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: [127, "max length is 127 characters"],
  },
  party: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  count: { type: Number },
  registration_date: { type: Date, default: Date.now() },
});

// contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  query: { type: String, required: true, maxlength: 100 },
});
// // polls schema

const pollingSchema = new mongoose.Schema({
  polling: { type: Boolean, default: true },
  maxCount: { type: Number, default: 0 },
  winner: { type: String, default: "" },

  registration_date: { type: Date, default: Date.now() },
});

//creating a model..............
const user = mongoose.model("testusers", userSchema);
const admin = mongoose.model("testadmin", adminSchema);
const candidate = mongoose.model("testcandidate", candidateSchema);
const contact = mongoose.model("testcontact", contactSchema);
const result = mongoose.model("testpollings", pollingSchema);

module.exports = { user, admin, candidate, contact, result };
