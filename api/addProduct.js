//header files
const mongoose = require('mongoose');
var all_products;

//product schema
const productSchema = new mongoose.Schema({
    product_id: {type:Number,default: 0},
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
    mapping: String,
    locality: String,
    sub_category: String,
    brand: String,
    subscription_type: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Product = mongoose.model('Product', productSchema);

var query = Product.find();
var productLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {   
            productLength = count;
        }
});

async function createProduct(data)
{
    productLength = productLength + 1;
    const product = new Product({
        product_id: productLength,
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
        mapping: data.productMapping,
        locality: data.productLocality,
        brand: data.productBrand,
        subscription_type: data.subscriptionType,
        isDelete: false,
    });
    const result = await product.save();
    console.log(result);
}

async function editProduct(data)
{
    console.log("data edit");
    console.log(data);
    const updateddata = await Product.updateOne({"product_id" : data.product_id},{"cgst":data.cgst,"igst":data.igst,"sgst":data.sgst,"locality":data.product_locality,"product_alias": data.product_alias,"brand": data.product_brand,"product_name":data.product_name,"product_priority": data.product_priority,"category":data.product_category,"sub_category":data.product_subcategory,"subscription_type": data.subscription_type,"isDelete":data.isDelete,"updated_at": new Date()},{upsert: true});
    console.log("updateddata");
    console.log(updateddata);
}

async function getProduct()
{
    return Product.find({"isDelete" : false});
}

async function deleteProduct(data) {
    const updateddata = await Product.updateOne({"product_id" : data.product_id},{"cgst":data.cgst,"igst":data.igst,"sgst":data.sgst,"locality":data.product_locality,"product_alias": data.product_alias,"brand": data.product_brand,"product_name":data.product_name,"product_priority": data.product_priority,"category":data.product_category,"sub_category":data.product_subcategory,"subscription_type": data.subscription_type,"isDelete":data.isDelete,"updated_at": new Date()},{upsert: true});
}

module.exports = { createProduct, getProduct, editProduct, deleteProduct};
