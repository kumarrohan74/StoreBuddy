

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
import SKUEdit from '../sku-addition/SKUEdit';

import {
    Card,
    Grid,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl
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





const mappingBuilding_wise = [
    {
        Name: 'Locality 1',
        Id: 1,
        // State: 1,
    },
    {
        Name: 'Locality 2',
        Id: 2,
    },
    {
        Name: 'Locality 3',
        Id: 3,
    },
]

const mappingBuilding = [
    {
        Name: 'Hub',
        Id: 1,
        // State: 1,
    },
    {
        Name: 'Locality',
        Id: 2,
    },
    {
        Name: 'Store',
        Id: 3,
    },
]


function mappingBuildingList() {
    return (mappingBuilding.map(data => ({ label: data.Name, value: data.Id, State: data.State })))
}
function mappingBuildingList_wise() {
    return (mappingBuilding_wise.map(data => ({ label: data.Name, value: data.Id, State: data.State })))
}




const EditProduct = (props) => {
    console.log(props);

    const {product_name,category,sub_category,sku_size,status,stock_qty,stock_update} = props.location.state.name;

    const [primaryPicture, setPrimaryPicture] = React.useState([]);
    const [secondryPicture, setSecondryPicture] = React.useState([]);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [subscribe, setSubscribe] = React.useState('Non-Subscribe');

    const onEditorStateChange = (editorState) => {
        console.log(editorState)
        setEditorState(editorState);
    };

    
    const [isLoadingCategory, setIsLoadingCategory] = React.useState(false);
    const [isLoadingSubCategory, setIsLoadingSubCategory] = React.useState(false);
    const [isLoadingBrand, setIsLoadingBrand] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState([]);
    const [subCategoryData, setSubCategoryData] = React.useState([]);
    const [brandData, setBrandData] = React.useState([]);
    const [optionSelectData, setOptionSelectData] = React.useState({ })


    useEffect(() => {
        
        const sendRequest = async () => {
            const response_category = await fetch("http://localhost:5000/getcategory");
            const responseData_category = await response_category.json();

            const response_subcategory= await fetch("http://localhost:5000/getsubcategory");
            const responseData_subcategory = await response_subcategory.json();

            const response_brand= await fetch("http://localhost:5000/getbrand");
            const responseData_brand = await response_brand.json();

            

            if(JSON.stringify(responseData_category) != JSON.stringify(categoryData) || JSON.stringify(responseData_subcategory) != JSON.stringify(subCategoryData) || JSON.stringify(responseData_brand) != JSON.stringify(brandData))
            {
                setCategoryData(responseData_category);
                setIsLoadingCategory(true);
                setSubCategoryData(responseData_subcategory);
                setIsLoadingSubCategory(true);
                setBrandData(responseData_brand);
                setIsLoadingBrand(true);
               
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

    const addNewSubCatButton = [
        {
            subcategory_name : "Add New",
            Id: 1,
            State: 1,
        }
    ];

    const addNewBrandButton = [
        {
            brand_name : "Add New",
            Id: 2,
            State: 2,
        }
    ];

    var productCategory,productSubCategory,productBrand ;
    if(JSON.stringify(productCategory) != JSON.stringify(categoryData))
    {
        productCategory = categoryData;
    }

    if(JSON.stringify(productSubCategory) != JSON.stringify(subCategoryData))
    {
        productSubCategory = subCategoryData;
    }

    if(JSON.stringify(productBrand) != JSON.stringify(brandData))
    {
        productBrand = brandData;
    }
    
    function productCategorysList() {
        return (isLoadingCategory && addNewCatButton.concat(productCategory).map(data => ({ label: data.category_name, value: data.Id, State: data.State })))
    }
    
    function productSubcategoryList() {
        return (isLoadingSubCategory && addNewSubCatButton.concat(productSubCategory).map(data => ({ label: data.subcategory_name, value: data.Id, State: data.State })))
    }
    
    function productBrandList() {
        return (isLoadingBrand && addNewBrandButton.concat(productBrand).map(data => ({ label: data.brand_name, value: data.Id, State: data.State })))
    }


    function handleChange(event) {
        // event.persist();
        setformData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
    
    function handleSubmit() {
        const data = {formData};
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/editproduct", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
        
        }
    
    

    const classes = useStyles();
    const history = useHistory();
    console.log("histoooo");
    console.log(history);
    const data = history.location.state.name;
    console.log("data");
    console.log(data);
    const [formData, setformData] = React.useState({
       cgst: data.cgst,
       igst: data.igst,
       sgst: data.sgst,
       product_locality: data.locality,
       product_alias: data.product_alias,
       product_brand: data.brand,
       product_id: data.product_id,
       product_name: data.product_name,
       product_priority: data.product_priority,
       product_status: data.status,
       product_category: data.category,
       product_subcategory: data.sub_category,
       subscription_type: data.subscription_type,
       isDelete : data.isDelete
    })
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
                        formData.product_category = history.location.state.name.category;
                        setformData({ ...formData, product_category: categoryLabel});    
                                  
                    }
                    else if(data === "subcategory")
                    {
                        var subcategoryLabel = event[0].label;
                        formData.product_subcategory = history.location.state.name.sub_category;
                        setformData({ ...formData, product_subcategory: subcategoryLabel});
                    }
                    else if(data === "brand")
                    {
                        var brandLabel = event[0].label;
                        formData.product_brand = history.location.state.name.brand;
                        setformData({ ...formData, product_brand: brandLabel});
                    }
                    
                    else if(data === "locality")
                    {
                        console.log("coming in locality")
                        var localityLabel = event[0].label;
                        formData.productLocality = "";
                        setformData({ ...formData, product_locality: localityLabel});
                    }
                    else if(data === "mapping")
                    {
                        console.log("coming in mapping")
                        var mappingLabel = event[0].label;
                        formData.productMapping = "";
                        setformData({ ...formData, product_mapping: mappingLabel});
                    }
                    
                }
            }
            
            
        }
        console.log(formData);
    }
    
    const handleSubscriptionChange = (event) => {
        setSubscribe(event.target.value);
      };

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
            {/* <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Add Product", path: "/products" },
                        { name: "Inventory" }
                    ]}
                />
            </div> */}

            <div>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={errors => null} >

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="row">
                                <label className="col-sm-4">Product Name</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.product_name} onChange={handleChange} type="text" name="product_name" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Product Alias</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.product_alias} onChange={handleChange} type="text" name="product_alias" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Product Priority</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.product_priority} onChange={handleChange} type="text" name="product_priority" required={true} />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>

                            <div className="row">
                                <label className="col-sm-4">Tax CGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.cgst} onChange={handleChange} type="text" name="cgst" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Tax SGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.sgst} onChange={handleChange} type="text" name="sgst" required={true} />
                                </div>
                            </div>

                            <div className="row">
                                <label className="col-sm-4">Tax IGST %</label>
                                <div className="col-sm-8">
                                    <input className="mb-16 w-100" defaultValue={formData.igst} onChange={handleChange} type="text" name="igst" required={true} />
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-3">Brand</label>
                                        <Select className="col-sm-7" defaultValue={{label : formData.product_brand, value: formData.product_brand}} options={productBrandList()} onChange={(e) => onSelectOption(e, "brand")} components={animatedComponents}
                                            isMulti name="productBrand" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-3">Category</label>
                                        <Select className="col-sm-7" defaultValue={{label : formData.product_category, value: formData.product_category}} options={productCategorysList()} onChange={(e) => onSelectOption(e, "category")} components={animatedComponents}
                                            isMulti name="productCategory" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="row">
                                        <label className="col-sm-5">Sub-category</label>
                                        <Select className="col-sm-7" defaultValue={{label : formData.product_subcategory, value: formData.product_subcategory}} options={productSubcategoryList()} onChange={(e) => onSelectOption(e, "subcategory")} components={animatedComponents}
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
                                            // border: "1px solid grey",
                                            backgroundColor:"transparent",    
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
                                            // border: "1px solid grey",
                                            backgroundColor:"transparent",
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



                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl  component="fieldset" style={{width:"80%"}}>
                                <div className="row">
                                    <div className="col-sm-4 col-md-3 col-12">
                                        <FormLabel component="legend" style={{paddingTop:"15px"}}>
                                            Subscription Type
                                        </FormLabel>
                                    </div>
                                    <div className="col-sm-8 col-md-9 col-12">
                                        <RadioGroup row aria-label="subscrition" name="subscrition" value={data.subscription_type} onChange={handleSubscriptionChange}>
                                            <FormControlLabel className="col-sm-3" value="Subscribe" control={<Radio />} label="Subscribe" labelPlacement="start" />
                                            <FormControlLabel className="col-sm-6" value="Non-Subscribe" control={<Radio />} label="Non-Subscribe" labelPlacement="start" />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-4 col-md-3 col-12">Mapping</label>
                                        <Select className="col-sm-6 col-md-3 col-12" options={mappingBuildingList()} onChange={onSelectOption} components={animatedComponents}
                                         name="mappingBuilding" />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-4 col-md-3 col-12">All Locality/Hub/Store</label>
                                        <Select className="col-sm-6 col-md-9 col-12" defaultValue={{label : formData.product_locality, value: formData.product_locality}}  options={mappingBuildingList_wise()} onChange={onSelectOption} components={animatedComponents}
                                            isMulti name="mappingBuilding_wise" />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <br />

                        <SKUEdit />
                    <div className={classes.button} style={{marginTop:"50px"}}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>

                </ValidatorForm>
            </div>
        </div>
    );
}
export default EditProduct