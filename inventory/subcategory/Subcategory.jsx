import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb } from "matx";
import MaterialTable from 'material-table';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Button,
} from "@material-ui/core";
import axios from 'axios';
import Config from '../../config';
import { useLocation, useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Paper from '@material-ui/core/Paper';
import DialogContentText from "@material-ui/core/DialogContentText";
import { ImageUpload } from "app/views/uploadImage/ImageUpload";

const useStyles = makeStyles(theme => ({

  radiobtn: {
    border: '1px solid silver',
    paddingLeft: '10px',
    borderRadius: '4px'
  }
}));

let imageValue = [];
let addingSubCategory = {};
const ProdcutSubCategory = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editDailogOpen, setEditDailogOpen] = React.useState(false);
  const [subCategoryData, setSubCategoryData] = React.useState([]);
  const [alertDailog, setAlertDailog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  function handleClose() {
    setOpen(false);
    setEditDailogOpen(false);
    setAlertDailog(false);
  }

  const [editformData, setEditformData] = React.useState({
    id: '',
    name: '',
    priority: '',
    description: '',
  })

  const [addSubCategoryform, setAddSubCategoryform] = React.useState({
    name: '',
    priority: '',
    description: '',
  })


  useEffect(() => {
    addingSubCategory = location.state;
    if ((location.state != null || location.state != undefined) && (addingSubCategory != null || addingSubCategory != undefined)) {
        setOpen(true);
    }
    const sendRequest = async () => {
        const response = await fetch(`${Config.baseURL}/v1/getsubcategory`);
        const responseData = await response.json();
        if(JSON.stringify(responseData) !=JSON.stringify(subCategoryData))
        {
            setSubCategoryData(responseData);
            setIsLoading(true);
        }
        console.log("subcat");
        console.log(responseData);
    };
      sendRequest();

    }, [location]);

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
  };

  function onLoadSubcategoryAdd(event) {
    setAddSubCategoryform({
      ...addSubCategoryform,
      [event.target.name]: event.target.value,
    })
  }

  function onChangeEditFields(event) {
    setEditformData({
      ...editformData,
      [event.target.name]: event.target.value,
    })
  }

  function handleClickDelete(event,data)
  {
      event.isDelete = true;
      console.log(event);
      const headers = {
      "Access-Control-Allow-Origin": "*",
    }
      axios.post(`${Config.baseURL}/v1/deletesubcategory`, event ,{headers}).then(() => {
      console.log("sent");
    }).catch(() => {
        console.log("Something went wrong. Plase try again later");
    });
  }

  function handleClickEditDailogOpen(data) {
    setEditformData({
        name: data.subcategory_name,
        priority: data.subcategory_priority,
        status: data.subcategory_status,
        description: data.subcategory_description,
        id: data.subcategory_id,
        subCategoryImage: data.subcategory_image,
        isDelete: data.isDelete,
    })
    if (data.subcategory_status == 1) {
      setSelectedValue({
        active: '1',
      })
    } else {
      setSelectedValue({
        inactive: '0',
      })
    }
    setSelectedValue(data.subcategory_status.toString());
    setEditDailogOpen(true);
  }

  function onLoadEditSubmit() {
    if (editformData.name === "" || editformData.priority === "" ||
      imageValue.length === 0) {
      setEditDailogOpen(true);
      setAlertDailog(true);
    } else {
      let editValue = {
        value: editformData,
        status: selectedValue,
        imageData: imageValue
      }
      const data = {editformData};
      var fd_edit = new FormData();
            fd_edit.append("name",editformData.name);
            fd_edit.append("description", editformData.description);
            fd_edit.append("priority", editformData.priority);
            fd_edit.append("subCategoryImage", editformData.subCategoryImage);
            fd_edit.append("id", editformData.id);
            fd_edit.append("isDelete", editformData.isDelete);
            if (selectedValue == 1)
            {
                fd_edit.append("status", 1);
            }
            else if(selectedValue == 0)
            {
                fd_edit.append("status", 0);
            }
        console.log(editformData);
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post(`${Config.baseURL}/v1/editsubcategory`, fd_edit ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });

      console.log(editValue);

      setEditDailogOpen(false);
      imageValue = [];
    }
  };

  function alertHandleClose() {
    setAlertDailog(false);
  }

  function handleFormSubmit() {
    if (addSubCategoryform.name === "" || addSubCategoryform.priority === ""
      || imageValue.length === 0) {
      setOpen(true)
      setAlertDailog(true);
    } else {
      setOpen(false)
      const data = addSubCategoryform;
      var fd = new FormData();
      fd.append("name",addSubCategoryform.name);
      fd.append("description", addSubCategoryform.description);
      fd.append("priority", addSubCategoryform.priority);
      fd.append("subCategoryImage", addSubCategoryform.subCategoryImage);
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post(`${Config.baseURL}/v1/addsubcategory`, fd ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
      imageValue = [];
      setAddSubCategoryform({
        name: "",
        priority: "",
        description: "",
      })
    }
  }

  function onloadEditImageUpload(event) {
    imageValue = event[0].file;
    console.log(event[0].file);
    setEditformData({...editformData, subCategoryImage: event[0].file});
  }

  function onloadImageUpload(event) {
    imageValue = event[0].file;
    console.log(event[0].file);
    setAddSubCategoryform({...addSubCategoryform, subCategoryImage: event[0].file});
}

  const data = subCategoryData;

  const columns = [
    {
      title: 'Id', field: 'subcategory_id',
    },
    {
      title: 'Name', field: 'subcategory_name',
    },
    {
      title: 'Image', field: 'subcategory_image', render : rowData => <img src={`${Config.baseURL}/uploads/${rowData.subcategory_image}`} style={{ width: 40, borderRadius: '50%' }} />
    },
    {
      title: 'Description', field: 'subcategory_description',
    },
    {
      title: 'Status', field: 'subcategory_status',
    },
    {
      title: 'Priority', field: 'subcategory_priority',
  }
  ]

  const actions = [
    {
      icon: 'add',
      tooltip: 'Add Subcategory',
      isFreeAction: true,
      onClick: (event) => onLoadAddSubCategory()
    },
    {
      icon: 'edit',
      tooltip: 'edit Subcategory',
      onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
    },
    {
      icon: 'delete',
      tooltip: 'Delete Subcategory',
      onClick: (event, rowData) =>handleClickDelete(rowData, event)
    },
  ]

  function onLoadAddSubCategory() {
    setOpen(true);
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Subcategory", path: "/products/subcategory" },
            { name: "Inventory" }
          ]}
        />
      </div><hr></hr>
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
            {"Add Subcategory"}
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-sm-8">
                <label> Subcategory Name <sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"
                  onChange={onLoadSubcategoryAdd}
                  name="name"
                  value={addSubCategoryform.name}
                />
              </div>

              <div className="col-sm-4">
                <label>Subcategory Priority<sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"

                  onChange={onLoadSubcategoryAdd}
                  name="priority"
                  value={addSubCategoryform.priority}
                />
              </div>

              <div className="col-sm-8">
                <label>Subcategory Description</label>
                <textarea
                  className="mb-16 w-100 form-control"
                  rows="2"

                  name="description"
                  onChange={onLoadSubcategoryAdd}
                  value={addSubCategoryform.description}
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
            {"Add Subcategory"}
          </DialogTitle>
          <DialogContent>
            <div className="row">

              <div className="col-sm-8">
                <label> Subcategory Id<sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"
                  name="id"
                  readOnly
                  disabled
                  onChange={onChangeEditFields}
                  value={editformData.id}
                />
              </div>

              <div className="col-sm-4">
                <label> Subcategory Priority <sup>*</sup></label>
                <input
                  type="text"
                  className="mb-16 w-100 form-control"
                  name="priority"

                  onChange={onChangeEditFields}
                  value={editformData.priority}
                />
              </div>

              <div className="col-sm-8">
                <label> Subcategory Name<sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"
                  name="name"
                  onChange={onChangeEditFields}
                  value={editformData.name}
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
                <label>Subcategory Description</label>
                <textarea
                  className="mb-16 w-100 form-control"
                  rows="2"
                  name="description"
                  onChange={onChangeEditFields}
                  value={editformData.description}
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
      <MaterialTable title="Sub Category List"
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

    </div >
  );
}

export default ProdcutSubCategory;
