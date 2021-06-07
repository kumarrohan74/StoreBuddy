//header files
const mongoose = require('mongoose');

//delivery boy schema
const deliveryBoySchema = new mongoose.Schema({
    deliveryboy_id: {type :Number, unique: true},
    deliveryboy_name: String,
    phone_no: Number,
    device_id: Number,
    profile_picture: String,
    allow_cash_collection: Boolean,
    locality_mapping: String,
    status: String,
    changed_device: String,
    isDelete: Boolean,
    partner_id: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);

var query = DeliveryBoy.find();
var deliveryBoyLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            deliveryBoyLength = count;
        }
});

async function createDeliveryBoy(data,partnerId)
{
    deliveryBoyLength = deliveryBoyLength + 1;
    const deliveryBoy = new DeliveryBoy({
        deliveryboy_id: deliveryBoyLength,
        deliveryboy_name: data.deliveryBoyName,
        phone_no: data.phone,
        device_id: data.deviceId,
        profile_picture: data.proflePicture,
        allow_cash_collection: data.allowCashCollection,
        locality_mapping: data.localityMapping,
        status: data.status,
        isDelete: false,
        partner_id: partnerId,
        changed_device: data.changedDevice,
    }); 
    const result = await deliveryBoy.save();
    console.log(result);
}

async function editDeliveryBoy(data)
{
    const updateddata = await DeliveryBoy.updateOne({"deliveryboy_id" : data.id},
    {
        "deliveryboy_name": data.name,
        "phone_no": data.phone,
        "device_id": data.deviceId,
        "profile_picture": data.proflePicture,
        "allow_cash_collection": data.allowCashCollection,
        "locality_mapping": data.localityMapping,
        "status": data.status,
        "isDelete": false,
        "changed_device": data.changedDevice,
        "updated_at": new Date()
},{upsert: true});
}

async function getDeliveryBoy(partnerId)
{
   return DeliveryBoy.find({"isDelete" : false,  "partner_id": partnerId});
}

module.exports = { createDeliveryBoy, getDeliveryBoy, editDeliveryBoy};