const mongoose = require('mongoose');


//product schema


const paymentReceiptsSchema = new mongoose.Schema({
    payment_receipt_id: {type:Number,unique: true},
    customer_id: Number,
    transaction_type_id: Number,
    request_id: Number,
    bank_transaction_id: Number,
    date: {type: Date},
    amount: Number,
    payment_gateway: String,
    payment_mode: String,
    status: String,
    updated_by: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String
});

//create product api
const PaymentReceipts = mongoose.model('PaymentReceipts', paymentReceiptsSchema);