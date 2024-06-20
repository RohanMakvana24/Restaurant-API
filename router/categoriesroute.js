const express = require('express')
const authcheck = require("../middleware/authMiddleware");
const { createcategories, getcategories, delcat, getcatbyid, editcategories } = require('../controller/categoriescontroller');
const categoriesroute = express.Router();


//create a categories
categoriesroute.post("/create" , authcheck , createcategories   )

//get categories
categoriesroute.get("/getcategories" , authcheck  , getcategories)

//delete categories
categoriesroute.delete("/deletecategories/:id" , authcheck , delcat )

//get categories by id
categoriesroute.get("/getcatbyid" , authcheck  , getcatbyid)

//update categories
categoriesroute.put("/updatecategories" , authcheck  , editcategories)



module.exports = categoriesroute