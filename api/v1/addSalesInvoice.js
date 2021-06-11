const mongoose = require('mongoose');


//product schema


const salesInvoiceSchema = new mongoose.Schema({
    sales_invoice_id: {type:Number,unique: true},
    subscription_id: Number,
    order_id: Number,
    customer_id: Number,
    product_total: Number,
    date: {type: Date},
    cgst: Number,
    sgst: Number,
    igst : Number,
    total: Number,
    discount: Number,
    adjustment_reason: String,
    adjustment: Number,
    invoice_amount: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date},
    updated_by: String,
    status: String,
    details: String,
    notes: String,
    pdf_url: String,
    transaction_type: String
});

//create product api
const SalesInvoice = mongoose.model('SalesInvoice', salesInvoiceSchema);