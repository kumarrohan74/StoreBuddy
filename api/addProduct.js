//header files
const mongoose = require('mongoose');
var all_products;
//product schema
const productSchema = new mongoose.Schema({
    product_name: String,
    product_alias: String,
    image_url: [String],
    product_priority: Number,
    category: String,
    sub_category: String,
    brand: String,
    subscription_type: String,
    product_description: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Product = mongoose.model('Product', productSchema);
async function createProduct(data)
{
    const product = new Product({
        product_name: data.productName,
        product_alias: data.palias,
        image_url: data.purl,
        product_priority: data.ppriority,
        category: data.category,
        sub_category: data.category,
        brand: data.brand,
        subscription_type: data.pstype,
        product_description: data.pdescr
    });
    const result = await product.save();
    console.log(result);
}
async function getProducts()
{
    const products = await Product.find();
    console.log(products);
    
    
}
module.exports = { createProduct, getProducts};
