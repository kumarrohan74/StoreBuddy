//header files
const mongoose = require('mongoose');
;
//warehouse schema
const localitySchema = new mongoose.Schema({
    locality_id: Number,
    locality_name: String,
    partner_id: Number,
    description: String,
    status: Number,
    store_id: Number,
    store_name: String,
    created_at: {type: Date, default: Date.now }
});

//create hub api
const Locality = mongoose.model('Locality', localitySchema);
async function createLocality(data)
{
    const locality = new Locality({
        locality_id: data.localityid,
        locality_name: data.localityname,
        partner_id: data.partnerid,
        description: data.localitydesc,
        status: data.localitystatus,
        store_id: data.locstoreid,
        store_name: data.locstorename

    });
    const result = await locality.save();
    console.log(result);
}
async function getLocality()
{
    const locality = await Locality.find();
    console.log(hub);
    
    
}
module.exports = { createLocality, getLocality};
