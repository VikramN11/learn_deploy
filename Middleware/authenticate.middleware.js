
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, 'masai', (err, decoded)=>{
        if(decoded){
            req.body.user=decoded.userId;
            next();
        }
        else{
            res.send("Please login")
        }
      });
}

module.exports = {authentication};