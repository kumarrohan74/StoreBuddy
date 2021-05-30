import React, { useState } from "react";
import { Breadcrumb } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Button,

} from "@material-ui/core";
import Config from '../../config';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import axios from 'axios';
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import DialogContentText from "@material-ui/core/DialogContentText";
import MaterialTable from 'material-table';
import { ImageUpload } from "app/views/uploadImage/ImageUpload";


const useStyles = makeStyles(theme => ({
    radiobtn: {
        border: '1px solid silver',
        paddingLeft: '10px',
        borderRadius: '4px'
    }
}));

let addingCategory = {};
let imageValue = [];
const PrdoductCategory = () => {

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
            const response = await fetch(`${Config.baseURL}/v1/getcategory`);
            const responseData = await response.json();
            if(JSON.stringify(responseData) !=JSON.stringify(categoryData))
            {
                setCategoryData(responseData);
                setIsLoading(true);
            }
            console.log(responseData);
        };
       
        sendRequest();
    }, [location])

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [editDailogOpen, setEditDailogOpen] = React.useState(false);

    const [alertDailog, setAlertDailog] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }

    const [editformData, setEditformData] = React.useState({
        categoryId: '',
        categoryName: '',
        categoryPriority: '',
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

    const [selectedValue, setSelectedValue] = React.useState('1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
;    };

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
            categoryImage: data.category_image,
            isDelete: data.isDelete
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

        setSelectedValue(data.status.toString())
        setEditDailogOpen(true);
    }

    function onLoadEditSubmit() {
        if (editformData.categoryName === "" || editformData.categoryPriority === "" ||
            imageValue.length === 0) {
            setEditDailogOpen(true);
            setAlertDailog(true);
        } else {
            let editvalue = {
                value: editformData,
                status: selectedValue,
                imageData: imageValue
            }
            console.log(editvalue);
            imageValue = [];
            const data = {editformData};
            console.log(editformData);
            var fd_edit = new FormData();
            fd_edit.append("categoryName",editformData.categoryName);
            fd_edit.append("categoryDescription", editformData.categoryDescription);
            fd_edit.append("categoryPriority", editformData.categoryPriority);
            fd_edit.append("categoryImage", editformData.categoryImage);
           
            fd_edit.append("categoryId", editformData.categoryId);
            fd_edit.append("isDelete", editformData.isDelete);
            if (selectedValue == 1)
            {
                fd_edit.append("categoryStatus", 1);
            }
            else if(selectedValue == 0)
            {
                fd_edit.append("categoryStatus", 0);
            }
            const headers = {
                "Access-Control-Allow-Origin": "*",
              }
             axios.post(`${Config.baseURL}/v1/editcategory`, fd_edit ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            setEditDailogOpen(false);
        }
    };

    function alertHandleClose() {
        setAlertDailog(false);
    }

    function handleFormSubmit() {
        if (imageValue.length === 0 || addCategoryform.addcategoryName === "" || addCategoryform.addcategoryPriority === "") {
            setOpen(true)
            setAlertDailog(true);
        } else {
            const data = addCategoryform;
            var fd = new FormData();
            fd.append("addcategoryName",addCategoryform.addcategoryName);
            fd.append("addcategoryDescription", addCategoryform.addcategoryDescription);
            fd.append("addcategoryPriority", addCategoryform.addcategoryPriority);
            fd.append("categoryImage", addCategoryform.categoryImage);
            const headers = {
            "Access-Control-Allow-Origin": "*",
          }
            axios.post(`${Config.baseURL}/v1/addcategory`, fd ,{headers}).then(() => {
            console.log("sent");
            }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            setOpen(false)
            imageValue = [];
        }
    }

    function handleClickDelete(event,data)
    {
        event.isDelete = true;
        const formdata = {editformData};
        if (selectedValue.active == 1)
        {
            event.categoryStatus = 1;
        }
        else if(selectedValue.inactive == 0)
        {
            event.categoryStatus = 0;
        }
        const headers = {
            "Access-Control-Allow-Origin": "*",
        }
        axios.post(`${Config.baseURL}/v1/deletecategory`, event ,{headers}).then(() => {
            console.log("sent");
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
    }

    function onLoadAddSubCategory() {
        setOpen(true);
    }

    function onloadImageUpload(event) {
        imageValue = event[0].file;
        console.log(event[0].file);
        setAddCategoryform({...addCategoryform, categoryImage: event[0].file});
    }

    function onloadEditImageUpload(event) {
        imageValue = event[0].file;
        setEditformData({...editformData, categoryImage: event[0].file});
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
            title: 'Image', field: 'category_image', render : rowData => <img src={`${Config.baseURL}/uploads/${rowData.category_image}`} style={{ width: 40, borderRadius: '50%' }} />
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
            tooltip: 'edit Category',
            onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        },
        {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleClickDelete(rowData, event)
        },
    ]

    return (
        <Card elevation={3} className="pt-20 mb-24">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Category", path: "/products/category" },
                        { name: "Inventory" }
                    ]}
                />
            </div>

            <div>
                <Dialog
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
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    onChange={onLoadcategoryAdd}
                                    name="addcategoryName"

                                    value={addCategoryform.addcategoryName}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label>Category Priority<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    onChange={onLoadcategoryAdd}
                                    name="addcategoryPriority"
                                    value={addCategoryform.addcategoryPriority}
                                />
                            </div>

                            <div className="col-sm-8">
                                <label>Description</label>
                                <textarea
                                    className="mb-16 w-100 form-control"
                                    rows="2"
                                    name="addcategoryDescription"
                                    onChange={onLoadcategoryAdd}
                                    value={addCategoryform.addcategoryDescription}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label>Click or Drop here<sup>*</sup></label>
                                <Paper component="form">
                                    <ImageUpload onloadImageUpload={onloadImageUpload} />
                                </Paper>
                            </div>
                        </div><hr></hr>
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

                <Dialog
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
                            <div className="col-sm-8">
                                <label> Category Id<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    name="categoryId"
                                    readOnly
                                    disabled
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryId}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label> Category Priority <sup>*</sup></label>
                                <input
                                    type="text"
                                    className="mb-16 w-100 form-control"
                                    name="categoryPriority"
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryPriority}
                                />
                            </div>

                            <div className="col-sm-8">
                                <label> Category Name<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    name="categoryName"
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryName}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label>Status<sup>*</sup></label>
                                <div className={classes.radiobtn}>
                                    <label>Active</label>
                                    <Radio
                                        checked={selectedValue === '1'}
                                        onChange={handleChange}
                                        value="1"
                                        name="status"
                                    />
                                    <label>InActive</label>
                                    <Radio
                                        checked={selectedValue === '0'}
                                        onChange={handleChange}
                                        value="0"
                                        name="status"
                                    />
                                </div>

                            </div>
                            <div className="col-sm-8">
                                <label>Description</label>
                                <textarea
                                    className="mb-16 w-100 form-control"
                                    rows="2"
                                    name="categoryDescription"
                                    onChange={onChangeEditFields}
                                    value={editformData.categoryDescription}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label>Click or Drop here<sup>*</sup></label>
                                <Paper component="form">
                                    <ImageUpload onloadImageUpload={onloadEditImageUpload} />
                                </Paper>
                            </div>
                        </div>
                    </DialogContent><hr></hr>
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
                        <Button onClick={alertHandleClose} variant="contained" color="primary" autoFocus>
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
