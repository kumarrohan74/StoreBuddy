

import React from 'react';
import makeAnimated from 'react-select/animated';
import { makeStyles } from "@material-ui/core/styles";
import Select from 'react-select';
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { useEffect, useState, setState } from "react";

import {
    Card,
    Grid,
    Button
} from "@material-ui/core";

const animatedComponents = makeAnimated();

// const [productAlias,setProductAlias] = useState('milk')
// const [productPriority,setProductPriority] = useState('milk')
// const [productSGST,setProductSGST] = useState('milk')
// const [productCGST,setProductCGST] = useState('milk')

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        display: "none"
    }
}));

const fieledsaliasStyle = {
    width: '97%',
    padding: '0px 0px 0px 0px',
}

const fieledsgstStyle = {
    width: '97%',
    padding: '0px 0px 0px 0px',
}

const fielednameStyle = {
    width: '97%',
    padding: '12px 0px 0px 0px',
}

const fieledsStyle = {
    width: '97%',
    padding: '10px 0px 0px 0px',
}

const dropdwonstyle = {
    width: '100%',
    padding: '10px 0px 0px 0px',
}



const productSubcategory = [
    {
        Name: 'Add Subcategory',
        Id: 1,
        State: 1,
    },
    {
        Name: 'Subcategory 1',
        Id: 1,
    },
    {
        Name: 'Subcategory 2',
        Id: 2,
    },
]

const productBrand = [
    {
        Name: 'Add Brand',
        Id: 2,
        State: 2,
    },
    {
        Name: 'Brand 1',
        Id: 1,
    },
    {
        Name: 'Brand 2',
        Id: 2,
    },
]




