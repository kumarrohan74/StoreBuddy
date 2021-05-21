//header files
const mongoose = require('mongoose');
var categoryDetails = "bnm";
//product schema
const categorySchema = new mongoose.Schema({
    category_name: String,
    category_image: String,
    category_description : String,
    status: String,
    category_priority: Number,
    partner_id : Number,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Category = mongoose.model('Category', categorySchema);
async function createCategory(data)
{
    const category = new Category({
        category_name: data.categoryName,
        category_image: data.categoryImageURL,
        category_description : data.categoryDescription,
        status: 1,
        partner_id : 3,
        category_priority: data.categoryPriority
    });
    const result = await category.save();
    
}
  function getCategory()
{
    return Category.find();
}



module.exports = { createCategory, getCategory, categoryDetails};

