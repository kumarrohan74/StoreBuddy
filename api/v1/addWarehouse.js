//header files
const mongoose = require('mongoose');
;
//warehouse schema
const warehouseSchema = new mongoose.Schema({
    warehouse_id: Number,
    warehouse_name: String,
    partner_id: Number,
    description: String,
    status: Number,
    city: String,
    isDelete: Boolean,
    created_at: {type: Date, default: Date.now },
    updated_at: {type: Date}
});

//create product api
const Warehouse = mongoose.model('Warehouse', warehouseSchema);

var query = Warehouse.find();
var wareHouseLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else 
        {
            wareHouseLength = count;
        }
});

async function createWarehouse(data)
{
    wareHouseLength =  wareHouseLength + 1;
    const warehouse = new Warehouse({
        warehouse_id:  wareHouseLength,
        warehouse_name: data.name,
        partner_id: 3,
        city: data.city,
        description: data.description,
        isDelete: false,
        status: data.status
    });
    const result = await warehouse.save();
    console.log(result);
}
async function getWarehouse()
{
    return Warehouse.find({"isDelete" : false});
}

async function getWarehouseByCity(city) {
    return Warehouse.find({"isDelete" : false, "city" : city});
}

async function editWarehouse(data)
{
    console.log("coming here");
    const updateddata = await Warehouse.updateOne({"warehouse_id" : data.id},{"warehouse_name" :data.name, "description":data.description, "status": data.status, "city" : data.city, "updated_at": new Date()},{upsert: true});
}

async function deleteWarehouse(data)
{
    console.log("delete");
    console.log(data);
    const updateddata = await Warehouse.updateOne({"warehouse_id" : data.warehouse_id},{"warehouse_name" :data.warehouse_name, "description":data.description,"isDelete" : data.isDelete, "updated_at": new Date()},{upsert: true});
}

module.exports = { createWarehouse, getWarehouse, editWarehouse, deleteWarehouse, getWarehouseByCity};
