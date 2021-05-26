//header files
const mongoose = require('mongoose');

//sku schema
function randomXToY(minVal,maxVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}

const skuSchema = new mongoose.Schema({
    sku_id: {type:Number,unique: true},
    package_size: String,
    product_mrp: Number,
    sku_code: String,
    strike_price: Number,
    quantity_editable: Number,
    sku_barcode: String,
    sku_code: String,
    sku_mf: Number,
    product_name : String,
    isDelete: Boolean,
    price_per_kg_per_litre: Number,
    updated_at: {type:Date},
    created_at: {type: Date, default: Date.now }
});

//create sku api
const SKU = mongoose.model('SKU', skuSchema);
async function createSKU(data)
{
    const sku = new SKU({
        sku_id: randomXToY(101, 999),
        package_size: data.packageSize,
        product_mrp: data.productMrp,
        sku_code: data.skuCode,
        strike_price: data.strikePrice,
        quantity_editable: data.quantityEditable,
        sku_barcode: data.skuBarCode,
        sku_code: data.skuCode,
        sku_mf: data.qtySkumf,
        product_name: data.product_name,
        isDelete : false,
        price_per_kg_per_litre: data.qtyPriceper,
    });
    const result = await sku.save();
    console.log(result);
}
async function getSKU()
{
    return SKU.find();
  
    
    
}
module.exports = { createSKU, getSKU};
