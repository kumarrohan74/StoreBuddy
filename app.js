//required files

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const addProduct = require('./api/addProduct');
const addCategory = require('./api/addCategory');
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
const addBrand = require('./api/addBrand');
const AutoIncrementFactory = require('mongoose-sequence');
var cors = require('cors');


//connection to database
var connection = mongoose.connect('mongodb://localhost/StoreBuddy')
    .then(() => console.log('Connected'))
    .catch(err => console.error('could not connect'));

const app = express();
const AutoIncrement = AutoIncrementFactory(connection);

app.use(cors());
//assigning port no.
const port = process.env.PORT || 5000;
app.listen(port,console.log(`server started on ${port}`));

//middleware body parser
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));


/*  ---------------------------------------------------Product------------------------------------------*/

//Add Product API
app.post('/addproduct', (req, res) => {
    console.log(req.body);
    if(res.statusCode === 200)
            {
                addProduct.createProduct(req.body);
                res.redirect('success.html');
            }
});

app.post('/editproduct', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addProduct.editProduct(req.body.formData);
        res.redirect('success.html');
    }

});

app.post('/deleteproduct', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addProduct.deleteProduct(req.body);
        res.redirect('success.html');
    }

})

app.get('/getproduct', (req,res) => {
    addProduct.getProduct().then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Category------------------------------------------*/

//Add Category API
app.post('/addcategory',(req,res) => {
 
   console.log(req.body);
    if(res.statusCode === 200)
            {
                addCategory.createCategory(req.body.addCategoryform);
                res.redirect('success.html');
            }
});

app.post('/editcategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addCategory.editCategory(req.body.editformData);
        res.redirect('success.html');
    }

});

app.post('/deletecategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addCategory.deleteCategory(req.body);
        res.redirect('success.html');
    }

})

app.get('/getcategory', (req,res) => {
    addCategory.getCategory().then(result => res.json(result)).catch(err => console.log("error"));
});



/*  ---------------------------------------------------Sub Category------------------------------------------*/

//Add Subcategory API
app.post('/addsubcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                addSubCategory.createSubCategory(req.body.addSubCategoryform);
                res.redirect('success.html');
            }
   
   
});

app.post('/editsubcategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addSubCategory.editSubCategory(req.body.editformData);
        res.redirect('success.html');
    }

})

app.post('/deletesubcategory', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addSubCategory.deleteSubCategory(req.body);
        res.redirect('success.html');
    }

})

app.get('/getsubcategory', (req,res) => {
    addSubCategory.getSubCategory().then(result => res.json(result)).catch(err => console.log("error"));
})


/*  ---------------------------------------------------Brand------------------------------------------*/


app.post('/addbrand',(req,res) => {
    if(res.statusCode === 200)
            {
                console.log(req.body);
                addBrand.createBrand(req.body.addformData);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

app.post('/editbrand', (req,res) => {
    if(res.statusCode === 200)
    {
        addBrand.editBrand(req.body.editformData);
        res.redirect('success.html');
    }

});

app.post('/deleteBrand', (req,res) => {
    console.log(req.body);
    if(res.statusCode === 200)
    {
        addBrand.deleteBrand(req.body);
        res.redirect('success.html');
    }

})

app.get('/getbrand', (req,res) => {
    addBrand.getBrand().then(result => res.json(result)).catch(err => console.log("error"));
})



/*  ---------------------------------------------------SKU------------------------------------------*/

app.post('/addsku',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKU(req.body.addSkuValues);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

app.get('/getsku', (req,res) => {
    addSKU.getSKU().then(result => res.json(result)).catch(err => console.log("error"));
})

/*  ---------------------------------------------------Customer------------------------------------------*/

app.post('/addcustomerpage',(req,res) => {
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


/*  ---------------------------------------------------Warehouse------------------------------------------*/

app.post('/addwarehousepage',(req,res) => {
    res.redirect('addwarehouse.html');
});

app.post('/addwarehouse',(req,res) => {
    if(res.statusCode === 200)
            {
                addWarehouse.createWarehouse(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------Hub------------------------------------------*/


app.post('/addhubpage',(req,res) => {
    res.redirect('addhub.html');
});

app.post('/addhub',(req,res) => {
    if(res.statusCode === 200)
            {
                addHub.createHub(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------Store------------------------------------------*/


app.post('/addstorepage',(req,res) => {
    res.redirect('addstore.html');
});

app.post('/addstore',(req,res) => {
    if(res.statusCode === 200)
            {
                addStore.createStore(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------City------------------------------------------*/


app.post('/addcitypage',(req,res) => {
    res.redirect('addcity.html');
});

app.post('/addcity',(req,res) => {
    if(res.statusCode === 200)
            {
                addCity.createCity(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------Locality------------------------------------------*/


app.post('/addlocalitypage',(req,res) => {
    res.redirect('addlocality.html');
});

app.post('/addlocality',(req,res) => {
    if(res.statusCode === 200)
            {
                addLocality.createLocality(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


/*  ---------------------------------------------------Address------------------------------------------*/


app.post('/addaddresspage',(req,res) => {
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


app.post('/addorderpage',(req,res) => {
    res.redirect('addorder.html');
});

app.post('/addorder',(req,res) => {
    if(res.statusCode === 200)
            {
                addOrder.createOrder(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

















