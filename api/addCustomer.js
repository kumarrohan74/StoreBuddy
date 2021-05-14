//header files
const mongoose = require('mongoose');

//customer schema
const customerSchema = new mongoose.Schema({
    customer_id: Number,
    account_type: String,
    billing_master_id: Number,
    device_type: String,
    email: String,
    facebook_id: String,
    primary_mobile_no: Number,
    secondary_mobile_no: Number,
    date_of_birth: Date,
    passowrd: String,
    profile_picture: String,
    status: String,
    customer_name: String,
    andriod_push_token: String,
    ios_push_token: String,
    customer_type: String,
    loyality_type: String,
    verified_mobile_status: Number,
    referal_code: String,
    refered_by_code: String,
    onboarding: String,
    delivery_sequence: Number,
    device_id: Number,
    new_user_flag: Number,
    partner_id: Number,
    app_version: String,
    created_at: {type: Date, default: Date.now }
});

//create product api
const Customer = mongoose.model('Customer', customerSchema);
async function createCustomer(data)
{
    const customer = new Customer({
        customer_id: data.customerid,
        account_type: data.acctype,
        billing_master_id: data.billmasterid,
        device_type: data.devicetype,
        email: data.customeremail,
        facebook_id: data.fbid,
        primary_mobile_no: data.primaryphno,
        secondary_mobile_no: data.secondaryphno,
        date_of_birth: data.dob,
        passowrd: data.pwd,
        profile_picture: data.cusdp,
        status: data.cusstatus,
        customer_name: data.cusname,
        andriod_push_token: data.cusandtoken,
        ios_push_token: data.cusiostoken,
        customer_type: data.custype,
        loyality_type: data.cusloltype,
        verified_mobile_status: data.cusverstatus,
        referal_code: data.refcode,
        refered_by_code: data.refbycode,
        onboarding: data.onboarding,
        delivery_sequence: data.delsequence,
        device_id: data.deviceid,
        new_user_flag: data.newuserflag,
        partner_id: data.partnerid,
        app_version: data.appversion,
    });
    const result = await customer.save();
    console.log(result);
}
async function getCustomers()
{
    const customers = await Customer.find();
    console.log(customers);
    
    
}
module.exports = { createCustomer, getCustomers};
