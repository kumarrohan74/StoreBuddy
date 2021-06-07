const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const addCategory = require('./api/v1/Inventory/addCategory');
const addSubCategory = require('./api/v1/Inventory/addSubcategory');
const addBrand = require('./api/v1/Inventory/addBrand');
const addProduct = require('./api/v1/Inventory/addProduct');
const addSKU = require('./api/v1/Inventory/addSKU');
const AddProfile = require('./api/v1/addProfile');
const addBanner = require('./api/v1/banner/addBanner');
const addCity = require('./api/v1/Locality/addCity');
const addWarehouse = require('./api/v1/Locality/addWarehouse');
const addHub = require('./api/v1/Locality/addHub');
const addStore = require('./api/v1/Locality/addStore');
const addLocality = require('./api/v1/Locality/addLocality');
const addPartner = require('./api/v1/addPartner');
const dotenv = require('dotenv');
//----------- Mongodb --------------//
dotenv.config({ path: './config.env' })
// require('./db/conn');
//----------- Mongodb --------------//



/*const addProduct = require('./api/addProduct');
const addCategory = require('./api/v1/addCategory');
const addSubCategory = require('./api/addSubCategory');
const addSKU = require('./api/addSKU');
const addCustomer = require('./api/addCustomer');
const addWarehouse = require('./api/addWarehouse');
const addHub = require('./api/addHub');
const addStore = require('./api/addStore');
const addCity = require('./api/addCity');
const addLocality = require('./api/addLocality');
const addAddress = require('./api/addAddress');
const addOrder = require('./api/addOrder');
const addBrand = require('./api/addBrand');*/


var cors = require('cors');


//connection to database
var connection = mongoose.connect(process.env.DATABASE)
    // mongodb+srv://nitesh:mErnstAck@2021@cluster0.ypzym.mongodb.net/mernstackdb?retryWrites=true&w=majority
    .then(() => console.log('Connected'))
    .catch(err => console.error('could not connect'));

const app = express();
const router = express.Router();
app.use(cors());
//assigning port no.
const port = process.env.PORT || 5000;

/*if(process.env.NODE_ENV === 'production') {
    app.use(express.static('/stores_buddy_epanel/build'))
}*/

app.listen(port, console.log(`server started on ${port}`));


//middleware body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


//static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(router);
var multer = require('multer');
const { json } = require('express');


var Storage = multer.diskStorage({
    destination: "./public/uploads/"
});


var upload = multer({ storage: Storage }).single('categoryImage');
var partnerId = 1;
/*  ---------------------------------------------------Partner------------------------------------------*/

router.post('/v1/addpartner', (req, res) => {

    if(res.statusCode === 200)
            {
                addPartner.createPartner(req.body);
                res.json({"success":"Partner Added Successfully"});
            }
});

router.get('/v1/getpartner', (req, res) => {
    addPartner.getPartner(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
});



/*  ---------------------------------------------------Product------------------------------------------*/

//Add Product API
router.post('/v1/addproduct', (req, res) => {

    if(res.statusCode === 200)
            {
                addProduct.createProduct(req.body,partnerId);
            }
});

router.post('/v1/editproduct', (req, res) => {
    console.log(req.body);
    if (res.statusCode === 200) {
        addProduct.editProduct(req.body);
        //res.redirect('success.html');
    }

});

router.post('/v1/deleteproduct', (req, res) => {
    if (res.statusCode === 200) {
        addProduct.deleteProduct(req.body);
    }

});

router.get('/v1/getproduct', (req, res) => {
    addProduct.getProduct(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
});

router.get('/v1/getproductid', (req, res) => {
    addProduct.getProductId(req.query.productName, req.query.productPriority).then(result => res.json(result)).catch(err => console.log("error"));
});


/*  ---------------------------------------------------Category------------------------------------------*/

//Add Category API

router.post('/v1/addcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                var dp = req.files.categoryImage;
                dp.mv('public/uploads/'+dp.name);
                addCategory.createCategory(req.body,dp.name,partnerId);
                //res.redirect('success.html');
            }
});

router.post('/v1/editcategory', (req,res) => {
    if(res.statusCode === 200)
    {
        var dp = req.files.categoryImage;
        dp.mv('public/uploads/'+dp.name);
        addCategory.editCategory(req.body,dp.name);
        //res.redirect('success.html');
    }

});


router.post('/v1/deletecategory', (req,res) => {
    if(res.statusCode === 200)
    {
        addCategory.deleteCategory(req.body);
        //res.redirect('success.html');
    }

});

router.get('/v1/getcategory', (req, res) => {
    addCategory.getCategory(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
});



/*  ---------------------------------------------------Sub Category------------------------------------------*/

//Add Subcategory API

router.post('/v1/addsubcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                var dp = req.files.subCategoryImage;
                dp.mv('public/uploads/'+dp.name);
                addSubCategory.createSubCategory(req.body,dp.name,partnerId);
                //res.redirect('success.html');
            }
   
   
});

