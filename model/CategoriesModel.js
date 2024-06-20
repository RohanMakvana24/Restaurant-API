const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status : {
    type : Number,
    enum: [0, 1],
    required: true,
    default : 1

  }

} , {timestamps : true});

const CategoryModel = new mongoose.model("categorieslist" , categorySchema)

module.exports = CategoryModel;

