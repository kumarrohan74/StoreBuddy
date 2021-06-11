const mongoose = require('mongoose');


//product schema


const deliverySlotsScehma = new mongoose.Schema({
    delivery_slot_id: {type:Number,unique: true},
    store_id: Number,
    day: {type: Date},
    time: {type: Date},
    cutoff_before: {type: Date},
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String,
    order_limit: Number
});

//create product api
const DeliverySlot = mongoose.model('DeliverySlot', deliverySlotsScehma);