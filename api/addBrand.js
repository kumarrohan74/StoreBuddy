//header files
const mongoose = require('mongoose');
;
//warehouse schema
const brandSchema = new mongoose.Schema({
   
    brand_name: String,
    brand_partner_id: Number,
    brand_description: String,
    brand_image: String,
    brand_priority: Number,
    brand_supplier_id: Number,
    brand_supplier_name: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Brand = mongoose.model('Brand', brandSchema);
async function createBrand(data)
{
    const brand = new Brand({
        brand_name: data.brandname,
        brand_partner_id: data.brandpartnerid,
        brand_description: data.branddesc,
        brand_image: data.brandimage,
        brand_priority: data.brandpriority,
        brand_supplier_id: data.brandsupid,
        brand_supplier_name: data.brandsupname,
    });
    const result = await brand.save();
 
}
async function getBrand()
{
    const brand = await Brand.find();
    console.log(brand);
    
    
}
module.exports = { createBrand, getBrand};
