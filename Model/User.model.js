const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const UserModel = mongoose.model("masaiuser", userSchema);

module.exports = {UserModel};