const express = require("express");
const {NoteModel} = require("../Model/Note.model");

const noteRouter = express.Router();

noteRouter.get("/", async(req, res) =>{
    try {
        const data = await NoteModel.find();
        res.send(data);
    } catch (err) {
        
    }
})

noteRouter.post("/create", async(req, res) =>{
    try {
        const data = new NoteModel(req.body);
        await data.save();
        res.send("User has been created")
    } catch (err) {
        res.send(err.message);
    }
})

noteRouter.delete("/delete/:id", async(req, res) =>{
    const noteId = req.params.id
    try{
         const data = await NoteModel.findByIdAndDelete({_id:noteId});
         res.send(data);
    }
    catch(err){
        res.send(err.message);
    }
})

module.exports = {noteRouter};