const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const addCategory = require('./api/v1/addCategory');
const addSubCategory = require('./api/v1/addSubCategory');
const addBrand = require('./api/v1/addBrand');
const addProduct = require('./api/v1/addProduct');
const addSKU = require('./api/v1/addSKU');
const addCity = require('./api/v1/addCity');
const addWarehouse = require('./api/v1/addWarehouse');
const addHub = require('./api/v1/addHub');
const addStore = require('./api/v1/addStore');
const addLocality = require('./api/v1/addLocality');
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
var connection = mongoose.connect('mongodb+srv://kumar_rohan:vEd7lC6yvPSq6WIr@storebuddycluster.zgcmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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

app.listen(port,console.log(`server started on ${port}`));


//middleware body parser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


//static folder
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());
app.use(router);
var multer = require('multer');

 
var Storage = multer.diskStorage({
    destination: "./public/uploads/"
});


var upload = multer({ storage: Storage }).single('categoryImage');
/*  ---------------------------------------------------Product------------------------------------------*/

//Add Product API
router.post('/v1/addproduct', (req, res) => {
    console.log(req.body);
    if(res.statusCode === 200)
            {
                console.log("body");
                console.log(req.body);
                console.log("files");
                console.log(req.files);
                var dp1 = req.files.primaryImage;
                dp1.mv('public/uploads/'+dp1.name);
                var dp2 = req.files.primaryImage;
                dp2.mv('public/uploads/'+dp2.name);
                addProduct.createProduct(req.body,dp1.name,dp2.name);
            }
});

router.post('/v1/editproduct', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addProduct.editProduct(req.body.formData);
        res.redirect('success.html');
    }

});

router.post('/v1/deleteproduct', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addProduct.deleteProduct(req.body);
    }

})

router.get('/v1/getproduct', (req,res) => {
    addProduct.getProduct().then(result => res.json(result)).catch(err => console.log("error"));
})

router.get('/v1/getproductid', (req,res) => {
    console.log("called product id");
    addProduct.getProductId(req.query.productName, req.query.productPriority).then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Category------------------------------------------*/

//Add Category API
router.post('/v1/addcategory',(req,res) => {
 
   console.log(req.body);
    if(res.statusCode === 200)
            {
                console.log("req file");
                console.log(req.body);
                console.log(req.files);
                var dp = req.files.categoryImage;
                dp.mv('public/uploads/'+dp.name);
                addCategory.createCategory(req.body,dp.name);
                res.redirect('success.html');
            }
});

router.post('/v1/editcategory', (req,res) => {
    console.log(req.body);
    console.log(req.files);
    if(res.statusCode === 200)
    {
        var dp = req.files.categoryImage;
        dp.mv('public/uploads/'+dp.name);
        addCategory.editCategory(req.body,dp.name);
        res.redirect('success.html');
    }

});

router.post('/v1/deletecategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addCategory.deleteCategory(req.body);
        res.redirect('success.html');
    }

})

router.get('/v1/getcategory', (req,res) => {
    addCategory.getCategory().then(result => res.json(result)).catch(err => console.log("error"));
});



/*  ---------------------------------------------------Sub Category------------------------------------------*/

//Add Subcategory API
router.post('/v1/addsubcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log("req file");
                console.log(req.body);
                console.log(req.files);
                var dp = req.files.subCategoryImage;
                dp.mv('public/uploads/'+dp.name);
                addSubCategory.createSubCategory(req.body,dp.name);
                res.redirect('success.html');
            }
   
   
});

router.post('/v1/editsubcategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        var dp = req.files.subCategoryImage;
        dp.mv('public/uploads/'+dp.name);
        addSubCategory.editSubCategory(req.body,dp.name);
        res.redirect('success.html');
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
    addSubCategory.getSubCategory().then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Brand------------------------------------------*/


router.post('/v1/addbrand',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log("req file");
                console.log(req.body);
                console.log(req.files);
                var dp = req.files.brandImage;
                dp.mv('public/uploads/'+dp.name);
                addBrand.createBrand(req.body,dp.name);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

router.post('/v1/editbrand', (req,res) => {
    if(res.statusCode === 200)
    {
        var dp = req.files.brandImage;
        dp.mv('public/uploads/'+dp.name);
        addBrand.editBrand(req.body,dp.name);
    }

});

router.post('/v1/deletebrand', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addBrand.deleteBrand(req.body);
        res.redirect('success.html');
    }

})

router.get('/v1/getbrand', (req,res) => {
    addBrand.getBrand().then(result => res.json(result)).catch(err => console.log("error"));
})



/*  ---------------------------------------------------SKU------------------------------------------*/

