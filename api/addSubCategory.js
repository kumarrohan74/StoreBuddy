//header files
const mongoose = require('mongoose');

//product schema
const subcategorySchema = new mongoose.Schema({
    subcategory_name: String,
    subcategory_image: String,
    subcategory_status: String,
    subcategory_priority: Number,
    subcategory_description: String,
    partner_id: Number,
    created_at: {type: Date, default: Date.now }
});

//create product api
const SubCategory = mongoose.model('SubCategory', subcategorySchema);
async function createSubCategory(data)
{
    console.log(data);
    const subcategory = new SubCategory({
        subcategory_name: data.subCategoryName,
        subcategory_image: data.subcategoryimage,
        subcategory_description: data.subCategoryDescription,
        subcategory_status: 1,
        partner_id: 3,
        subcategory_priority: data.subCategoryPriority,
        
    });
    const result = await subcategory.save();
    console.log(result);
}
function getSubCategory()
{
    return SubCategory.find();
    
    
    
}
module.exports = { createSubCategory, getSubCategory};
