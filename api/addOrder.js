//header files
const mongoose = require('mongoose');

//customer schema
const orderSchema = new mongoose.Schema({
    order_id: Number,
    order_log_id: Number,
    customer_id: Number,
    address_id: Number,
    locality_id: Number,
    delivery_boy_id: Number,
    product_id: Number,
    sku_id: Number,
    billing_price: Number,
    sku_size_ordered: String,
    quantity: Number,
    multiplication_factor: Number,
    price_per_kg: Number,
    qty_by_unit_per_kg: String,
    cgst: Number,
    sgst: Number,
    igst: Number,
    ordered_amount: Number,
    packed_weight: String,
    billed_quantity: Number,
    billed_amount: Number,
    adjustment: Number,
    ordered_status: Number,
    subscription_id: Number,
    delivery_date: Date,
    slot_id: Number,
    slot_time: Number,
    priority_user: Number,
    partner_id: Number,
    delivery_instructions: String,
    payment_type: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Order = mongoose.model('Order', orderSchema);
async function createOrder(data)
{
    const order = new Order({
        order_id: data.orderid,
        order_log_id: data.orderlogid,
        customer_id: data.ordcustomerid,
        address_id: data.ordaddressid,
        locality_id: data.ordlocalityid,
        delivery_boy_id: data.orddeliverybid,
        product_id: data.ordproductid,
        sku_id: data.ordskuid,
        billing_price: data.ordbillingprice,
        sku_size_ordered: data.ordskusize,
        quantity: data.ordqty,
        multiplication_factor: data.ordmf,
        price_per_kg: data.ordppkg,
        qty_by_unit_per_kg: data.ordqtyunitkg,
        cgst: data.ordcgst,
        sgst: data.ordsgst,
        igst: data.ordigst,
        ordered_amount: data.ordordamnt,
        packed_weight: data.ordpkdwgt,
        billed_quantity: data.ordbldqty,
        billed_amount: data.ordbldamnt,
        adjustment: data.ordadjustment,
        ordered_status: data.ordordstatus,
        subscription_id: data.ordsubid,
        delivery_date: data.orddeliverydate,
        slot_id: data.ordslotid,
        slot_time: data.ordslottime,
        priority_user: data.ordpuser,
        partner_id: data.ordpid,
        delivery_instructions: data.ordpaytype,
        payment_type: data.orddelins,
    });
    const result = await order.save();
    console.log(result);
}
async function getOrders()
{
    const orders = await Order.find();
    console.log(orders);
    
    
}
module.exports = { createOrder, getOrders};