router.post('/v1/addsku',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKU(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

router.post('/v1/addskuinline',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKUInLine(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

router.post('/v1/editsku', (req,res) => {
    console.log("called");
    if(res.statusCode === 200)
    {
        console.log(req.body);
        addSKU.editSKU(req.body);
        res.redirect('success.html');
    }

});

router.post('/v1/deletesku', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addSKU.deleteSKU(req.body);
        res.redirect('success.html');
    }

})

router.get('/v1/getsku', (req,res) => {
    var obj = Object.keys(req.query);
    var num = Number(obj)
    console.log(typeof(num));
    addSKU.getSKU(num).then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------City------------------------------------------*/

router.post('/v1/addcity',(req,res) => {
    console.log("city");
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addCity.createCity(req.body);
                res.redirect('success.html');
            }
});

router.post('/v1/editcity', (req,res) => {
    if(res.statusCode === 200)
    {
        addCity.editCity(req.body);
    }

});

router.post('/v1/deletecity', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addCity.deleteCity(req.body);
    }

})

router.get('/v1/getcity', (req,res) => {
    addCity.getCity().then(result => res.json(result)).catch(err => console.log("error"));
})

/*  ---------------------------------------------------Warehouse------------------------------------------*/

router.post('/v1/addwarehouse',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addWarehouse.createWarehouse(req.body.data);
                res.redirect('success.html');
            }
    console.log(req.body);
});

router.get('/v1/getwarehouse', (req,res) => {
    addWarehouse.getWarehouse().then(result => res.json(result)).catch(err => console.log("error"));
})

router.get('/v1/getwarehousebycity', (req,res) => {
    console.log(req.query);
    addWarehouse.getWarehouseByCity(req.query.city).then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/editwarehouse', (req,res) => {
    if(res.statusCode === 200)
    {
        console.log("body");
        console.log(req.body);
        addWarehouse.editWarehouse(req.body);
    }

});

router.post('/v1/deletewarehouse', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        console.log(req.body);
        addWarehouse.deleteWarehouse(req.body);
    }

})


/*  ---------------------------------------------------Hub------------------------------------------*/

app.post('/v1/addhub',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addHub.createHub(req.body);
            }
});

router.post('/v1/edithub', (req,res) => {
    if(res.statusCode === 200)
    {
        console.log("body");
        console.log(req.body);
        addHub.editHub(req.body);
    }

});

router.get('/v1/gethub', (req,res) => {
    addHub.getHub().then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/deletehub', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        console.log(req.body);
        addHub.deleteHub(req.body);
    }

})

app.get('/v1/gethubbywarehousecity', (req,res) => {
    if(res.statusCode === 200)
            {
                addHub.getHubByWarehouseCity(req.query.warehouse, req.query.city).then(result => res.json(result)).catch(err => console.log("error"));
            }
})


/*  ---------------------------------------------------Store------------------------------------------*/

app.post('/v1/addstore',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addStore.createStore(req.body);
            }
    console.log(req.body);
});

router.post('/v1/editstore', (req,res) => {
    if(res.statusCode === 200)
    {
        console.log("body");
        console.log(req.body);
        addStore.editStore(req.body);
    }

});

app.get('/v1/getstorebywarehousecityhub', (req,res) => {
    if(res.statusCode === 200)
     {
         console.log(req.query);
          addStore.getStoreByWarehouseCityHub(req.query.warehouse, req.query.city, req.query.hub).then(result => res.json(result)).catch(err => console.log("error"));
     }
})

router.get('/v1/getstore', (req,res) => {
    addStore.getStore().then(result => res.json(result)).catch(err => console.log("error"));
})

router.post('/v1/deletestore', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        console.log(req.body);
        addStore.deleteStore(req.body);
    }

})


/*  ---------------------------------------------------Locality------------------------------------------*/

app.post('/v1/addlocality',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addLocality.createLocality(req.body);
                res.redirect('success.html');
            }
});

router.post('/v1/editlocality', (req,res) => {
    if(res.statusCode === 200)
    {
        console.log("body");
        console.log(req.body);
        addLocality.editLocality(req.body);
    }

});

router.post('/v1/deletelocality', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        console.log(req.body);
        addLocality.deleteLocality(req.body);
    }

})

router.get('/v1/getlocality', (req,res) => {
    addLocality.getLocality().then(result => res.json(result)).catch(err => console.log("error"));
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



/*  ---------------------------------------------------Order------------------------------------------*/


/*app.post('/addorderpage',(req,res) => {
    res.redirect('addorder.html');
});

app.post('/addorder',(req,res) => {
    if(res.statusCode === 200)
            {
                addOrder.createOrder(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});*/