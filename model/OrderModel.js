const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    foods : [
        {
            type : mongoose.Schema.Types.ObjectId,
             ref : "Foods"
        }
    ],
    payment : {},
    buyer : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Users"
    },
    status : {
        type : String,
        enum : ["preparing" , "prepare" , "on the way" , "delivered"],
        default : "preparing"
    }
} , {timestamps : true})

const OrderModel = new mongoose.model("Orders" , OrderSchema);

module.exports = OrderModel