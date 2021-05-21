//header files
const mongoose = require('mongoose');
var all_products;
//product schema
const productSchema = new mongoose.Schema({
    product_name: String,
    product_alias: String,
    primary_image: String,
    secondary_image : [String],
    cgst : Number,
    sgst : Number,
    igst : Number,
    status: Number,
    product_sku : String,
    product_description : String,
    product_priority: Number,
    category: String,
    sub_category: String,
    brand: String,
    subscription_type: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Product = mongoose.model('Product', productSchema);
async function createProduct(data)
{
    const product = new Product({
        product_name: data.productName,
        product_alias: data.productAlias,
        primary_image: data.pimage,
        secondary_image : data.simage,
        cgst : data.productCGST,
        sgst : data.productSGST,
        igst : data.productIGST,
        status: 1,
        product_sku : data.product_sku,
        product_description : data.product_description,
        partner_id : 3,
        product_priority: data.productPriority,
        category: data.productCategory,
        sub_category: data.productSubCategory,
        brand: data.brand,
        subscription_type: data.pstype,
    });
    const result = await product.save();
    console.log(result);
}
async function getProduct()
{
    return Product.find();
    
    
}
module.exports = { createProduct, getProduct};
