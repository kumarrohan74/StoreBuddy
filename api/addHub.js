//header files
const mongoose = require('mongoose');
;
//warehouse schema
const hubSchema = new mongoose.Schema({
    hub_id: Number,
    hub_name: String,
    partner_id: Number,
    description: String,
    status: Number,
    created_at: {type: Date, default: Date.now }
});

//create hub api
const Hub = mongoose.model('Hub', hubSchema);
async function createHub(data)
{
    const hub = new Hub({
        hub_id: data.hubid,
        hub_name: data.hubname,
        partner_id: data.partnerid,
        description: data.hubdesc,
        status: data.hubstatus
    });
    const result = await hub.save();
    console.log(result);
}
async function getHub()
{
    const hub = await Hub.find();
    console.log(hub);
    
    
}
module.exports = { createHub, getHub};
