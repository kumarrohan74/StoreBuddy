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
    created_at: {type: Date, default: Date.now }
});

//create product api
const Warehouse = mongoose.model('Warehouse', warehouseSchema);
async function createWarehouse(data)
{
    const warehouse = new Warehouse({
        warehouse_id: data.warehouseid,
        warehouse_name: data.warehousename,
        partner_id: data.partnerid,
        description: data.warehousedesc,
        status: data.warehousestatus
    });
    const result = await warehouse.save();
    console.log(result);
}
async function getWarehouse()
{
    const warehouse = await Warehouse.find();
    console.log(warehouse);
    
    
}
module.exports = { createWarehouse, getWarehouse};
