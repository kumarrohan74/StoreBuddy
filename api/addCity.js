//header files
const mongoose = require('mongoose');
;
//warehouse schema
const citySchema = new mongoose.Schema({
    city_id: Number,
    city_name: String,
    partner_id: Number,
    description: String,
    status: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const City = mongoose.model('City', citySchema);
async function createCity(data)
{
    const city = new City({
        city_id: data.cityid,
        city_name: data.cityname,
        partner_id: data.partnerid,
        description: data.citydesc,
        status: data.citystatus
    });
    const result = await city.save();
    console.log(result);
}
async function getCity()
{
    const city = await City.find();
    console.log(city);
    
    
}
module.exports = { createCity, getCity};
