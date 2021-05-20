//header files
const mongoose = require('mongoose');

//product schema
const subcategorySchema = new mongoose.Schema({
    subcategory_name: String,
    subcategory_image: String,
    subcategory_status: String,
    subcategory_priority: Number,
    subcategory_descrption: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const SubCategory = mongoose.model('SubCategory', subcategorySchema);
async function createSubCategory(data)
{
    const subcategory = new SubCategory({
        subcategory_name: data.subcategoryName,
        subcategory_image: data.subcategoryimage,
        subcategory_status: data.subcategorystatus,
        subcategory_priority: data.scpriority,
        subcategory_descrption: data.subcatdesc
    });
    const result = await subcategory.save();
    console.log(result);
}
function getSubCategory()
{
    return SubCategory.find();
    
    
    
}
module.exports = { createSubCategory, getSubCategory};
