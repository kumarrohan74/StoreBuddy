import React from 'react';
import makeAnimated from 'react-select/animated';
import { makeStyles } from "@material-ui/core/styles";
import Select from 'react-select';
import { Breadcrumb } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useHistory } from "react-router-dom";
import { useEffect, useState, setState } from "react";
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';

import {
    Card,
    Grid,
    Button
} from "@material-ui/core";

const animatedComponents = makeAnimated();

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
    const [primaryPicture, setPrimaryPicture] = React.useState([]);
    const [secondryPicture, setSecondryPicture] = React.useState([]);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };
    const [inputs, setInputs] = React.useState([]);
   
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

            

            if(JSON.stringify(responseData_category) != JSON.stringify(categoryData) || JSON.stringify(responseData_subcategory) != JSON.stringify(subCategoryData))
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

    const [formData, setformData] = React.useState({
        // productName: "",
        // productAlias: "",
        // productPriority: "",
        // productSGST: "",
        // productCGST: "",
    })

    const [optionSelectData, setOptionSelectData] = React.useState({
        productCategory: "",
        productSubcategory: "",
        productBrand: "",
    })

    function handleChange(event) {
        // event.persist();
        setformData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit() {
        console.log(formData);
        // console.log(optionSelectData);
        // console.log(primaryPicture);
        // console.log(secondryPicture);
    };

    const classes = useStyles();
    const history = useHistory();
   
    function onSelectOption(event,data) {
        
    
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
                    console.log(event);
                    break
                } else if (event[i].value == 1 && event[i].State == 1) {
                    history.push({
                        pathname: '/products/subcategory',
                        state: {
                            name: 'addSubcategory',
                            id: 1
                        }
                    })
                    console.log(event);
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
                else {
                    if(data === "category")
                    {
                        var categoryLabel = event[0].label;
                        inputs.productCategory = "";
                        
                        setInputs({ ...inputs, productCategory: categoryLabel});    
                        console.log(inputs);             
                    }
                    else if(data === "subcategory")
                    {
                        var subcategoryLabel = event[0].label;
                        inputs.productSubCategory = "";
                        setInputs({ ...inputs, productSubCategory: subcategoryLabel});
                    }
                    
                }
            }
            
            
        }
    }
    const addNewCatButton = [
        {
            category_name : "Add New",
            Id: 0,
            State: 0,
        }
    ];

    const addNewSubCatButton = [
        {
            subcategory_name : "Add New",
            Id: 1,
            State: 1,
        }
    ];
    var productCategory,productSubCategory ;
    if(JSON.stringify(productCategory) != JSON.stringify(categoryData))
    {
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
        return (isLoadingSubCategory && addNewSubCatButton.concat(productSubCategory).map(data => ({ label: data.subcategory_name, value: data.Id, State: data.State })))
    }
    
    function productBrandList() {
        return (productBrand.map(data => ({ label: data.Name, value: data.Id, State: data.State })))
    }

    function onLoadSKUAddition() {
        history.push({
            pathname: '/products/skuaddition',
        })
    }

    function handleOnSubmit()
    {
        const data = {inputs};
       
        console.log(data);
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/addproduct", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
       
    }

    const onDropPrimary = (primaryPictures) => {
        console.log(primaryPictures)
        setPrimaryPicture({
            ...primaryPicture,
            primaryPictures
        });
    }
    const onDropSecondry = (secondryPictures) => {
        console.log(secondryPictures)
        setSecondryPicture({
            ...secondryPicture,
            secondryPictures
        });
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
                            <div className="row">
                                <label className="col-sm-4">Product Name</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productName || ''} onChange={e => setInputs({ ...inputs, productName: e.target.value })} type="text" name="productName" required={true}  />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Product Alias</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productAlias || ''} onChange={e => setInputs({ ...inputs, productAlias: e.target.value })} type="text" name="productAlias" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Product Priority</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productPriority || ''} onChange={e => setInputs({ ...inputs, productPriority: e.target.value })} type="text" name="productPriority" required={true} />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>

                            <div className="row">
                                <label className="col-sm-4">Tax CGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productCGST || ''} onChange={e => setInputs({ ...inputs, productCGST: e.target.value })} type="text" name="productCGST" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Tax SGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productSGST || ''} onChange={e => setInputs({ ...inputs, productSGST: e.target.value })} type="text" name="productSGST" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Tax IGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" value={inputs.productIGST || ''} onChange={e => setInputs({ ...inputs, productIGST: e.target.value })} type="text" name="productIGST" required={true} />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-3">Brand</label>
                                        <Select className="col-sm-7" options={productBrandList()} onChange={onSelectOption} components={animatedComponents}
                                            isMulti name="productBrand" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-3">Category</label>
                                        <Select className="col-sm-7" options={productCategorysList()}  onChange={(e) => onSelectOption(e, "category")} components={animatedComponents}
                                            isMulti name="productCategory" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-3">Sub-category</label>
                                        <Select className="col-sm-7" options={productSubcategoryList()}  onChange={(e) => onSelectOption(e, "subcategory")} components={animatedComponents}
                                            isMulti name="productSubcategory" />
                                    </div>
                                </div>
                            </div>

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="row">
                                <label className="col-sm-4" style={{ lineHeight: "70px" }}>Primary Image</label>
                                <div className="col-sm-8">
                                    <ImageUploader
                                        fileContainerStyle={{
                                            padding: "0",
                                            border: "1px solid grey",
                                        }}
                                        withIcon={false}
                                        withPreview={true}
                                        withLabel={false}
                                        singleImage={true}
                                        buttonText='Upload image'
                                        onChange={onDropPrimary}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="row">
                                <label className="col-sm-4" style={{ lineHeight: "70px" }}>Secondry Image</label>
                                <div className="col-sm-8">
                                    <ImageUploader
                                        fileContainerStyle={{
                                            padding: "0",
                                            border: "1px solid grey",
                                        }}
                                        withIcon={false}
                                        withPreview={true}
                                        withLabel={false}
                                        singleImage={false}
                                        buttonText='Upload image'
                                        onChange={onDropSecondry}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-2">Description</label>
                                        <div className="col-sm-10">
                                            <Editor
                                                editorState={editorState}
                                                wrapperStyle={{ width: "100%", border: "1px solid brown", borderRadius: "5px" }}
                                                editorStyle={{ minHeight: "100px" }}
                                                toolbarStyle={{ border: "1px solid brown" }}
                                                onEditorStateChange={onEditorStateChange}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.button}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleOnSubmit}>
                            Next
                    </Button>
                    </div>
                </ValidatorForm>
            </div>
        </div>
    );
}
export default AddProducts