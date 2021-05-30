//header files
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
mongoose.set('useFindAndModify', false);



//product schema

const categorySchema = new mongoose.Schema({
    category_id: {type:Number,default: 0},
    category_name: String,
    category_image: {},
    category_description : String,
    status: String,
    category_priority: Number,
    partner_id : Number,
    isDelete: Boolean,
    
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Category = mongoose.model('Category', categorySchema);

var query = Category.find();
var categoryLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {   
            categoryLength = count;
        }
});

async function createCategory(data,categoryImage)
{
    categoryLength = categoryLength + 1;
    const category = new Category({
        category_id: categoryLength,
        category_name: data.addcategoryName,
        category_image: categoryImage,
        category_description : data.addcategoryDescription,
        status: 1,
        partner_id : 3,
        isDelete: false,
        category_priority: data.addcategoryPriority
       
    });
    const result = await category.save(); 
    
}
  function getCategory()
{
    return Category.find({"isDelete" : false});
}

async function editCategory(data)
{
    
    const updateddata = await Category.updateOne({"category_id" : data.categoryId},{"category_name" :data.categoryName, "isDelete":data.isDelete,"status" : data.categoryStatus, "category_priority": data.categoryPriority,"category_description":data.categoryDescription, "updated_at": new Date()},{upsert: true});
    console.log("updateddata");
    console.log(updateddata);
}

async function deleteCategory(data)
{
    
    const updateddata = await Category.updateOne({"category_id" : data.category_id},{"category_name" :data.category_name, "isDelete" : data.isDelete,"status" : data.status, "category_priority": data.category_priority,"category_description":data.category_description, "updated_at": new Date()},{upsert: true});
    
}

module.exports = { createCategory, getCategory, editCategory, deleteCategory};

