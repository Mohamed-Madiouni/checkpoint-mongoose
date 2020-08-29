let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    user : String
})

module.exports= mongoose.model("user",userSchema)