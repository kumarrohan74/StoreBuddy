const mongoose = require('mongoose');


//product schema


const purchaseSchema = new mongoose.Schema({
    purchase_id: {type:Number,unique: true},
    product_id: Number,
    order_id: Number,
    sku_id: Number,
    price: Number,
    sku_size: String,
    billed_qty: Number,
    cgst: Number,
    igst: Number,
    sgst: Number,
    billed_amount: Number,
    status: String,
    transaction_type: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String,
    created_by: String
});

//create product api
const Purchase = mongoose.model('Purchase', purchaseSchema);