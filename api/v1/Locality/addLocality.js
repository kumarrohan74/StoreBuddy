//header files
const mongoose = require('mongoose');
;
//warehouse schema
const localitySchema = new mongoose.Schema({
    locality_id:{type :Number, unique: true},
    locality_name: String,
    partner_id: Number,
    description: String,
    city: {},
    warehouse: {},
    hub: {},
    store: {},
    isDelete: Boolean,
    status: Number,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create hub api
const Locality = mongoose.model('Locality', localitySchema);

var query = Locality.find();
var localityLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            localityLength = count;
        }
});

async function createLocality(data, partnerId)
{
    localityLength = localityLength + 1;
    const locality = new Locality({
        locality_id: localityLength,
        locality_name: data.name,
        partner_id: partnerId,
        description: data.description,
        status: data.status,
        city: data.city,
        warehouse: data.warehouse,
        hub: data.hub,
        store: data.store,
        isDelete: false

    });
    const result = await locality.save();
    console.log(result);
}
async function getLocality(partnerId)
{
     return Locality.find({"isDelete": false, "partner_id": partnerId});
}

async function getLocalityByWarehouse(warehouseId, partnerId)
{
    return Locality.find({"isDelete" : false, "partner_id": partnerId, "warehouse.warehouseId" : parseInt(warehouseId)});
}

async function editLocality(data)
{
    const updateddata = await Locality.updateOne({"locality_id" : data.id},{"locality_name" :data.name, "description":data.description, "city": data.city, "warehouse": data.warehouse, "hub": data.hub, "store": data.store, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

async function deleteLocality(data)
{
    const updateddata = await Locality.updateOne({"locality_id" : data.locality_id},{"locality_name" :data.locality_name, "description":data.description, "city": data.city, "warehouse": data.warehouse, "hub": data.hub, "store": data.store,"isDelete": data.isDelete,"status": data.status,  "updated_at": new Date()},{upsert: true});
}


module.exports = { createLocality, getLocality, editLocality,deleteLocality, getLocalityByWarehouse};
