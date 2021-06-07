//header files
const mongoose = require('mongoose');

//customer schema
const orderSchema = new mongoose.Schema({
    order_id: {type :Number, unique: true},
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
    slot_time: String,
    priority_user: String,
    partner_id: Number,
    delivery_instructions: String,
    payment_type: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Order = mongoose.model('Order', orderSchema);

var query = Order.find();
var orderLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            orderLength = count;
        }
});

async function createOrder(data,partnerId)
{
    orderLength = orderLength + 1;
    const order = new Order({
        order_id: orderLength,
        order_log_id: data.orderLogId,
        customer_id: data.customerId,
        address_id: data.addressId,
        locality_id: data.localityId,
        delivery_boy_id: data.deliveryBoyId,
        product_id: data.productId,
        sku_id: data.skuId,
        billing_price: data.billingPrice,
        sku_size_ordered: data.skuSizeOrdered,
        quantity: data.quantity,
        multiplication_factor: data.mf,
        price_per_kg: data.pPKg,
        qty_by_unit_per_kg: data.qtyByUnitPerKg,
        cgst: data.cgst,
        sgst: data.sgst,
        igst: data.igst,
        ordered_amount: data.orderedAmount,
        packed_weight: data.packedWeight,
        billed_quantity: data.billedQuantity,
        billed_amount: data.billedAmount,
        adjustment: data.adjustment,
        ordered_status: data.status,
        subscription_id: data.subscriptionId,
        delivery_date: data.deliveryDate,
        slot_id: data.slotId,
        slot_time: data.slotTime,
        priority_user: data.priorityUser,
        partner_id: partnerId,
        delivery_instructions: data.deliveryInstructions,
        payment_type: data.paymentType,
        isDelete: false,
    });
    const result = await order.save();
    console.log(result);
}
async function getOrders(partnerId)
{
    return Order.find({"isDelete": false, "partner_id": partnerId});
}


async function editOrder(data)
{
    const updateddata = await Order.updateOne({"order_id" : data.id},
{
        "order_log_id": data.orderLogId,
        "customer_id": data.customerId,
        "address_id": data.addressId,
        "locality_id": data.localityId,
        "delivery_boy_id": data.deliveryBoyId,
        "product_id": data.productId,
        "sku_id": data.skuId,
        "billing_price": data.billingPrice,
        "sku_size_ordered": data.skuSizeOrdered,
        "quantity": data.quantity,
        "multiplication_factor": data.mf,
        "price_per_kg": data.pPKg,
        "qty_by_unit_per_kg": data.qtyByUnitPerKg,
        "cgst": data.cgst,
        "sgst": data.sgst,
        "igst": data.igst,
        "ordered_amount": data.orderedAmount,
        "packed_weight": data.packedWeight,
        "billed_quantity": data.billedQuantity,
        "billed_amount": data.billedAmount,
        "adjustment": data.adjustment,
        "ordered_status": data.status,
        "subscription_id": data.subscriptionId,
        "delivery_date": data.deliveryDate,
        "slot_id": data.slotId,
        "slot_time": data.slotTime,
        "priority_user": data.priorityUser,
        "delivery_instructions": data.deliveryInstructions,
        "payment_type": data.paymentType,
        isDelete: false,
        "updated_at": new Date()
},{upsert: true});
    
        
    
}
module.exports = { createOrder, getOrders, editOrder};
