const FoodsModel = require("../model/FoodModel");
const OrderModel = require("../model/OrderModel");

//create a Food
const createfoods = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    //validation

    if (!title) {
      return res.send({ message: "The Title is required" });
    }
    if (!description) {
      return res.send({ message: "The description is required" });
    }
    if (!price) {
      return res.send({ message: "The Price is required" });
    }
    if (!foodTags) {
      return res.send({ message: "The Food tags is required" });
    }
    if (!category) {
      return res.send({ message: "The Category is required" });
    }
    if (!code) {
      return res.send({ message: "The Code is required" });
    }
    if (!restaurant) {
      return res.send({ message: "The Restaurant is required" });
    }
    if (!rating) {
      return res.send({ message: "The Rating is required" });
    }
    if (!ratingCount) {
      return res.send({ message: "The ratingCount is required" });
    }

    const is_inserted = await FoodsModel.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    if (is_inserted) {
      return res.status(201).send({
        success: true,
        message: "The Food is created Succesfully",
      });
    } else {
      return res.status(406).send({
        success: false,
        message: "The Food is not created Succesfully ",
      });
    }
  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
      error: error.message,
    });
  }
};

//get foods

const getFoods = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 2,
      isAvailable,
      rating,
      category,
    } = req.query;
    const Food = await FoodsModel.find({});
    var FilteredFood = Food;

    if (search) {
      console.log(search);
      const regex = new RegExp(search, "i");
      FilteredFood = Food.filter(
        (item) =>
          regex.test(item.title) ||
          regex.test(item.decription) ||
          regex.test(item.price) ||
          regex.test(item.category) ||
          regex.test(item.code)
      );
    }

    //filteration
    if (isAvailable) {
      FilteredFood = Food.filter((item) => item.isAvailable === isAvailable);
    }

    if (rating) {
      FilteredFood = Food.filter((item) => item.rating >= rating);
    }

    //pagination

    const StartIndex = (page - 1) * limit; // (1-1) * 2 = 0 , 2-1 * 2 = 2
    const EndIndex = StartIndex + parseInt(limit); // 0 + 2 , 2 + 2  = 4

    const paginatedResults = FilteredFood.slice(StartIndex, EndIndex);
    res.json({
      totalResults: FilteredFood.length,
      totalPages: Math.ceil(FilteredFood.length / limit),
      currentPage: parseInt(page),
      results: paginatedResults,
    });
  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
      error: error.message,
    });
  }
};

//delete foods

const deletefood = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "The Food ID is required",
    });
  }

  try {
    const Food = await FoodsModel.findById(id);

    if (!Food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    const is_Deleted = await FoodsModel.findByIdAndDelete(id);

    if (is_Deleted) {
      return res.status(200).send({
        success: true,
        message: "The Food deleted successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to delete the Food",
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

//updates food
const editFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
      food_id,
    } = req.body;

    //validation

    if (!title) {
      return res.send({ message: "The Title is required" });
    }
    if (!description) {
      return res.send({ message: "The description is required" });
    }
    if (!price) {
      return res.send({ message: "The Price is required" });
    }
    if (!foodTags) {
      return res.send({ message: "The Food tags is required" });
    }
    if (!category) {
      return res.send({ message: "The Category is required" });
    }
    if (!code) {
      return res.send({ message: "The Code is required" });
    }
    if (!restaurant) {
      return res.send({ message: "The Restaurant is required" });
    }
    if (!rating) {
      return res.send({ message: "The Rating is required" });
    }
    if (!ratingCount) {
      return res.send({ message: "The ratingCount is required" });
    }
    if (!food_id) {
      return res.send({ message: "The Food ID  is required" });
    }

    //chech if exist Food

    const is_exist_food = await FoodsModel.findById(food_id);

    if (!is_exist_food) {
      return res.status(404).send({
        success: false,
        message: "The Food ID is Wrong",
      });
    }

    const is_updated = await FoodsModel.findByIdAndUpdate(food_id, {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    if (is_updated) {
      return res.status(200).send({
        success: true,
        message: "The Food Updated Succesfully",
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

//place order
const placeorder = async (req, res) => {
  try {
    const {cart , payment } = req.body
    if(!cart){
        return res.status(404).send({
            success : false,
            message : "The Cart is required"
        })
    }


    var total = 0
    cart.map((i)=>{
        total += i.price
    })

    const newOrder = await OrderModel.create({
        foods : cart ,
        payment : total,
        buyer : req.body.id
    })

    if(newOrder){
        return res.status(201).send({
            success : true,
            message : "Order Placed Succesfully"
        })
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
  createfoods,
  getFoods,
  deletefood,
  editFood,
  placeorder
};
