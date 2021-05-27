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
import { ImageUpload } from "app/views/uploadImage/ImageUpload";

const useStyles = makeStyles(theme => ({

    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid silver'
        // width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        // margin: '0px 400px 0px 0px'
        float: 'right',
        marginRight: '10px'
    },
    headerName: {
        float: 'left',
        padding: '0px 0px 0px 10px'
    },
    // input: {
    //     display: "none"
    // },
    dialogPaper: {
        // height: '400px'
    },
    uploadfile: {
        width: '440px'
    },
    radiobtn: {
        border: '1px solid silver',
        paddingLeft: '10px',
        borderRadius: '4px'
    }
}));



let addingCategory = {};
const PrdoductCategory = () => {

    // const {
    //     values,
    //     setValues,
    //     onloadImageUpload
    // } = ImageUpload()

    const location = useLocation();
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [categoryData, setCategoryData] = React.useState([]);
    useEffect(() => {
        addingCategory = location.state;
        if ((location.state != null || location.state != undefined) && (addingCategory != null || addingCategory != undefined)) {
            setOpen(true);
        }
         const sendRequest = async () => {
            const response = await fetch("http://localhost:5000/getcategory");
            const responseData = await response.json();
            if(JSON.stringify(responseData) !=JSON.stringify(categoryData))
            {
                setCategoryData(responseData);
                setIsLoading(true);
            }
            console.log(responseData);
        };
       
        sendRequest();
    })

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editDailogOpen, setEditDailogOpen] = React.useState(false);

    const [alertDailog, setAlertDailog] = React.useState(false);

    const [uploadPicture, setUploadPicture] = React.useState([]);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [imgUrl, setImageUrl] = React.useState({
        imageUrl: ''
    });

    const onDropPrimary = (uploadPictures) => {
        console.log(uploadPictures)
        setUploadPicture({
            ...uploadPicture,
            uploadPictures
        });
    }

    const [editformData, setEditformData] = React.useState({
        categoryId: '',
        categoryName: '',
        categoryPriority: '',
        categoryStatus: '',
        categoryDescription: '',
    })

    const [addCategoryform, setAddCategoryform] = React.useState({
        addcategoryName: '',
        addcategoryPriority: '',
        addcategoryDescription: '',
    })

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            "&$checked": {
                color: green[600]
            }
        },
        checked: {}
    })(props => <Radio color="default" {...props} />);

    const [selectedValue, setSelectedValue] = React.useState({
        active: '',
        inactive: ''
    });

    function handleChange(event) {
        if (event.target.value === '1') {
            setSelectedValue({
                active: '1',
            })
        } else {
            setSelectedValue({
                inactive: '0',
            })
        }
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function onLoadcategoryAdd(event) {
        setAddCategoryform({
            ...addCategoryform,
            [event.target.name]: event.target.value,
        })
    }

    function handleClose() {
        if ((location.state != null || location.state !== undefined) && (addingCategory != null || addingCategory != undefined)) {
            history.push('/products/addproduct');
        }
        setOpen(false);
        setEditDailogOpen(false);
    }

    function onChangeEditFields(event) {
        setEditformData({
            ...editformData,
            [event.target.name]: event.target.value,
        })
    }

    function handleClickEditDailogOpen(data) {
        setEditformData({
            categoryName: data.category_name,
            categoryPriority: data.category_priority,
            categoryStatus: data.status,
            categoryDescription: data.category_description,
            categoryId: data.category_id,
            isDelete: data.isDelete
        })

        setImageUrl({
            imageUrl: data.image
        })

        if (data.status == 1) {
            setSelectedValue({
                active: '1',
            })
        } else {
            setSelectedValue({
                inactive: '0',
            })
        }
        setEditDailogOpen(true);
    }

    function handleClickDelete(event,data)
    {
        
        event.isDelete = true;
       
        const formdata = {editformData};
        console.log("event");
        
    if (selectedValue.active == 1)
    {
      event.categoryStatus = 1;
    }
    else if(selectedValue.inactive == 0)
    {
        event.categoryStatus = 0;
    }
    console.log(event);
    const headers = {
        "Access-Control-Allow-Origin": "*",
      }
     axios.post("http://localhost:5000/deletecategory", event ,{headers}).then(() => {
       console.log("sent");
     }).catch(() => {
        console.log("Something went wrong. Plase try again later");
    });

    }

    function onChangeimgUrl(event) {
        setImageUrl({
            ...imgUrl,
            [event.target.name]: event.target.value,
        })
    }

    function onloadClearInputField() {
        setImageUrl({
            imageUrl: ''
        })
    }

    function onLoadEditSubmit() {
        if (editformData.categoryName === "" || editformData.categoryPriority === "" || editformData.categoryDescription === ""
            ||  editformData.categoryDescription === undefined) {
            if (imgUrl.imageUrl !== "") {
                setEditDailogOpen(false);
                setAlertDailog(false);
            }else {
                setEditDailogOpen(true);
                setAlertDailog(true);
            }
        } else {
            const data = {editformData};
            console.log(selectedValue);
        if (selectedValue.active == 1)
        {
          data.editformData.categoryStatus = 1;
        }
        else if(selectedValue.inactive == 0)
        {
          data.editformData.categoryStatus = 0;
        }
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/editcategory", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
        setOpen(false);
            setEditDailogOpen(false);
        }
    };


    function alertHandleClose() {
        setAlertDailog(false);
    }

    function handleFormSubmit() {
        if ( addCategoryform.addcategoryName === "" || addCategoryform.addcategoryPriority === ""
            || addCategoryform.addcategoryDescription === "") {
            setOpen(true)
            setAlertDailog(true);
        } else {
            const data = {addCategoryform};
            const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/addcategory", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
        setOpen(false);

            setImageUrl({
                imageUrl: ''
            })
        }
    }
    const data = categoryData;

    const columns = [
        {
            title: 'Id', field: 'category_id',
        },
        {
            title: 'Name', field: 'category_name',
        },
        {
            title: 'Image', field: 'category_image',
        },
        {
            title: 'Description', field: 'category_description',
        },
        {
            title: 'Status', field: 'status',
        },
        {
            title: 'Priority', field: 'category_priority',
        }
    ]

    const actions = [
        {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: (event) => onLoadAddSubCategory()
        },
        {
            icon: 'edit',
            tooltip: 'edit User',
            onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        },
        {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleClickDelete(rowData, event)
        },
    ]
    function onLoadAddSubCategory() {
        setOpen(true);
    }

    function onloadImageUpload(a) {
       console.log(a)
    }

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
                    {/* <strong className={classes.headerName}>Category List</strong>
                    <Button variant="contained" className={classes.button} color="primary" onClick={handleClickOpen}>
                        Add Category
                </Button> */}
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
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Category Name <sup>*</sup></label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    onChange={onLoadcategoryAdd}
                                    name="addcategoryName"

                                    value={addCategoryform.addcategoryName}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label>Category Priority<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"

                                    onChange={onLoadcategoryAdd}
                                    name="addcategoryPriority"
                                    value={addCategoryform.addcategoryPriority}
                                />
                            </div>

                            <div className="col-sm-8">
                                <label>Description<sup>*</sup></label>
                                <textarea
                                    className="mb-16 w-100"
                                    rows="2"

                                    name="addcategoryDescription"
                                    onChange={onLoadcategoryAdd}
                                    value={addCategoryform.addcategoryDescription}
                                />
                            </div>

                            <div className="col-sm-4">
                                {(() => {
                                    if (true) {
                                        return (
                                            <div>
                                                <label> Click  <sup>*</sup></label>
                                                <Paper component="form" className={classes.root}>
                                                    <ImageUpload onloadImageUpload={onloadImageUpload} />
                                                </Paper>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <label>  Click <sup>*</sup></label>
                                                <ImageUpload onloadImageUpload={onloadImageUpload} />
                                                <br></br>
                                            </div>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="secondary">
                                Cancel
                                    </Button>
                            <Button onClick={handleFormSubmit} variant="contained" color="primary" autoFocus>
                                Submit
                                    </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>

                <Dialog classes={{ paper: classes.dialogPaper }}
                    fullWidth={true}
                    maxWidth={'md'}
                    fullScreen={fullScreen}
                    open={editDailogOpen}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Add Category"}
                    </DialogTitle>
                   
                   <DialogContent>
                        <div className="row">

                            <div className="col-sm-6">
                                <label> Category Id<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    name="categoryId"
                                    readOnly
                                    disabled
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryId}
                                />
                            </div>

                            <div className="col-sm-6">
                                <label> Category Name<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100"
                                    type="text"
                                    name="categoryName"
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryName}
                                />
                            </div>

                            <div className="col-sm-6">
                                <label> Category Priority <sup>*</sup></label>
                                <input
                                    type="text"
                                    className="mb-16 w-100"
                                    name="categoryPriority"

                                    onChange={onChangeEditFields}
                                    value={editformData.categoryPriority}
                                />
                            </div>
                            <div className="col-sm-6">

                                <label>Status<sup>*</sup></label>
                                <div className={classes.radiobtn}>
                                    <label>Active</label>
                                    <Radio
                                        checked={selectedValue.active === '1'}
                                        onChange={handleChange}
                                        value={selectedValue.active}
                                        name="active"
                                        inputProps={{ "aria-label": "active" }}
                                    />
                                    <label>Inactive</label>
                                    <Radio
                                        checked={selectedValue.inactive === '0'}
                                        onChange={handleChange}
                                        value={selectedValue.inactive}
                                        name="inactive"
                                        inputProps={{ "aria-label": "inactive" }}
                                    />
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <label>Description<sup>*</sup></label>
                                <textarea
                                    className="mb-16 w-100"
                                    rows="2"

                                    name="categoryDescription"
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryDescription}
                                />
                            </div>

                            <div className="col-sm-6">
                                {(() => {
                                    if (true) {
                                        return (
                                            <div>
                                                <label>Image Url<sup>*</sup></label>
                                                <Paper component="form" className={classes.root}>
                                                    <InputBase
                                                        placeholder="enter image url"
                                                        value={imgUrl.imageUrl}
                                                        name="imageUrl"
                                                        className="mb-16 w-100"
                                                        onChange={onChangeimgUrl}
                                                        inputProps={{ 'aria-label': 'Image Url' }}
                                                    />
                                                    <IconButton
                                                        className={classes.iconButton} aria-label="search" onClick={() => onloadClearInputField()}>
                                                        <Icon color="primary" >close</Icon>
                                                    </IconButton>
                                                </Paper>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <label>Image Upload<sup>*</sup></label><br></br>
                                                <ImageUpload />
                                            </div>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={onLoadEditSubmit} variant="contained" color="primary" autoFocus>
                            Submit
                    </Button>
                    </DialogActions>
                </Dialog>
            
            </div>
            <div>

                <Dialog
                    open={alertDailog}
                    onClose={alertHandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Alert Message"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please fill required fields
                    </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={alertHandleClose} color="primary" autoFocus>
                            OK
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className="overflow-auto">
                <MaterialTable title="Category List"
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
