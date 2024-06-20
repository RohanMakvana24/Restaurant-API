const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const authroute = require("./router/authroute")
const userroute = require("./router/userroutes")
const restoroute = require("./router/restuarant")
const foodroutes = require("./router/foodroutes")
const categoriesroute = require("./router/categoriesroute")
const connect = require("./config/database/db_connect")
//database and dotenv configuration
dotenv.config();
connect();
//server setup
const server = express();
const port = process.env.PORT;


//middleware
server.use(express.json())
server.use(cors())

//routes
server.use("/api/v1/auth" , authroute)
server.use("/api/v1/user" , userroute)
server.use("/api/v1/restaurant" , restoroute)
server.use("/api/v1/categories" , categoriesroute)
server.use("/api/v1/food" , foodroutes)



//server Start
server.listen(port , ()=>{
    console.log(`Server is Started on Port ${port}`)
})