router.post('/v1/editsubcategory', (req,res) => {
    if(res.statusCode === 200)
    {
        var dp = req.files.subCategoryImage;
        dp.mv('public/uploads/'+dp.name);
        addSubCategory.editSubCategory(req.body,dp.name);
        //res.redirect('success.html');
    }
})

router.post('/v1/deletesubcategory', (req,res) => {
    console.log(req.body);
    console.log("here 1");
    if(res.statusCode === 200)
    {
        addSubCategory.deleteSubCategory(req.body);
        res.redirect('success.html');
    }

})

router.get('/v1/getsubcategory', (req,res) => {
    addSubCategory.getSubCategory(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})
    


/*  ---------------------------------------------------Brand------------------------------------------*/



router.post('/v1/addbrand',(req,res) => {
    if(res.statusCode === 200)
            {
                var dp = req.files.brandImage;
                dp.mv('public/uploads/'+dp.name);
                addBrand.createBrand(req.body,dp.name,partnerId);
                //res.redirect('success.html');
            }
});

router.post('/v1/editbrand', (req, res) => {
    if (res.statusCode === 200) {
        var dp = req.files.brandImage;
        dp.mv('public/uploads/' + dp.name);
        addBrand.editBrand(req.body, dp.name);
    }

});


router.post('/v1/deletebrand', (req,res) => {
    if(res.statusCode === 200)
    {
        addBrand.deleteBrand(req.body);
        //res.redirect('success.html');
    }

})

router.get('/v1/getbrand', (req, res) => {
    addBrand.getBrand(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})



/*  ---------------------------------------------------SKU------------------------------------------*/


router.post('/v1/addsku',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKU(req.body,partnerId);
                //res.redirect('success.html');
            }
});

router.post('/v1/addskuinline',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKUInLine(req.body,partnerId);
                //res.redirect('success.html');
            }
});

router.post('/v1/editsku', (req, res) => {
        addSKU.editSKU(req.body);
        res.redirect('success.html');
    }
);

router.post('/v1/deletesku', (req, res) => {
    if (res.statusCode === 200) {
        addSKU.deleteSKU(req.body);
        //res.redirect('success.html');
    }

})

