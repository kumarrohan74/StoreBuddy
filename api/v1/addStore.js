//header files
const mongoose = require('mongoose');
;
//warehouse schema
const storeSchema = new mongoose.Schema({
    store_id:  {type :Number, unique: true},
    store_name: String,
    partner_id: Number,
    description: String,
    city: String,
    warehouse: String,
    hub: String,
    status: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Store = mongoose.model('Store', storeSchema);

var query = Store.find();
var storeLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            storeLength = count;
        }
});

async function createStore(data)
{
    storeLength = storeLength + 1;
    const store = new Store({
        store_id: storeLength,
        store_name: data.name,
        partner_id: 3,
        description: data.description,
        city: data.city,
        warehouse: data.warehouse,
        hub: data.hub,
        status:data.status,
        isDelete: false

    });
    const result = await store.save();
    console.log(result);
}
async function getStore()
{
    return Store.find({"isDelete": false});
}

async function getStoreByWarehouseCityHub(warehouse, city, hub)
{
    return Store.find({"isDelete": false, "warehouse" : warehouse, "city" : city, "hub": hub});
}

async function editStore(data)
{
    const updateddata = await Store.updateOne({"store_id" : data.id},{"store_name" :data.name, "description":data.description, "city": data.city, "warehouse": data.warehouse, "hub": data.hub, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

async function deleteStore(data)
{
    const updateddata = await Store.updateOne({"store_id" : data.store_id},{"store_name" :data.store_name, "description":data.description, "city": data.city, "isDelete":data.isDelete,"warehouse": data.warehouse, "hub": data.hub, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

module.exports = { createStore, getStore, editStore, deleteStore, getStoreByWarehouseCityHub};
