//header files
const mongoose = require('mongoose');
var all_products;
//product schema
const categorySchema = new mongoose.Schema({
    category_name: String,
    category_image: String,
    banner_image: String,
    status: String,
    category_priority: Number,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Category = mongoose.model('Category', categorySchema);
async function createCategory(data)
{
    const category = new Category({
        category_name: data.categoryName,
        category_image: data.categoryimage,
        banner_image: data.bannerimage,
        status: data.status,
        category_priority: data.cpriority
    });
    const result = await category.save();
    console.log(result);
}
async function getCategory()
{
    const category = await Category.find();
    console.log(category);
    
    
}
module.exports = { createCategory, getCategory};