router.get('/v1/getsku', (req, res) => {
    var obj = Object.keys(req.query);
    var num = Number(obj)
    console.log(typeof (num));
    addSKU.getSKU(num,partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

//GET ALL THE CUSTOMER DATA
router.get('/v1/getCustomerProfileList', (req, res) => {
    const data = AddProfile.find().then(result => res.json(result)).catch(err => console.log("error"));
    console.log(data);
});

//UPDATE THE PROFILE DATA
router.put('/v1/customerProfileUpdate/:id', async (req, res) => {
    const { customerName, email, phoneNumberone, phoneNumbertwo, created_at, dob, addressone, addresstwo, loyalty, geolocationDetails } = req.body;
    try {
        const userExist = await AddProfile.findOne({ _id: req.params.id });
        if (customerName != null) { userExist.customerName = customerName; }
        if (email != null) { userExist.email = email; }
        if (phoneNumberone != null) { userExist.phoneNumberone = phoneNumberone; }
        if (phoneNumbertwo != null) { userExist.phoneNumbertwo = phoneNumbertwo; }
        if (created_at != null) { userExist.created_at = created_at; }
        if (dob != null) { userExist.dob = dob; }
        if (dob != addressone) { userExist.addressone = addressone; }
        if (dob != addresstwo) { userExist.addresstwo = addresstwo; }
        if (dob != loyalty) { userExist.loyalty = loyalty; }
        if (dob != geolocationDetails) { userExist.geolocationDetails = geolocationDetails; }

        const data = await userExist.save();
        console.log(data);
        res.status(201).json({ Data: data });
    } catch (err) {
        console.log("Error")
    }
});

//GET THE CUSTOMER DETAILS
router.get('/v1/getCustomerDetails/:id', (req, res) => {
    AddProfile.findOne({ _id: req.params.id }).then(result => res.json(result)).catch(err => console.log("error"));
});

//GET THE CUSTOMER DETAILS
router.get('/v1/deleteCustomer/:id', (req, res) => {
    AddProfile.findByIdAndDelete({ _id: req.params.id }).then(result => res.json(result)).catch(err => console.log("error"));
});


/*  ---------------------------------------------------City------------------------------------------*/

router.post('/v1/addcity',(req,res) => {
    if(res.statusCode === 200)
            {
                addCity.createCity(req.body,partnerId);
                //res.redirect('success.html');
            }
});

router.post('/v1/editcity', (req,res) => {
    if(res.statusCode === 200)
    {
        addCity.editCity(req.body);
    }

});

router.post('/v1/deletecity', (req,res) => {
    if(res.statusCode === 200)
    {
        addCity.deleteCity(req.body);
    }

})

router.get('/v1/getcity', (req,res) => {
    addCity.getCity(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

/*  ---------------------------------------------------Warehouse------------------------------------------*/

router.post('/v1/addwarehouse',(req,res) => {
    if(res.statusCode === 200)
            {
                addWarehouse.createWarehouse(req.body.data,partnerId);
                //res.redirect('success.html');
            }
});

router.get('/v1/getwarehouse', (req,res) => {
    addWarehouse.getWarehouse(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.get('/v1/getwarehousebycity', (req,res) => {
    addWarehouse.getWarehouseByCity(req.query.cityId,partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/editwarehouse', (req,res) => {
    if(res.statusCode === 200)
    {
        addWarehouse.editWarehouse(req.body);
    }

});

router.post('/v1/deletewarehouse', (req,res) => {
    if(res.statusCode === 200)
    {
        addWarehouse.deleteWarehouse(req.body);
    }

})


/*  ---------------------------------------------------Hub------------------------------------------*/

app.post('/v1/addhub',(req,res) => {
    if(res.statusCode === 200)
            {
                addHub.createHub(req.body, partnerId);
            }
});

router.post('/v1/edithub', (req,res) => {
    if(res.statusCode === 200)
    {
        addHub.editHub(req.body);
    }

});

router.get('/v1/gethub', (req,res) => {
    addHub.getHub(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.get('/v1/gethubbywarehouse', (req,res) => {
    addHub.getHubByWarehouse("5",partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/deletehub', (req,res) => {
    if(res.statusCode === 200)
    {
        addHub.deleteHub(req.body);
    }

})

app.get('/v1/gethubbywarehousecity', (req,res) => {
    if(res.statusCode === 200)
            {
                addHub.getHubByWarehouseCity(req.query.warehouseId, req.query.cityId,partnerId).then(result => res.json(result)).catch(err => console.log("error"));
            }
})


/*  ---------------------------------------------------Store------------------------------------------*/

app.post('/v1/addstore',(req,res) => {
    if(res.statusCode === 200)
            {
                addStore.createStore(req.body,partnerId);
            }
});

router.post('/v1/editstore', (req,res) => {
    if(res.statusCode === 200)
    {
        addStore.editStore(req.body);
    }

});

app.get('/v1/getstorebywarehousecityhub', (req,res) => {
    if(res.statusCode === 200)
     {
        addStore.getStoreByWarehouseCityHub(req.query.warehouseId, req.query.cityId, req.query.hubId,partnerId).then(result => res.json(result)).catch(err => console.log("error"));
     }
})

router.get('/v1/getstorebywarehouse', (req,res) => {
    addStore.getStoreByWarehouse("5",partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.get('/v1/getstore', (req,res) => {
    addStore.getStore(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/deletestore', (req,res) => {
    if(res.statusCode === 200)
    {
        addStore.deleteStore(req.body);
    }

})


/*  ---------------------------------------------------Locality------------------------------------------*/

app.post('/v1/addlocality',(req,res) => {
    if(res.statusCode === 200)
            {
                addLocality.createLocality(req.body,partnerId);
                res.status(201).json({message: "Added successfull!"})

            }
});

router.post('/v1/editlocality', (req,res) => {
    if(res.statusCode === 200)
    {
        addLocality.editLocality(req.body);
    }

});

router.get('/v1/getlocalitybywarehouse', (req,res) => {
    addLocality.getLocalityByWarehouse("5",partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/deletelocality', (req,res) => {
    if(res.statusCode === 200)
    {
        addLocality.deleteLocality(req.body);
    }

});

router.get('/v1/getlocality', (req,res) => {
    addLocality.getLocality(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})

/*  ---------------------------------------------------Order------------------------------------------*/

router.post('/v1/addorder',(req,res) => {
    if(res.statusCode === 200)
            {
                addOrder.createOrder(req.body,partnerId);
            }
});

router.post('/v1/editorder', (req,res) => {
    if(res.statusCode === 200)
    {
        addOrder.editOrder(req.body);
    }
});

router.get('/v1/getorders', (req,res) => {
    addOrder.getOrders(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Delivery Boy------------------------------------------*/

router.post('/v1/adddeliveryboy',(req,res) => {
    if(res.statusCode === 200)
            {
                addDeliveryBoy.createDeliveryBoy(req.body,partnerId);
            }
});

router.post('/v1/editdeliveryboy', (req,res) => {
    if(res.statusCode === 200)
    {
        addDeliveryBoy.editDeliveryBoy(req.body);
    }
});

router.get('/v1/getdeliveryboy', (req,res) => {
    addDeliveryBoy.getDeliveryBoy(partnerId).then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Customer------------------------------------------*/

/*app.post('/addcustomerpage',(req,res) => {
    res.redirect('addcustomer.html');
});

app.post('/addcustomer',(req,res) => {
    if(res.statusCode === 200)
            {
                addCustomer.createCustomer(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------Address------------------------------------------*/


/*app.post('/addaddresspage',(req,res) => {
    res.redirect('addaddress.html');
});

app.post('/addaddress',(req,res) => {
    if(res.statusCode === 200)
            {
                addAddress.createAddress(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});





//Add Category API
router.post('/v1/addOrder', (req, res) => {
    console.log(req.body);
    if (res.statusCode === 200) {
        console.log("req file");
        console.log(req.body);
        console.log(req.files);
        var dp = req.files.categoryImage;
        dp.mv('public/uploads/' + dp.name);
        addCategory.createCategory(req.body, dp.name);
        res.redirect('success.html');
    }
});

router.post('/v1/editcategory', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    if (res.statusCode === 200) {
        var dp = req.files.categoryImage;
        dp.mv('public/uploads/' + dp.name);
        addCategory.editCategory(req.body, dp.name);
        res.redirect('success.html');
    }

});


/*  ---------------------------------------------------Profile creation------------------------------------------*/

//addProfile route async await
// router.post('/v1/addprofile', async (req, res)=>{
//     console.log(req.body);
//     const {customerName, email, phoneNumberone, phoneNumbertwo, created_at, dob, addressone,addresstwo } = req.body;
//     if(!customerName || !email || !phoneNumberone ){
//         return res.status(422).json({error: "Plz insert details"})
//     }
//     try{
//         const userExist = await AddProfile.findOne({email : email});

//     if(userExist){
//         return res.status(422).json({error: "Email already exist"});
//     }
//     const addProfile = new AddProfile({customerName, email, phoneNumberone, phoneNumbertwo, created_at, dob, addressone,addresstwo});
//     // const userRegister = await addProfile.save();
//     // if(userRegister){
//     //     res.status(201).json({message: "addProfile successfull!"});
//     // }else{
//     //     res.status(500).json({error:"Failed to addProfile!!"});
//     // }
//         await addProfile.save();
//         res.status(201).json({message: "Profile created successfuly!"});

//     }catch(err){
//         console.log("Error");
//     }

// });  

//profileCreation route async await

//route async await
router.post('/v1/profile', async (req, res)=>{
    console.log(req.body);
    const {customerName, email, phoneNumberone, phoneNumbertwo, created_at, dob, addressone, addresstwo, loyalty,geolocationDetails,localityId} = req.body;
    if(!customerName || !email || !phoneNumberone || !localityId){
        return res.status(422).json({error: "Plz insert details"})
    }
    try{
        const userExist = await AddProfile.findOne({email : email});
    if(userExist){
        return res.status(422).json({error: "Email already exist"});
    }
    const addProfile = new AddProfile({customerName, email, phoneNumberone, phoneNumbertwo, created_at, dob, addressone,addresstwo,loyalty,geolocationDetails,localityId});
        await addProfile.save();
        res.status(201).json({ message: "Signup successfull!" });
    } catch (err) {
        console.log("Error")
    }

});


//signup route async await

/*  ---------------------------------------------------BANNER API CREATION------------------------------------------*/
//ADD BANNER API 
router.post('/v1/addBanner', (req, res) => {
    console.log(req.body);
    if (res.statusCode === 200) {
        addBanner.createBanner(req.body).then(result => res.json(result)).catch(err => console.log("error"));
    }
});

//UPDATE BANNER 
router.put('/v1/updateBanner', (req, res) => {
    // console.log(req.body);
    addBanner.updateBanner(req.body).then(result => res.json(result)).catch(err => console.log("error"));
});

//DELETE BANNER 
router.delete('/v1/deleteBanner/:bannerId', (req, res) => {
    if (res.statusCode === 200) {
        console.log(typeof (req.params));
        addBanner.deleteBanner(req.params.bannerId).then(result => res.json({ message: "Successfully deleted!!" })).catch(err => console.log("error"));
        console.log("ID :" + req.params.bannerId + ":Successfully deleted!!");
    }
})

//GET THE ALL BANNER 
router.get('/v1/getBanner', (req, res) => {
    addBanner.getBanner().then(result => res.json(result)).catch(err => console.log("error"));
})
//GET THE  BANNER DETAILS
router.get('/v1/getBannerDetails/:bannerId', (req, res) => {
    console.log(req.params.bannerId);
    addBanner.getBannerId(req.params.bannerId).then(result => res.json(result)).catch(err => console.log("error"));
})

// router.get('/v1/getCustomerDetails/:id', (req, res) => {
//     AddProfile.findOne({ _id: req.params.id }).then(result => res.json(result)).catch(err => console.log("error"));
// });