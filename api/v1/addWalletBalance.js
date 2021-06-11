const mongoose = require('mongoose');


//product schema


const walletSchema = new mongoose.Schema({
    wallet_id: {type:Number,unique: true},
    customer_id: Number,
   total_debit: Number,
    total_credit : Number,
    balance: Number,
    credit_limit: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const WalletBalance = mongoose.model('WalletBalance', walletSchema);