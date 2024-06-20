const mongoose = require("mongoose")

const connect =  async (req,res)=>{
    try{
         await mongoose.connect("mongodb+srv://rohanmakvana10:2421@cluster0.dttnrs1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
         console.log("DataBase Is Connected ")
    }catch(error){
        console.log(error)
    }
}

module.exports = connect;