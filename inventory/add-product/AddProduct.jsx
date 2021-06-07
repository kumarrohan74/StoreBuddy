import React from 'react';
import makeAnimated from 'react-select/animated';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from 'react-select';
import { Breadcrumb, RichTextEditor } from "matx";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState, setState } from "react";
import axios from 'axios';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import WarningIcon from '@material-ui/icons/Warning';
import Config from '../../config';

import {
    Grid,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl,
    useMediaQuery
} from "@material-ui/core";
import { ImageUpload } from 'app/views/uploadImage/ImageUpload';

const animatedComponents = makeAnimated();

let imageValue = [];
let multiImageValue = [];




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



const productSubcategory = [
    { value: 'addsubcategory', label: "Add Subcategory  + ", id: 0, state: 1 },
    { value: 'subcategorytwo', label: "Subcategory One", id: 1 },
    { value: 'subcategorythree', label: "Subcategory Two", id: 2 },
    { value: 'subcategoryfour', label: "Subcategory Three", id: 3 }
]

const productBrand = [
    { value: 'addbrand', label: "Add Brand  + ", id: 0, state: 2 },
    { value: 'brandone', label: "Brand One", id: 1 },
    { value: 'brandtwo', label: "Brand Two", id: 2 },
    { value: 'brandthree', label: "Brand Three", id: 3 }
]

const mappingList = [
    { value: 'hub', label: "Hub", id: 1, state: 0 },
    { value: 'locality', label: "Locality", id: 2, state: 1 },
    { value: 'store', label: "Store", id: 3, state: 2 }
]

