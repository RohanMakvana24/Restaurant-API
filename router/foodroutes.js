const express = require('express')
const authcheck = require("../middleware/authMiddleware");
const { createfoods, getFoods, deletefood, editFood, placeorder } = require('../controller/foodcontroller');
const foodroutes = express.Router();


//create a categories
foodroutes.post("/create" , authcheck ,  createfoods  )

//get categories
foodroutes.get("/getfoods" , authcheck  , getFoods)

//delete foods
foodroutes.delete("/deletefood/:id" , authcheck , deletefood )

//update categories
foodroutes.put("/updatefoods" , authcheck  , editFood)

//order place
foodroutes.post("/placeorder" , authcheck , placeorder)

module.exports = foodroutes