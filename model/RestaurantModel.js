const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true }
});

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  website: { type: String, required: false },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  cuisine: { type: [String], required: true },
  menu: [menuItemSchema],
  hours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  reviews: [reviewSchema],
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  delivery: { type: Boolean, default: false },
  takeout: { type: Boolean, default: false },
  reservations: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const RestaurantModel =  new mongoose.model('Restaurant', restaurantSchema);

module.exports = RestaurantModel;
