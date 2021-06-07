//header files
const mongoose = require('mongoose');
var all_products;

//product schema
const productSchema = new mongoose.Schema({
    product_id: {type:Number,default: 0,unique:true},
    product_name: String,
    product_alias: String,
    primary_image: {},
    secondary_image : {},
    cgst : Number,
    sgst : Number,
    igst : Number,
    status: Number,
    product_sku : String,
    product_description : String,
    product_priority: Number,
    category: {},
    sub_category: {},
    warehouse_id: Number,
    partner_id: Number,
    hub: {},
    store:{},
    locality: {},
    brand: {},
    mappedBy: {},
    subscription_type: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Product = mongoose.model('Product', productSchema);

var query = Product.find();
var productLength = 0;
query.countDocuments(function (err, count) {
    if (err) console.log(err)
    else 
        {   
            productLength = count;
        }
});

async function createProduct(data,partnerId)
{
    productLength = productLength + 1;
    const product = new Product({
        product_id: productLength,
        product_name: data.productName,
        product_alias: data.productAlias,
        primary_image: "test.jpg",
        secondary_image : "test.jpg",
        cgst : data.productCGST,
        sgst : data.productSGST,
        igst : data.productIGST,
        status: 1,
        product_sku : data.product_sku,
        product_description : data.productDescription,
        partner_id : partnerId,
        product_priority: data.productPriority,
        category: data.productCategory,
        sub_category: data.productSubCategory,
        warehouse_id: 1,
        hub: data.hub,
        store:data.store,
        mappedBy: data.mappedBy,
        locality: data.locality,
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
    const updateddata = await Product.updateOne({"product_id" : data.productId},
    {"product_name": data.productName,
        "product_alias": data.productAlias,
        "primary_image": "test.jpg",
        "secondary_image" : "test.jpg",
        "cgst" : data.productCGST,
        "sgst" : data.productSGST,
        "igst" : data.productIGST,
        "status": 1,
        "product_sku" : data.product_sku,
        "product_description" : data.productDescription,
        "product_priority": data.productPriority,
        "category": data.productCategory,
        "sub_category": data.productSubCategory,
        "hub": data.hub,
        "store":data.store,
        "mappedBy": data.mappedBy,
        "locality": data.locality,
        "brand": data.productBrand,
        "subscription_type": data.subscriptionType,
        "updated_at": new Date()},{upsert: true});
    console.log("updateddata");
    console.log(updateddata);
}

async function getProductId(productName, productPriority) {
   
    return Product.findOne({"product_name": productName, "product_priority": productPriority,"isDelete" : false})
}

async function getProduct(partnerId)
{
    return Product.find({"isDelete" : false,"partner_id": partnerId});
}

async function deleteProduct(data) {
    const updateddata = await Product.updateOne({"product_id" : data.product_id},{"cgst":data.cgst,"igst":data.igst,"sgst":data.sgst,"locality":data.product_locality,"product_alias": data.product_alias,"brand": data.product_brand,"product_name":data.product_name,"product_priority": data.product_priority,"category":data.product_category,"sub_category":data.product_subcategory,"subscription_type": data.subscription_type,"isDelete":data.isDelete,"product_description": data.product_description,"updated_at": new Date()},{upsert: true});
}

module.exports = { createProduct, getProduct, editProduct, deleteProduct, getProductId};