
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    customerName:{
        type:String, 
    },
    email:{
        type:String,
    },
    phoneNumberone:{
        type:Number,
    },
    phoneNumbertwo:{
        type:Number,
    },
    created_at: {
        type: Date, 
        default: Date.now 
    },
    dob: {
        type: Date,
        default: Date.now
    },
    addressone:{
        type:String,
    },
    addresstwo:{
        type:String,
    },
    loyalty:[],
    localityId:{
        type:String,
    },
    geolocationDetails:
        {
            address:{
                type:String,
            },
            area:{
                type:String,
            },
            city:{
                type:String,
            },
            pincode:{
                type:String,
            },
            state:{
                type:String,
            },
            lat:{
                type:String,
            },
            lng:{
                type:String,
            }
        }
})
const Profile = mongoose.model('PROFILE', profileSchema);

module.exports = Profile;