const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:String,
    body:String,
    user:String
})

const NoteModel = mongoose.model("masainote", noteSchema);

module.exports = {NoteModel};