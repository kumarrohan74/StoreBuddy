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


//connection to database
mongoose.connect('mongodb://localhost/StoreBuddy')
    .then(() => console.log('Connected'))
    .catch(err => console.error('could not connect'));

const app = express();

//assigning port no.
const port = process.env.PORT || 5000;
app.listen(port,console.log(`server started on ${port}`));

//middleware body parser
app.use(bodyParser.urlencoded({extended:true}));

//static folder
app.use(express.static(path.join(__dirname,'public')));


/*  ---------------------------------------------------Product------------------------------------------*/

//Add Product Page
app.get('/',(req,res) =>
{
   res.redirect('index.html');
});

//Add Product API
app.post('/addproduct', (req, res) => {
    console.log(req.body);
    if(res.statusCode === 200)
            {
                addProduct.createProduct(req.body);
                res.redirect('success.html');
            }
    
});

/*  ---------------------------------------------------Category------------------------------------------*/

//Add Category Page
app.post('/addcategorypage',(req,res) => {
    res.redirect('addcategory.html');
});

//Add Category API
app.post('/addcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                addCategory.createCategory(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
    
});



/*  ---------------------------------------------------Sub Category------------------------------------------*/

//Add Subcategory Page
app.post('/addsubcategorypage',(req,res) => {
    res.redirect('addsubcategory.html');
});

//Add Subcategory API
app.post('/addsubcategory',(req,res) => {
    if(res.statusCode === 200)
            {
                addSubCategory.createSubCategory(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});

/*  ---------------------------------------------------SKU------------------------------------------*/

app.post('/addskunitpage',(req,res) => {
    res.redirect('addsku.html');
});

app.post('/addsku',(req,res) => {
    if(res.statusCode === 200)
            {
                addSKU.createSKU(req.body);
                res.redirect('success.html');
            }
    console.log(req.body);
   
});


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




app.post('/getproduct',(req,res) => {
    const products_ = addProduct.getProducts();
});











