//header files
const mongoose = require('mongoose');

//product schema
const subcategorySchema = new mongoose.Schema({
    subcategory_id: {type:Number,default: 0},
    subcategory_name: String,
    subcategory_image: {},
    subcategory_status: String,
    subcategory_priority: Number,
    subcategory_description: String,
    partner_id: Number,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const SubCategory = mongoose.model('SubCategory', subcategorySchema);

var query = SubCategory.find();
var subcategoryLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            subcategoryLength = count;
        }
});

async function createSubCategory(data,subCategoryImage)
{
    subcategoryLength = subcategoryLength + 1;
    const subcategory = new SubCategory({
        subcategory_id: subcategoryLength,
        subcategory_name: data.name,
        subcategory_image: subCategoryImage,
        subcategory_description: data.description,
        subcategory_status: 1,
        isDelete: false,
        partner_id: 3,
        subcategory_priority: data.priority,
        
    });
    const result = await subcategory.save();
    console.log(result);
}
function getSubCategory()
{
    return SubCategory.find({"isDelete" : false});
}

async function editSubCategory(data, subCategoryImage)
{
    
    const updateddata = await SubCategory.updateOne({"subcategory_id" : data.id},{"subcategory_name" :data.name, "subcategory_description":data.description, "subcategory_status":data.status, "subcategory_priority": data.priority,"isDelete": data.isDelete, "subcategory_image":subCategoryImage, "updated_at": new Date()},{upsert: true});
    
}

async function deleteSubCategory(data)
{
    
    const updateddata = await SubCategory.updateOne({"subcategory_id" : data.subcategory_id},{"subcategory_name" :data.subcategory_name, "subcategory_description":data.subcategory_description, "isDelete": data.isDelete,"subcategory_status":data.subcategory_status, "subcategory_priority": data.subcategory_priority,"subcategory_image":data.subCategoryImage, "updated_at": new Date()},{upsert: true});
    
}

module.exports = { createSubCategory, getSubCategory, editSubCategory, deleteSubCategory};