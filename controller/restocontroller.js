const RestaurantModel = require("../model/RestaurantModel");

const create = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      website,
      rating,
      cuisine,
      menu,
      hours,
      reviews,
      location,
      delivery,
      takeout,
      reservations,
    } = req.body;

    //validation
    if (!name) {
      return res.send({ messsage: "Name is required" });
    }
    if (!address) {
      return res.send({ messsage: "Addresss is required" });
    }
    if (!phone) {
      return res.send({ messsage: "Phone is required" });
    }
    if (!email) {
      return res.send({ messsage: "Email is required" });
    }
    if (!website) {
      return res.send({ messsage: "Website is required" });
    }
    if (!rating) {
      return res.send({ messsage: "Rating is required" });
    }
    if (!cuisine) {
      return res.send({ messsage: "cuisine is required" });
    }
    if (!menu) {
      return res.send({ messsage: "menu is required" });
    }
    if (!hours) {
      return res.send({ messsage: "hours is required" });
    }
    if (!reviews) {
      return res.send({ messsage: "reviews is required" });
    }
    if (!location) {
      return res.send({ messsage: "location is required" });
    }

    const Restaurat = await RestaurantModel.create({
      name,
      address,
      phone,
      email,
      website,
      rating,
      cuisine,
      menu,
      hours,
      reviews,
      location,
      delivery,
      takeout,
      reservations,
    });

    if (Restaurat) {
      return res.status(201).send({
        success: true,
        message: "Restaurant Is Created Succesfully",
      });
    }
  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
    });
  }
};

//get restaurant

const getrestaurant = async (req, res) => {
  try {
    const Restaurant = await RestaurantModel.find({});
    var FilteredRestaurant = Restaurant;

    const { search, page = 1, limit = 2, rating, delivery } = req.query;

    //searching
    const regex = new RegExp(search, "i");
    if (search) {
      FilteredRestaurant = Restaurant.filter(
        (item) =>
          regex.test(item.name) ||
          regex.test(item.address.city) ||
          regex.test(item.address.state) ||
          regex.test(item.address.zipCode) ||
          regex.test(item.address.street) ||
          regex.test(item.menu[1].name) ||
          regex.test(item.menu[1].description) ||
          regex.test(item.menu[1].price) ||
          regex.test(item.reviews[1].author) ||
          regex.test(item.rating) ||
          regex.test(item.email) ||
          regex.test(item.phone)
      );
    }

    //filteration
    if (rating) {
      FilteredRestaurant = Restaurant.filter(
        (item) => item.rating >= parseInt(rating)
      );
    }
    if (delivery) {
      FilteredRestaurant = Restaurant.filter(
        (item) => item.delivery === (delivery.toLowerCase() === "true")
      );
    }

    //Pagination logic
    const StartIndex = (page - 1) * limit; // (1-1) * 2 = 0 , 2-1 * 2 = 2
    const EndIndex = StartIndex + parseInt(limit); // 0 + 2 , 2 + 2  = 4

    const paginatedResults = FilteredRestaurant.slice(StartIndex, EndIndex);

    res.json({
      totalResults: FilteredRestaurant.length,
      totalPages: Math.ceil(FilteredRestaurant.length / limit),
      currentPage: parseInt(page),
      results: paginatedResults,
    });
  } catch (error) {
    console.log(error);
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
    });
  }
};

//delete restuarant

const deleteresto = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "The Restaurant ID is required",
    });
  }

  try {
    const Restaurant = await RestaurantModel.findById(id);

    if (!Restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    const is_Deleted = await RestaurantModel.findByIdAndDelete(id);

    if (is_Deleted) {
      return res.status(200).send({
        success: true,
        message: "The Restaurant deleted successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to delete the Restaurant",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

//get restaurant by id
const getrestobyid = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "The Restaurant ID is required",
      });
    }

    const Restaurant = await RestaurantModel.findById(id);

    if (!Restaurant) {
      return res.status(404).send({
        success: false,
        message: "The Restaurant is not axist",
      });
    }

    return res.status(200).send({
      status: true,
      message: "The Restaurant is Exist",
      data: Restaurant,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

//edit restuarant

const editrestuarant = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      email,
      website,
      rating,
      cuisine,
      menu,
      hours,
      reviews,
      location,
      delivery,
      takeout,
      reservations,
      resto_id,
    } = req.body;

    //validation
    if (!name) {
      return res.send({ messsage: "Name is required" });
    }
    if (!address) {
      return res.send({ messsage: "Addresss is required" });
    }
    if (!phone) {
      return res.send({ messsage: "Phone is required" });
    }
    if (!email) {
      return res.send({ messsage: "Email is required" });
    }
    if (!website) {
      return res.send({ messsage: "Website is required" });
    }
    if (!rating) {
      return res.send({ messsage: "Rating is required" });
    }
    if (!cuisine) {
      return res.send({ messsage: "cuisine is required" });
    }
    if (!menu) {
      return res.send({ messsage: "menu is required" });
    }
    if (!hours) {
      return res.send({ messsage: "hours is required" });
    }
    if (!reviews) {
      return res.send({ messsage: "reviews is required" });
    }
    if (!location) {
      return res.send({ messsage: "location is required" });
    }
    if (!resto_id) {
      return res.send({ messsage: "Restaurant ID is required" });
    }

    //chech if exist restaurant

    const is_exist_resto = await RestaurantModel.findById(resto_id);

    if (!is_exist_resto) {
      return res.status(404).send({
        success: false,
        message: "The Restaurant ID is Wrong",
      });
    }

    const is_updated = await RestaurantModel.findByIdAndUpdate(resto_id, {
      name,
      address,
      phone,
      email,
      website,
      rating,
      cuisine,
      menu,
      hours,
      reviews,
      location,
      delivery,
      takeout,
      reservations,
    });

    if (is_updated) {
      return res.status(200).send({
        success: true,
        message: "The Restaurant Updated Succesfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getrestaurant,
  deleteresto,
  getrestobyid,
  editrestuarant,
};