let mapppedList = [];
let addingAll = {};
const AddProducts = () => {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [subscribe, setSubscribe] = React.useState('1');
    const location = useLocation();
    const [formData, setformData] = React.useState(
        {
            productName: '',
            productAlias: '',
            productPriority: '',
            productCGST: '',
            productSGST: '',
            productIGST: '',
        }
    )

    const [categoryValue, setCategoryValue] = useState();
    const [subcategoryValue, setSubcategoryValue] = useState();
    const [brandValue, setBrandValue] = useState();
    const [mappingValue, setMappingValue] = useState();
    const [mappedValue, setMappedValue] = useState();
    const [isLoadingCategory, setIsLoadingCategory] = React.useState(false);
    const [isLoadingSubCategory, setIsLoadingSubCategory] = React.useState(false);
    const [isLoadingBrand, setIsLoadingBrand] = React.useState(false);
    const [isLoadingHub, setIsLoadingHub] = React.useState(false);
    const [isLoadingStore, setIsLoadingStore] = React.useState(false);
    const [isLoadingLocality, setIsLoadingLocality] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState([]);
    const [subCategoryData, setSubCategoryData] = React.useState([]);
    const [brandData, setBrandData] = React.useState([]);
    const [hubData, setHubData] = React.useState([]);
    const [storeData, setStoreData] = React.useState([]);
    const [localityData, setLocalityData] = React.useState([]);
    const [hub,setHub] = React.useState(false);
    const [store, setStore] = React.useState(false);
    const [locality, setLocality] = React.useState(false);
    useEffect(() => {
        addingAll = location.state;
        if ((location.state != null || location.state != undefined) && (addingAll != null || addingAll != undefined)) {
            setOpen(true);
        }
        const sendRequest = async () => {
            const response_category = await fetch(`${Config.baseURL}/v1/getcategory`);
            const responseData_category = await response_category.json();
    
            const response_subcategory = await fetch(`${Config.baseURL}/v1/getsubcategory`);
            const responseData_subcategory = await response_subcategory.json();
    
            const response_brand = await fetch(`${Config.baseURL}/v1/getbrand`);
            const responseData_brand = await response_brand.json();

            const response_hub = await fetch(`${Config.baseURL}/v1/gethubbywarehouse`);
            const responseData_hub = await response_hub.json();
    
            const response_store = await fetch(`${Config.baseURL}/v1/getstorebywarehouse`);
            const responseData_store = await response_store.json();
    
            const response_locality = await fetch(`${Config.baseURL}/v1/getlocalitybywarehouse`);
            const responseData_locality = await response_locality.json();
    
            if (JSON.stringify(responseData_category) != JSON.stringify(categoryData) || JSON.stringify(responseData_subcategory) != JSON.stringify(subCategoryData) || JSON.stringify(responseData_brand) != JSON.stringify(brandData)) {
                setCategoryData(responseData_category);
                setIsLoadingCategory(true);
                setSubCategoryData(responseData_subcategory);
                setIsLoadingSubCategory(true);
                setBrandData(responseData_brand);
                setIsLoadingBrand(true);
    
            }

            if (JSON.stringify(responseData_hub) != JSON.stringify(hubData) || JSON.stringify(responseData_store) != JSON.stringify(storeData) || JSON.stringify(responseData_locality) != JSON.stringify(localityData)) {
                setHubData(responseData_hub);
                setIsLoadingHub(true);
                setStoreData(responseData_store);
                setIsLoadingStore(true);
                setLocalityData(responseData_locality);
                setIsLoadingLocality(true);
    
            }
        };
        sendRequest();
    
    }, [Location]);
    function handleChange(event) {
        // event.persist();
        setformData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    var productCategory, productSubCategory, productBrand;
    if (JSON.stringify(productCategory) != JSON.stringify(categoryData)) {
        productCategory = categoryData;
    }

    if (JSON.stringify(productSubCategory) != JSON.stringify(subCategoryData)) {
        productSubCategory = subCategoryData;
    }

    if (JSON.stringify(productBrand) != JSON.stringify(brandData)) {
        productBrand = brandData;
    }

    const addNewCatButton = [
        {
            category_name: "Add New",
            category_id: 0,
            State: 0,
        }
    ];

    const addNewSubCatButton = [
        {
            subcategory_name: "Add New",
            subcategory_id: 1,
            State: 1,
        }
    ];

    const addNewBrandButton = [
        {
            brand_name: "Add New",
            brand_id: 2,
            State: 2,
        }
    ];

    function productCategorysList() {
        return (isLoadingCategory && addNewCatButton.concat(productCategory).map(data => ({ label: data.category_name, value: data.category_id, State: data.State })))
    }

    function productSubcategoryList() {
        return (isLoadingSubCategory && addNewSubCatButton.concat(productSubCategory).map(data => ({ label: data.subcategory_name, value: data.subcategory_id, State: data.State })))
    }

    function productBrandList() {
        return (isLoadingBrand && addNewBrandButton.concat(productBrand).map(data => ({ label: data.brand_name, value: data.brand_id, State: data.State })))
    }

    
    const handleClose = () => {
        setOpen(false);
    }

    const handleContentChange = contentHtml => {
        setEditorState(contentHtml);
    };

    function handleSubmit() {
        var description  = editorState.replace(/<\/?[^>]+(>|$)/g, "");
        let addProductData = {
            formDetails: formData,
            category: categoryValue,
            subcategory: subcategoryValue,
            brand: brandValue,
            mapping: mappingValue,
            mapped: mappedValue,
            description: description,                       
            subscriptionType: subscribe,
            primaryImage: imageValue,
            secondaryImage: multiImageValue
        }

        if (formData.productAlias === "" || formData.productName === "" || formData.productPriority === ""
            || categoryValue === undefined || subcategoryValue === undefined || brandValue === undefined || imageValue === undefined
            || mappingValue === undefined || mappedValue === undefined) {
                setOpen(true);
        }
        const data = addProductData.formDetails;
        data["productBrand"] = {brandName: addProductData.brand[0].label, brandId: addProductData.brand[0].value};
        data["productCategory"] = { categoryName: addProductData.category[0].label, categoryId: addProductData.category[0].value};
        data["productSubCategory"] = { subCategoryName: addProductData.subcategory[0].label, subCategoryId: addProductData.subcategory[0].value};
        data["subscriptionType"] = addProductData.subscriptionType;
        data["productDescription"] = description;
        data["mappedBy"] = {name: addProductData.mapping.label, id: addProductData.mapping.id, value:addProductData.mapping.value }
        if(hub)
        {
            data["hub"] = {hubName: addProductData.mapped.label, hubId: addProductData.mapped.value}
        }
        else if(store)
        {
            data["store"] = {storeName: addProductData.mapped.label, storeId: addProductData.mapped.value}

        }
        else if(locality)
        {
            data["locality"] = {localityName: addProductData.mapped.label, localityId: addProductData.mapped.value}
        }
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post(`${Config.baseURL}/v1/addproduct`, data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        history.push({
            pathname: '/products/skuaddition',
            state: { "productName": data.productName, "productPriority": data.productPriority }
        })
    };

    function onloadImageUpload(imageOutput) {
        imageValue = imageOutput
    }

    function onloadMultiImageUpload(imageData) {
        multiImageValue = imageData;
    }

    const classes = useStyles();
    const history = useHistory();

    const onloadSelectMapping = (value) => {
        if (value.state === 0) {
            setHub(true);
            setStore(false);
            setLocality(false);
            mapppedList = hubData.map(data => ({ label: data.hub_name, value: data.hub_id, State: data.State }));
            
        } else if (value.state === 1) {
            setHub(false);
            setStore(false);
            setLocality(true);
            mapppedList = localityData.map(data => ({ label: data.locality_name, value: data.locality_id, State: data.State }));
        } else if (value.state === 2) {
            setHub(false);
            setStore(true);
            setLocality(false);
            mapppedList = storeData.map(data => ({ label: data.store_name, value: data.store_id, State: data.State }));
        }

        setMappingValue(value);
    }

    const onloadSelectMappedValues = (value) => {
        setMappedValue(value);
    }

    const onloadSelectCategory = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }

        setCategoryValue(value);
    };

    const onloadSelectSubcategory = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        setSubcategoryValue(value)
    }

    const onloadSelectBrand = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        setBrandValue(value)
    }


    const handleSubscriptionChange = (event) => {
        setSubscribe(event.target.value);
    };

    function redirectToRequiredPage(redirectData) {

        for (let i = 0; i < redirectData.length; i++) {
            if (redirectData[i].id === 0) {
                if (redirectData[i].state === 0) {
                    history.push({
                        pathname: '/products/category',
                        // search: '?query=abc',                                                                                                                                           
                        state: {
                            name: 'addCategory',
                            id: 0
                        }
                    })
                } else if (redirectData[i].state === 1) {
                    history.push({
                        pathname: '/products/subcategory',
                        state: {
                            name: 'addSubcategory',
                            id: 1
                        }
                    })
                } else if (redirectData[i].state === 2) {
                    history.push({
                        pathname: '/products/brand',
                        state: {
                            name: 'addBrand',
                            id: 2
                        }
                    })
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

            <div style={{ border: '1px solid silver', padding: '10px' }}>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    onError={errors => null} >

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label>Product Name <sup>*</sup></label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productName} onChange={handleChange} type="text" name="productName" />
                            </div>

                            <label>Product Alias<sup>*</sup></label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productAlias} onChange={handleChange} type="text" name="productAlias" />
                            </div>

                            <label >Product Priority<sup>*</sup></label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productPriority} onChange={handleChange} type="text" name="productPriority" />
                            </div>

                            <label>Select Category<sup>*</sup></label>
                            <div>
                                <Select
                                    isMulti
                                    name="form-field-name"
                                    value={categoryValue}
                                    onChange={onloadSelectCategory}
                                    options={productCategorysList()}
                                />
                            </div><br></br>

                            <label>Select Sub-category<sup>*</sup></label>
                            <div>
                                <Select
                                    isMulti
                                    name="form-field-name"
                                    value={subcategoryValue}
                                    onChange={onloadSelectSubcategory}
                                    options={productSubcategoryList()}
                                />
                            </div>
                        </Grid><hr></hr>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label>Tax CGST %</label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productCGST} onChange={handleChange} type="Number" name="productCGST" />
                            </div>

                            <label>Tax SGST %</label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productSGST} onChange={handleChange} type="Number" name="productSGST" />
                            </div>

                            <label>Tax IGST %</label>
                            <div>
                                <input className="mb-16 w-100 form-control" value={formData.productIGST} onChange={handleChange} type="Number" name="productIGST" />
                            </div>
                            <label>Select Brand<sup>*</sup></label>
                            <div>
                                <Select
                                    isMulti
                                    name="form-field-name"
                                    value={brandValue}
                                    onChange={onloadSelectBrand}
                                    options={productBrandList()}
                                />
                            </div>

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label style={{ lineHeight: "70px" }}>Primary Image<sup>*</sup></label>
                            <div>
                                <ImageUpload onloadImageUpload={onloadImageUpload} />
                            </div>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <label style={{ lineHeight: "70px" }}>Secondry Image</label>
                            <div>
                                <ImageUpload onloadMultiImageUpload={onloadMultiImageUpload} multi={true} />
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2">Description</label>
                                    <div className="col-sm-10">
                                        <RichTextEditor
                                            content={editorState}
                                            handleContentChange={handleContentChange}
                                            placeholder="insert text here..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <FormControl component="fieldset" style={{ width: "80%" }}>
                                <div className="col-sm-4 col-md-3 col-12">
                                    <FormLabel component="legend" style={{ paddingTop: "15px" }}>
                                        Subscription Type<sup>*</sup>
                                    </FormLabel>
                                </div>
                                <div className="col-sm-8 col-md-9 col-12">
                                    <RadioGroup row aria-label="subscrition" name="subscrition" value={subscribe} onChange={handleSubscriptionChange}>
                                        <FormControlLabel value='1' control={<Radio />} label="Subscribe" labelPlacement="start" />
                                        <FormControlLabel className="col-sm-6" value='2' control={<Radio />} label="Non-Subscribe" labelPlacement="start" />
                                    </RadioGroup>
                                </div>
                            </FormControl>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-4 col-md-3 col-12">Mapping</label>
                                        <div className="col-sm-6">
                                            <Select
                                                name="form-field-name"
                                                value={mappingValue}
                                                onChange={onloadSelectMapping}
                                                options={mappingList}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-4 col-md-3 col-12">All Locality/Hub/Store</label>
                                        <div className="col-sm-8">
                                            <Select
                                                name="form-field-name"
                                                value={mappedValue}
                                                onChange={onloadSelectMappedValues}
                                                options={mapppedList}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.button} style={{ marginTop: "50px" }}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Product
                        </Button>
                    </div>
                    <div>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Alert Message !! "}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <WarningIcon color="secondary" fontSize="large" />
                                Please fill the required fields
                            </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                                    OK
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </ValidatorForm>
            </div>
        </div>
    );
}
export default AddProducts