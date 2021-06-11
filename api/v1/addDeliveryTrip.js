const mongoose = require('mongoose');


//product schema


const deliveryTripScehma = new mongoose.Schema({
    delivery_trip_id: {type:Number,unique: true},
    name: String,
    message: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    sequence_type: String,
    delivery_boy_id: Number,
    partner_id: Number,
    roue_polygon_data: Number
});

//create product api
const DeliveryTrip = mongoose.model('DeliveryTrip', deliveryTripScehma);