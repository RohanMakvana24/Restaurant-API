const express = require('express')
const authcheck = require("../middleware/authMiddleware");
const { getUser, updateUser, resetPassword } = require('../controller/usercontroller');
const userroute = express.Router();


//get user route
userroute.get("/getUser" , authcheck ,  getUser )

//update user
userroute.put("/updateuser" , authcheck , updateUser)

//reset password
userroute.post("/resetpassword" , authcheck , resetPassword )

module.exports = userroute