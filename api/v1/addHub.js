//header files
const mongoose = require('mongoose');
;
//warehouse schema
const hubSchema = new mongoose.Schema({
    hub_id:{type :Number, unique: true},
    hub_name: String,
    partner_id: Number,
    description: String,
    city: String,
    warehouse: String,
    status: Number,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create hub api
const Hub = mongoose.model('Hub', hubSchema);

var query = Hub.find();
var hubLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            hubLength = count;
        }
});

async function createHub(data)
{
    hubLength = hubLength + 1;
    const hub = new Hub({
        hub_id: hubLength,
        hub_name: data.name,
        city: data.city,
        warehouse: data.warehouse,
        partner_id: 3,
        description: data.description,
        isDelete : false,
        status: data.status
    });
    const result = await hub.save();
    console.log(result);
}
async function getHub()
{
    return Hub.find({"isDelete" : false});
}

async function getHubByWarehouseCity(warehouse, city) {
    console.log(warehouse,city);
    return Hub.find({"isDelete" : false, "warehouse" : warehouse, "city" : city});
}

async function editHub(data)
{
    const updateddata = await Hub.updateOne({"hub_id" : data.id},{"hub_name" :data.name, "city": data.city, "warehouse": data.warehouse, "description":data.description, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

async function deleteHub(data)
{
    console.log("delete hub");
    const updateddata = await Hub.updateOne({"hub_id" : data.hub_id},{"hub_name" :data.hub_name, "city": data.city, "warehouese": data.warehouse,"description":data.description, "isDelete": data.isDelete, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

module.exports = { createHub, getHub, editHub, deleteHub, getHubByWarehouseCity};
