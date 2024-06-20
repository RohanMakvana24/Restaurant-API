const CategoryModel = require("../model/CategoriesModel");

//create a categories
const createcategories = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    //validation

    if (!name) {
      return res.send({ message: "The name is required" });
    }
    if (!description) {
      return res.send({ message: "The description is required" });
    }

    const is_inserted = await CategoryModel.create({
      name,
      description,
      status,
    });

    if (is_inserted) {
      return res.status(201).send({
        success: true,
        message: "The Categories is created Succesfully",
      });
    } else {
      return res.status(406).send({
        success: false,
        message: "The Categories is not created Succesfully ",
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

const getcategories = async (req, res) => {
  try {
    const { search, page = 1, limit = 2, status } = req.query;

    const Categories = await CategoryModel.find({});
    var filteredCategories = Categories;

    if (search) {
      var regex = new RegExp(search, "i");
      filteredCategories = Categories.filter(
        (item) => regex.test(item.name) || regex.test(item.description)
      );
    }

    //filteration
    if (status) {
      filteredCategories = Categories.filter(
        (item) => item.status == parseInt(status)
      );
    }

    //pagination
    StartIndex = (page - 1) * limit;
    EndIndex = StartIndex + parseInt(limit);
    const Paginateddata = filteredCategories.slice(StartIndex, EndIndex);

    res.json({
      TotalFiltered: filteredCategories.length,
      totalPages: Math.ceil(filteredCategories.length / limit),
      currentPage: parseInt(page),
      results: Paginateddata,
    });
  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
      error: error.message,
    });
  }
};

//delete categories
const delcat = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      success: false,
      message: "The Categories ID is required",
    });
  }

  try {
    const Category = await CategoryModel.findById(id);

    if (!Category) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }

    const is_Deleted = await CategoryModel.findByIdAndDelete(id);

    if (is_Deleted) {
      return res.status(200).send({
        success: true,
        message: "The Category deleted successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to delete the Category",
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

const getcatbyid = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "The Categories ID is required",
      });
    }

    const Category = await CategoryModel.findById(id);

    if (!Category) {
      return res.status(404).send({
        success: false,
        message: "The Category is not Exist",
      });
    }

    return res.status(200).send({
      status: true,
      message: "The Restaurant is Exist",
      data: Category,
    });
  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
      error: error.message,
    });
  }
};

//edit categories
const editcategories = async (req, res) => {
  try {

    const { name, description,  status , category_id } = req.body;

    //validation

    if (!name) {
      return res.send({ message: "The name is required" });
    }
    if (!description) {
      return res.send({ message: "The description is required" });
    }
    if (!category_id) {
        return res.send({ message: "The Category ID is required" });
     }

     const is_updated = await CategoryModel.findByIdAndUpdate(category_id , {
        name : name ,
        description : description,
        status : status
     })

     if(is_updated){
        return res.status(200).send({
            success : true ,
            message : "The Category Updated Succesfully"
        })
     }

  } catch (error) {
    res.status(504).send({
      success: false,
      message: "Somenthing Wrong",
      error: error.message,
    });
  }
};

module.exports = { createcategories, getcategories, delcat, getcatbyid , editcategories };
