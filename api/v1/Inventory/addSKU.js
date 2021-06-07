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
    product_id : Number,
    isDelete: Boolean,
    partner_id:Number,
    price_per_kg_per_litre: Number,
    updated_at: {type:Date},
    created_at: {type: Date, default: Date.now }
});

//create sku api
const SKU = mongoose.model('SKU', skuSchema);
async function createSKU(data,partnerId)
{
    const sku = new SKU({
        sku_id: randomXToY(101, 999),
        package_size: data.packageSize,
        product_mrp: data.productMrp,
        sku_code: data.skuCode,
        strike_price: data.strikePrice,
        quantity_editable: data.quantityEditable,
        sku_barcode: data.skuBarcode,
        sku_code: data.skuCode,
        sku_mf: data.qtySkumf,
        product_id: data.product_id,
        partner_id: partnerId,
        isDelete : false,
        price_per_kg_per_litre: data.qtyPriceper,
    });
    const result = await sku.save();
    console.log(result);
}

async function createSKUInLine(data)
{
    const sku = new SKU({
        sku_id: randomXToY(101, 999),
        package_size: data.package_size,
        product_mrp: data.product_mrp,
        sku_code: data.sku_code,
        strike_price: data.strike_price,
        quantity_editable: data.quantityEditable,
        sku_barcode: data.sku_barcode,
        sku_mf: data.sku_mf,
        product_id: data.product_id,
        isDelete : false,
        price_per_kg_per_litre: data.price_per_kg_per_litre,
    });
    const result = await sku.save();
    console.log(result);
}

async function getSKU(id,partnerId)
{
    return SKU.find({"product_id":id,"isDelete" : false,"partner_id": partnerId});
}

async function editSKU(data)
{  
    const updateddata = await SKU.updateOne({"sku_id" : data.sku_id},{"sku_id" :data.sku_id,  "package_size": data.package_size,"product_mrp":data.product_mrp, "sku_code":data.sku_code,"sku_barcode":data.sku_barcode, "strike_price": data.strike_price,"quantity_editable":data.quantity_editable,"sku_mf":data.sku_mf,"isDelete": data.isDelete,"price_per_kg_litre":data.price_per_kg_litre,"updated_at": new Date()},{upsert: true});

}

async function deleteSKU(data)
{
    console.log("data delete");
    console.log(data);   
    const updateddata = await SKU.updateOne({"sku_id" : data.sku_id},{"sku_id" :data.sku_id,  "package_size": data.package_size,"product_mrp":data.product_mrp, "sku_code":data.sku_code,"sku_barcode":data.sku_barcode,"strike_price": data.strike_price,"quantity_editable":data.quantity_editable,"sku_mf":data.sku_mf,"isDelete": data.isDelete,"price_per_kg_litre":data.price_per_kg_litre,"updated_at": new Date()},{upsert: true});

}

module.exports = { createSKU, getSKU, editSKU, deleteSKU, createSKUInLine};