let mongoose=require("mongoose")
let emailSchema= new mongoose.Schema({
    email : {
        type : String
    }
})

module.exports=mongoose.model("Email",emailSchema)