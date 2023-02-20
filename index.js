const express = require("express");
const { connection } = require("./db");
const {userRouter} = require("./Route/User.route");
const {noteRouter} = require("./Route/Note.route");
const {authentication} = require("./Middleware/authenticate.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Home Page");
})

app.use("/user", userRouter);
app.use(authentication);
app.use("/note", noteRouter);

app.listen(process.env.port, async() =>{
    try {
       await connection;
    } 
    catch(err){
        console.log(err);
    }
    console.log(`Server is running on Port ${process.env.port}`);
});