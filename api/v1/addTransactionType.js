const mongoose = require('mongoose');


//product schema
const transactionTypeSchema = new mongoose.Schema({
    transactin_type_id: Number,
    name: String,
    details: String,
    created_at: {type: Date, default: Date.now },
});

//create product api
const TransactionType = mongoose.model('TransactionType', transactionTypeSchema);