const express = require("express");
const {UserModel} = require("../Model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async(req, res)=>{
    const {name, email, pass, age} = req.body;
    try {
      bcrypt.hash(pass, 10, async(err, hash) =>{
         // Store hash in your password DB.
         if(err) res.send("Wrong Credentials");
         else{
            const data = new UserModel({name, email, pass:hash, age});
            await data.save();
            res.send(data);
         }
     });
    } catch (err) {
       res.send(err.message); 
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email,pass} = req.body;
    
    try {
       const data = await UserModel.find({email});
       if(data.length>0){
         bcrypt.compare(pass, data[0].pass, function(err, result) {
            if(result){
               const token = jwt.sign({ userId: req.body._id }, 'masai');
               res.send({"msg":"User has been Logged in", "token":token});
            }
            else{
               res.send("Something went wrong");
            }
        });
        
       }
       else{
        res.send("Wrong Credentials");
       }
    } catch (err) {
       res.send(err.message); 
    }
})


module.exports = {userRouter};