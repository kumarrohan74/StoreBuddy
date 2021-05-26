//header files
const mongoose = require('mongoose');

//warehouse schema
const brandSchema = new mongoose.Schema({
    brand_id: {type:Number,default: 0},
    brand_name: String,
    partner_id: Number,
    brand_description: String,
    brand_image: String,
    brand_priority: Number,
    brand_supplier_id: Number,
    brand_supplier_name: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Brand = mongoose.model('Brand', brandSchema);

var query = Brand.find();
var brandLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            brandLength = count;
        }
});

async function createBrand(data)
{
    brandLength = brandLength + 1;
    const brand = new Brand({
        brand_id : brandLength,
        brand_name: data.name,
        partner_id: 3,
        brand_description: data.description,
        brand_image: data.brandimage,
        brand_priority: data.priority,
        brand_supplier_id: 2,
        brand_supplier_name: "Nilgiris",
        isDelete: false,
    });

    const result = await brand.save();
 
}
async function getBrand()
{
    return Brand.find({"isDelete" : false});
}

async function editBrand(data)
{
    const editdata =  await Brand.findOne({"brand_id" : data.categoryId});
    console.log("yayy");
    console.log(editdata);
    console.log(data);
    const updateddata = await Brand.updateOne({"brand_id" : data.id},{"brand_name" :data.name,  "brand_priority": data.priority,"brand_description":data.description, "updated_at": new Date()},{upsert: true});
    console.log("updateddata");
    console.log(updateddata);
}

async function deleteBrand(data)
{
    
    const updateddata = await Brand.updateOne({"brand_id" : data.brand_id},{"brand_name" :data.brand_name, "isDelete" : data.isDelete,"brand_priority": data.brand_priority,"brand_description":data.brand_description, "updated_at": new Date()},{upsert: true});
    console.log("updateddata");
    console.log(updateddata);
}

module.exports = { createBrand, getBrand, editBrand, deleteBrand};
