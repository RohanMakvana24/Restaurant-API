const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const authcheck = async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        jwt.verify(token , process.env.JWTSECRET , async (err , decode)=>{
            if(err){
                return res.status(401).send({
                    success : false,
                    message : "Unathorized User"
                })
            }
            else{
                req.body.id = decode.id;
                next();

            }
        })

    }catch(error){
      res.status(404).send(error)
    }
}

module.exports = authcheck;