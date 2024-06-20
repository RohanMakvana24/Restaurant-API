const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        requitred : true
    },
    imageUrl : {
        type : String,
        requitred : true,
        default : "1.png"
    },
    foodTags : {
        type : String,
        required : true
    },
    category : {
        type : String
    },
    code : {
        type : String
    },
    isAvailable : {
        type : String,
        default : true,
    },
    restaurant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Restaurant"
    },
    rating : {
        type : Number,
        default : 5,
        min : 1,
        max : 5
    },
    ratingCount : {
        type : String
    }

} , {timestamps : true})

const FoodsModel = new mongoose.model("Foods" , FoodSchema);

module.exports = FoodsModel