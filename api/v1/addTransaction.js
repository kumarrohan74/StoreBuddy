const mongoose = require('mongoose');


//product schema


const transactionSchema = new mongoose.Schema({
    transaction_id: {type:Number,unique: true},
    customer_id: Number,
    transaction_type_id: Number,
    date: {type: Date},
    time : {type: Date},
    invoice_id: Number,
    payment_id: Number,
    opening_balance: Number,
    amount: Number,
    closing_balance: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String,
});

//create product api
const Transaction = mongoose.model('Transaction', transactionSchema);