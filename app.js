//required files
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const addProduct = require('./api/addProduct');
const addCategory = require('./api/addCategory');
const addSubCategory = require('./api/addSubCategory');

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









app.post('/getproduct',(req,res) => {
    const products_ = addProduct.getProducts();
});











