//required files
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const addProduct = require('./api/addProduct');
const addCategory = require('./api/addCategory');

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

app.get('/',(req,res) =>
{
   res.redirect('index.html');
});

app.post('/addproduct', (req, res) => {
    console.log(req.body);
    if(res.statusCode === 200)
            {
                res.redirect('success.html');
            }
    addProduct.createProduct(req.body);
});

app.post('/addcategorypage',(req,res) => {
    res.redirect('addcategory.html');
});

app.post('/addcategory',(req,res) => {
    console.log(req.body);
    addCategory.createCategory(req.body);
});

app.post('/getproduct',(req,res) => {
    const products_ = addProduct.getProducts();
});











