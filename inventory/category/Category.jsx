import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button, Fab,
    Grid
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

var data = {};
const useStyles = makeStyles(theme => ({
    button: {
        // margin: '0px 400px 0px 0px'
        float: 'right',
        marginRight: '10px'
    },
    headerName: {
        float: 'left',
        padding: '0px 0px 0px 10px'
    },
    input: {
        display: "none"
    },
    dialogPaper: {
        // height: '400px'
    },
}));
var categoryList;
const PrdoductCategory = ({message,variant}) => {
    
    
    const classes = useStyles();
    var getData = [];
    const [open, setOpen] = React.useState(false);
    const [inputs, setInputs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState([]);

      /* fetch("http://localhost:5000/getcategory").then(res => {
           if(res.ok){
               return res.json();
           }
       }).then(jsonRes => console.log(jsonRes)); */

    React.useEffect( () => {
        const sendRequest = async () => {
            const response = await fetch("http://localhost:5000/getcategory");
            const responseData = await response.json();
            setCategoryData(responseData);
            setIsLoading(true);
        };
        sendRequest();
        
    })
      
   
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    
    const tableheadstyle = {
        boder: '1px solid red',
    }

    const heading = {
        color: 'red',
        justifyContent: 'center',
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOnSubmit()
    {
        const data = {inputs};
       
        
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/addcategory", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
    }

    const productList = [
        {
            name:'rohan',
            age:29
        }
    ];

    
    return (
        <Card elevation={3} className="pt-20 mb-24">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Category", path: "/produscts" },
                        { name: "Inventory" }
                    ]}
                />
            </div>

            <div>
                <Card>
                    <strong className={classes.headerName}>Category List</strong>
                    <Button variant="contained" className={classes.button} color="primary" onClick={handleClickOpen}>
                        Add Category
                </Button>
                </Card>
                <Dialog classes={{ paper: classes.dialogPaper }}
                    fullWidth={true}
                    maxWidth={'md'}
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Add Category"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <label> Category Name</label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    name="categoryName"
                                    id="category_name"
                                    value={inputs.categoryName || ''}
                                    onChange={e => setInputs({ ...inputs, categoryName: e.target.value })}
                                />
                                <label> Category Image Url</label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    name="categoryimage"
                                    id="category_image"
                                    value={inputs.categoryImgURL || ''}
                                    onChange={e => setInputs({ ...inputs, categoryImgURL: e.target.value })}
                                />
                                
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <label>Category Priority</label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    name="cpriority"
                                    id="category_priority"
                                    value={inputs.categoryPriority || ''}
                                    onChange={e => setInputs({ ...inputs, categoryPriority: e.target.value })}
                                />
                                <label>Image Upload</label>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="imgupload"
                                    id="img_upload"
                                    value={inputs.ImgUpload || ''}
                                    onChange={e => setInputs({ ...inputs, ImgUpload: e.target.value })}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button  className="mb-16 w-100"
                                        variant="contained"
                                        component="span" >
                                        Upload
                                     </Button>
                                </label>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleOnSubmit} variant="contained" color="primary" autoFocus>
                            Submit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className="overflow-auto">
                <Table className="product-table">
                    <TableHead>
                        <TableRow>
                        <TableCell className="px-24" colSpan={2}>
                                Sl No.
                            </TableCell>
                            <TableCell className="px-24" colSpan={2}>
                                Name
                            </TableCell>

                            <TableCell className="px-0" colSpan={4}>
                                Image
              </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Status
              </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Priority
              </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Edit
              </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && categoryData.map((category, index) => (
                            <TableRow key={index}>
                                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                    {index + 1}
                                </TableCell>
                                <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                                    {category.category_name}
                                </TableCell>
                                <TableCell className="px-0 capitalize" colSpan={4} align="center">
                                    <div className="flex flex-middle">
                                        <img
                                            className="circular-image-small"
                                            
                                            alt={category.category_img}
                                        />
                                        <p className="m-0 ml-8"></p>
                                    </div>
                                </TableCell>

                                <TableCell className="px-0" align="left" colSpan={2}>
                                {category.status == 1 ? (
                                        <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                            Active
                                        </small>
                                    ) : (
                                        <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                                            InActive
                                        </small>
                                    )}
                                    
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    {category.category_priority}
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    <IconButton>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default PrdoductCategory;
