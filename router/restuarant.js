const express = require("express");
const authcheck = require("../middleware/authMiddleware");
const { create, getrestaurant, deleteresto, getrestobyid, editrestuarant } = require("../controller/restocontroller");
const restoroute = express.Router();

//create
restoroute.post("/create" , authcheck , create );

//get restuarant
restoroute.get("/getrestaurant" , authcheck , getrestaurant)

//delete restaurant
restoroute.delete("/deleterestuarant/:id" , authcheck ,  deleteresto )

//get Restaurant by id
restoroute.get("/getrestaurantbyid" , authcheck , getrestobyid )

//edit restaurant
restoroute.put("/editrestuarant" , authcheck , editrestuarant )



module.exports = restoroute;