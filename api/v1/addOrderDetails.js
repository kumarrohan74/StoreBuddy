const mongoose = require('mongoose');


//product schema


const orderDetailsSchema = new mongoose.Schema({
    order_details_id: {type:Number,unique: true},
    product_id: Number,
    order_id: Number,
    sku_id: Number,
    price: Number,
    sku_size: String,
    order_qty: Number,
    qty_per_kg: Number,
    price_per_kg : Number,
    order_weight: String,
    order_amount: Number,
    billed_weight: String,
    billed_qty: Number,
    adjustment: Number,
    cgst: Number,
    igst: Number,
    sgst: Number,
    billed_amount: Number,
    status: String,
    subscription_id: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String,
    created_by: String
});

//create product api
const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);