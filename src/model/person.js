let mongoose = require("mongoose");

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model("person", personSchema);
