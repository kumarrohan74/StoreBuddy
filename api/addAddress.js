//header files
const mongoose = require('mongoose');

//customer schema
const addressSchema = new mongoose.Schema({
    address_id: Number,
    customer_id: Number,
    door_no: String,
    address_title: String,
    street_name: String,
    locality_name: String,
    city: String,
    state: String,
    pincode: Number,
    latitude: Number,
    longitude: Number,
    address_line1: String,
    status: String,
    locality_id: Number,
    status: Number,
    address_type: Number,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Address = mongoose.model('Address', addressSchema);
async function createAddress(data)
{
    const address = new Address({
        address_id: data.addressid,
        customer_id: data.addcustomerid,
        door_no: data.adddoorno,
        address_title: data.addtitle,
        street_name: data.addstreetname,
        locality_name: data.addlocalityname,
        city: data.addcity,
        state: data.addstate,
        pincode: data.addpincode,
        latitude: data.addlatitude,
        longitude: data.addlongitude,
        address_line1: data.addaddressline1,
        status: data.addstatus,
        locality_id: data.addlocalityid,
        address_type: data.addaddresstype,
    });
    const result = await address.save();
    console.log(result);
}
async function getAddress()
{
    const address = await Address.find();
    console.log(address);
    
    
}
module.exports = { createAddress, getAddress};
