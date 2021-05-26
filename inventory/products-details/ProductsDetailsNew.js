import React, { useState } from "react";
import { Breadcrumb } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Icon,
    IconButton,
    Button,

} from "@material-ui/core";
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DialogContentText from "@material-ui/core/DialogContentText";
import MaterialTable from 'material-table';
import ImageUploader from 'react-images-upload';

const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid silver',
        padding: '5px',
        borderRadius: '4px',
    }
}));

const PrdoductCategory = () => {

    const location = useLocation();
    const history = useHistory();

    // useEffect(() => {
    //     addingCategory = location.state;
    //     if ((location.state != null || location.state != undefined) && (addingCategory != null || addingCategory != undefined)) {
    //         setOpen(true);
    //     }

    // }, [location])

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


    const [productData, setProductData] = React.useState([]);

  React.useEffect(() => {
    
    const sendRequest = async () => {
        const response = await fetch("http://localhost:5000/getproduct");
        const responseData = await response.json();
        if(JSON.stringify(responseData) != JSON.stringify(productData))
        {
            setProductData(responseData);
        }
       
    };
    sendRequest();
});

    function handleClickEditDailogOpen(data) {
        alert (JSON.stringify(data))
    }

    const data = productData;
    function handleClickDelete(event,data)
    {
        
        data.isDelete = true;
       
        const formdata = {productData};
        console.log("event");
        console.log(event);
        console.log(data);
    
    const headers = {
        "Access-Control-Allow-Origin": "*",
      }
     axios.post("http://localhost:5000/deleteproduct", data ,{headers}).then(() => {
       console.log("sent");
     }).catch(() => {
        console.log("Something went wrong. Plase try again later");
    });

    }

    const columns = [
        {
            title: 'Product id', field: 'product_id',
        },
        {
            title: 'Product name', field: 'product_name',
        },
        {
            title: 'Category', field: 'category',
        },
        {
            title: 'Sub-category', field: 'sub_category',
        },
        {
            title: 'Brand', field: 'brand',
        },
        {
            title: 'Status', field: 'status',
        },
    ]

    const actions = [
        {
            icon: 'add',
            tooltip: 'Add Product',
            isFreeAction: true,
            onClick: (event) => onLoadAddSubCategory()
        },
        // {
        //     icon: 'edit',
        //     tooltip: 'edit Product',
        //     onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        // },
        {
            icon: 'edit',
            tooltip: 'edit Product',
            onClick: (event, rowData) => 
            
            // console.log(rowData)


        history.push({
            pathname: '/products/editproduct',
            state: {
                name: rowData,
                id: 2
            }
        })

    },

        {
            icon: 'delete',
            tooltip: 'Delete Product',
            onClick: (event, rowData) => handleClickDelete(event, rowData)
        },
    ]

    function onLoadAddSubCategory() {
    history.push("/products/addproduct");
    }

    return (
        <Card elevation={3} className={classes.root}>
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Product", path: "/products/productsDetails" },
                        { name: "Inventory" }
                    ]}
                />
            </div>
            <div className="overflow-auto">
                <MaterialTable title="Product List"
                    data={data}
                    columns={columns}
                    actions={actions}
                    options={{
                        search: true,
                        paging: true,
                        filtering: false,
                        IconButton: true,
                        button: true,
                        actionsColumnIndex: -1
                    }}
                >
                </MaterialTable>
            </div>
        </Card >
    );
};

export default PrdoductCategory;