const AddProducts = () => {
    const [isLoadingCategory, setIsLoadingCategory] = React.useState(false);
    const [isLoadingSubCategory, setIsLoadingSubCategory] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState([]);
    const [subCategoryData, setSubCategoryData] = React.useState([]);
    useEffect(() => {
        
        const sendRequest = async () => {
            const response_category = await fetch("http://localhost:5000/getcategory");
            const responseData_category = await response_category.json();

            const response_subcategory= await fetch("http://localhost:5000/getsubcategory");
            const responseData_subcategory = await response_subcategory.json();

            if(JSON.stringify(responseData_category) != JSON.stringify(categoryData) && JSON.stringify(responseData_subcategory) != JSON.stringify(subCategoryData))
            {
                setCategoryData(responseData_category);
                setIsLoadingCategory(true);
                setSubCategoryData(responseData_subcategory);
                setIsLoadingSubCategory(true);
            }

           /*if(JSON.stringify(responseData_subcategory) != JSON.stringify(subCategoryData))
            {
                setSubCategoryData(responseData_subcategory);
                setIsLoadingSubCategory(true);
            }*/
        };
        sendRequest();

    });

    const addNewCatButton = [
        {
            category_name : "Add New",
            Id: 0,
            State: 0,
        }
    ];

    const [formData, setformData] = React.useState({
        productName: "",
        productAlias: "",
        productPriority: "",
        productSGST: "",
        productCGST: ""
    })

    const [optionSelectData, setOptionSelectData] = React.useState({
        productCategory: "",
        productSubcategory: "",
        productBrand: "",
    })

    
    var productCategory,productSubCategory ;
    if(JSON.stringify(productCategory) != JSON.stringify(categoryData))
    {
        console.log(categoryData);
        productCategory = categoryData;
    }

    if(JSON.stringify(productSubCategory) != JSON.stringify(subCategoryData))
    {
        productSubCategory = subCategoryData;
    }
    

    function productCategorysList() {
        return (isLoadingCategory && addNewCatButton.concat(productCategory).map(data => ({ label: data.category_name, value: data.Id, State: data.State })))
    }
    
    function productSubcategoryList() {
        return (isLoadingSubCategory && productSubCategory.map(data => ({ label: data.subcategory_name, value: data.Id, State: data.State })))
    }
    
    function productBrandList() {
        return (productBrand.map(data => ({ label: data.Name, value: data.Id, State: data.State })))
    }

    function SubmitButton() {
        return  <Button type="submit" variant="contained" color="primary">
            Submit
</Button>
        if (formData.productName != "" || formData.productAlias != ""
            || formData.productPriority != "" || formData.productSGST != ""
            || formData.productCGST != "") {
            return <div className={classes.button}>
                <Button type="submit" variant="contained" color="primary">
                    Submit
        </Button>
            </div>
        } else {
            return <div className={classes.button}>
                <Button disabled type="submit" variant="contained" color="primary">
                    Submit
        </Button>

            </div>

        };
    };

    function handleChange(event) {
        // event.persist();
        setformData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
    

    function handleSubmit() {
        console.log(formData);
        console.log(optionSelectData);
    };


    const classes = useStyles();
    const history = useHistory();

    function onSelectOption(event) {
        if (event != null || event != undefined) {
            for (let i = 0; i < event.length; i++) {
                setOptionSelectData({
                    ...optionSelectData,
                    [event[i].name]: event[i].value,
                });
                if (event[i].value == 0 && event[i].State == 0) {
                    history.push({
                        pathname: '/products/category',
                        // search: '?query=abc',                                                                                                                                           
                        state: {
                            name: 'addCategory',
                            id: 0
                        }
                    })
                    break
                } else if (event[i].value == 1 && event[i].State == 1) {
                    history.push({
                        pathname: '/products/subcategory',
                        state: {
                            name: 'addSubcategory',
                            id: 1
                        }
                    })
                    break
                } else if (event[i].value == 2 && event[i].State == 2) {
                    history.push({
                        pathname: '/products/brand',
                        state: {
                            name: 'addBrand',
                            id: 2
                        }
                    })
                    break
                }
            }
        }
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Add Product", path: "/products" },
                        { name: "Inventory" }
                    ]}
                />
            </div>

            <div>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={errors => null} >

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>

                            <label>ProdcutCategory</label>
                            <Select
                                options={productCategorysList()} onChange={onSelectOption} components={animatedComponents}
                                isMulti name="productCategory" />

                            <div style={dropdwonstyle}>
                                <label>ProdcutBrand</label>
                                <Select options={productBrandList()} onChange={onSelectOption} components={animatedComponents}
                                    isMulti name="productBrand" />
                            </div>

                            <div style={fielednameStyle}>
                                <label>ProdcutName</label>
                                <input
                                    className="mb-16 w-100"
                                    onChange={handleChange}
                                    type="text"
                                    name="productName"

                                />
                            </div>

                            <div style={fieledsaliasStyle}>
                                <label>Product Alias</label>
                                <input
                                    className="mb-16 w-100"
                                    onChange={handleChange}
                                    type="text"
                                    name="productAlias"

                                />
                            </div>

                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>

                            <label>ProdcutSubcategory</label>
                            <Select options={productSubcategoryList()} onChange={onSelectOption} components={animatedComponents}
                                isMulti name="productSubcategory" />

                            <div style={fieledsStyle}>
                                <label>Priority</label>
                                <input
                                    className="mb-16 w-100"
                                    onChange={handleChange}
                                    type="text"
                                    name="productPriority"

                                />
                            </div>

                            <div style={fieledsgstStyle}>
                                <label>SGST</label>
                                <input
                                    className="mb-16 w-100"
                                    onChange={handleChange}
                                    type="text"
                                    name="productSGST"

                                />
                            </div>

                            <div style={fieledsgstStyle}>
                                <label>CGST</label>
                                <input
                                    className="mb-16 w-100"
                                    onChange={handleChange}
                                    type="text"
                                    name="productCGST"
                                />
                            </div>
                        </Grid>
                    </Grid>
                    {/* <div className={classes.button}>
                        <Button disabled={isDisabledBtn} type="submit" variant="contained" color="primary">
                            Primary
                    </Button>
                    </div> */}
                    <SubmitButton />
                </ValidatorForm>

            </div>
        </div>
    );
}
export default AddProducts