//header files
const mongoose = require('mongoose');
;
//warehouse schema
const citySchema = new mongoose.Schema({
    city_id: {type :Number, unique: true},
    city_name: String,
    partner_id: Number,
    description: String,
    status: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const City = mongoose.model('City', citySchema);

var query = City.find();
var cityLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            cityLength = count;
        }
});

async function createCity(data)
{
    cityLength = cityLength + 1;
    const city = new City({
        city_id: cityLength,
        city_name: data.name,
        partner_id: 3,
        description: data.description,
        isDelete: false,
        status: data.status
    }); 
    const result = await city.save();
    console.log(result);
}

async function getCity()
{
   return City.find({"isDelete" : false});
}

async function editCity(data)
{
    const updateddata = await City.updateOne({"city_id" : data.id},{"city_name" :data.name, "description":data.description, "status": data.status,  "updated_at": new Date()},{upsert: true});
}

async function deleteCity(data)
{
    const updateddata = await City.updateOne({"city_id" : data.city_id},{"city_name" :data.city_name, "description":data.description,"isDelete" : data.isDelete, "updated_at": new Date()},{upsert: true});
}


module.exports = { createCity, getCity, editCity, deleteCity};
