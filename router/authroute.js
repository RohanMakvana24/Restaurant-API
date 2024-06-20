const express = require('express');
const { ragister, login, ForgotPassword } = require('../controller/authcontroller');
const authcheck = require("../middleware/authMiddleware");

const authroute = express.Router();

authroute.post('/ragister' , ragister);  //ragister
authroute.post('/login' , login);  //login

//forgot password
authroute.post("/forgotpassword" , ForgotPassword)

//test routes
authroute.get("/test" , authcheck , (req,res)=>{
   res.send("Ok")
   console.log(req.user)
});


module.exports = authroute