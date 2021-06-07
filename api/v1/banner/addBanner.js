//HEADER FILES
const mongoose = require('mongoose');
//BANNER  SCHEMA
const bannerSchema = new mongoose.Schema({
    bannerId: { type: Number, default: 0 },
    partnerId: String,
    categoryId: String,
    subCategoryId: String,
    bannerName: String,
    bannerUrl: String,
    promoUrl: String,
    description: String,
    bannerType: String,
    bannerPage: [],
    bannerLocation: [],
    status: String,
    priority: String,
    startAt: { type: Date },
    endAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: Date }
});

//CREATE TABLE ON DB
const Banner = mongoose.model('Banner', bannerSchema);

var query = Banner.find();
var bannerLength = 0;
query.count(function (err, count) {
    if (err) console.log(err)
    else {
        bannerLength = count;
    }
});

async function createBanner(data) {
    bannerLength = bannerLength + 1;
    const banner = new Banner({
        bannerId: bannerLength,
        partnerId: data.partnerId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        bannerName: data.bannerName,
        bannerUrl: data.bannerUrl,
        promoUrl: data.promoUrl,
        description: data.description,
        bannerType: data.bannerType,
        bannerPage: data.bannerPage,
        bannerLocation: data.bannerLocation,
        status: data.status,
        priority: data.priority,
        startAt: data.startAt,
        endAt: data.endAt,
        createdBy: data.createdBy,
        updatedAt: data.updatedAt,
    });

    const result = await banner.save();
    return result;
    // console.log(result);
}

//UPDATE BANNER  SERVICE 
async function updateBanner(data) {
    const updated = await Banner.findOneAndUpdate({ "bannerId": data.bannerId }, data, { new: true });
    return updated;
}

//GET BY ID  BANNER SERVICE
async function getBannerId(bannerId) {
    return await Banner.findOne({ "bannerId": bannerId });
}

//GET ALL THE DATA  BANNER SERVICE
async function getBanner() {
    return Banner.find();
}

//DELETE THE BANNER SERVICE
async function deleteBanner(data) {
    return await Banner.deleteOne({ "bannerId": data });
}

module.exports = { createBanner, getBanner, updateBanner, deleteBanner, getBannerId };