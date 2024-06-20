const mongoose = require("mongoose")

const useShema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true

    },
    address : {
         type : String ,
         required : true
    },
    answer : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        default : 0
    }
})

const UserModel = new mongoose.model("Users" , useShema);

module.exports = UserModel