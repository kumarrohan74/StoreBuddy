const mongoose = require('mongoose');


//product schema


const subscriptionSchema = new mongoose.Schema({
    subscription_id: {type:Number,unique: true},
    customer_id: Number,
    sku_id: Number,
    Price : Number,
    quantity: Number,
    total: Number,
    qty_per_order : Number,
    interval: String,
    slot_id: Number,
    start_date: {type: Date},
    end_date: {type: Date},
    pause_start_date: {type: Date},
    pause_end_date: {type: Date},
    balance_qty: Number,
    coupon_code: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Subscription = mongoose.model('Subscription', subscriptionSchema);