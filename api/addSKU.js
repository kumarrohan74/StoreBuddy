//header files
const mongoose = require('mongoose');

//sku schema
const skuSchema = new mongoose.Schema({
    sku_id: Number,
    package_size: String,
    product_mrp: Number,
    sku_code: String,
    strike_price: Number,
    created_at: {type: Date, default: Date.now }
});

//create sku api
const SKU = mongoose.model('SKU', skuSchema);
async function createSKU(data)
{
    const sku = new SKU({
        sku_id: data.skuid,
        package_size: data.packagesize,
        product_mrp: data.productmrp,
        sku_code: data.skucode,
        strike_price: data.strikeprice
    });
    const result = await sku.save();
    console.log(result);
}
async function getSKU()
{
    const sku = await SKU.find();
    console.log(sku);
    
    
}
module.exports = { createSKU, getSKU};
