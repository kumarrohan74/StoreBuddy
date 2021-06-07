const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    partner_id: {type:Number,default: 0},
    partner_name: String,
    phone_number: Number,
    status: String,
    email: String,
    app_name: String,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

const Partner = mongoose.model('Partner', partnerSchema);

var query = Partner.find();
var partnerLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            partnerLength = count;
        }
});

async function createPartner(data)
{
    partnerLength = partnerLength + 1;
    const partner = new Partner({
        partner_id:partnerLength,
        partner_name: data.name,
        phone_number: data.phoneNumber,
        status: data.status,
        email: data.email,
        app_name: data.appName,
    });

    const result = await partner.save();
}

async function getPartner(id)
{
    return Partner.find({"partner_id": id});
}

module.exports = { createPartner, getPartner};