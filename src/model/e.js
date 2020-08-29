let mongoose = require('mongoose')
let validator = require('validator')
let eSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return console.log(value)
    }
  }
})
module.exports = mongoose.model('E', eSchema)