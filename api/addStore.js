//header files
const mongoose = require('mongoose');
;
//warehouse schema
const storeSchema = new mongoose.Schema({
    store_id: Number,
    store_name: String,
    partner_id: Number,
    description: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Store = mongoose.model('Store', storeSchema);
async function createStore(data)
{
    const store = new Store({
        store_id: data.storeid,
        store_name: data.storename,
        partner_id: data.partnerid,
        description: data.storedesc,
    });
    const result = await store.save();
    console.log(result);
}
async function getStore()
{
    const store = await Store.find();
    console.log(store);
    
    
}
module.exports = { createStore, getStore};
