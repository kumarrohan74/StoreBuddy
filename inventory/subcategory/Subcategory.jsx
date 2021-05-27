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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DialogContentText from "@material-ui/core/DialogContentText";
import ImageUploader from 'react-images-upload';
import { ImageUpload } from "app/views/uploadImage/ImageUpload";
const useStyles = makeStyles(theme => ({

  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid silver'
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
    float: 'right',
    marginRight: '10px'
  },
  headerName: {
    float: 'left',
    padding: '0px 0px 0px 10px'
  },
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

let addingSubCategory = {};
const ProdcutSubCategory = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editDailogOpen, setEditDailogOpen] = React.useState(false);
  const [subCategoryData, setSubCategoryData] = React.useState([]);
  const [alertDailog, setAlertDailog] = React.useState(false);
  const [uploadPicture, setUploadPicture] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function handleClose() {
    setOpen(false);
    setEditDailogOpen(false);
    setAlertDailog(false);
  }

  const [imgUrl, setImageUrl] = React.useState({
    imageUrl: ''
  });

  const [editformData, setEditformData] = React.useState({
    id:'',
    name: '',
    priority: '',
    status: '',
    description: '',
  })

  const [addSubCategoryform, setAddSubCategoryform] = React.useState({
    name: '',
    priority: '',
    description: '',
  })

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    
    addingSubCategory = location.state;
    if ((location.state != null || location.state != undefined) && (addingSubCategory != null || addingSubCategory != undefined)) {
        setOpen(true);
    }
    const sendRequest = async () => {
        const response = await fetch("http://localhost:5000/getsubcategory");
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
  const headers = {
      "Access-Control-Allow-Origin": "*",
    }
   axios.post("http://localhost:5000/deletesubcategory", event ,{headers}).then(() => {
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
            id: data.subcategory_id
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

    setImageUrl({
      imageUrl: data.image
    })

    setEditDailogOpen(true);
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
    if (editformData.name === "" || editformData.priority === "" || editformData.description === ""
       || editformData.description === undefined) {
      if (imgUrl.imageUrl !== "") {
        setEditDailogOpen(false);
        setAlertDailog(false);
      } else {
        setEditDailogOpen(true);
        setAlertDailog(true);
      }
    } else {
      const data = {editformData};
        if (selectedValue.active == 1)
        {
          data.editformData.status = 1;
        }
        else
        {
          data.editformData.status = 0;
        }
        console.log(editformData);
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/editsubcategory", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
        setOpen(false);
      setEditDailogOpen(false);
    }
    console.log(editformData);
    console.log(selectedValue);
    console.log(imgUrl);
  };

  function alertHandleClose() {
    setAlertDailog(false);
  }

  const onDropPrimary = (uploadPictures) => {
    console.log(uploadPictures)
    setUploadPicture({
      ...uploadPicture,
      uploadPictures
    });
  }

  function handleFormSubmit() {
    if ( addSubCategoryform.name === "" || addSubCategoryform.priority === ""
      || addSubCategoryform.description === "") {
      setOpen(true)
      setAlertDailog(true);
    } else {
      const data = {addSubCategoryform};
       
        
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
         axios.post("http://localhost:5000/addsubcategory", data ,{headers}).then(() => {
           console.log("sent");
         }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
        
        setOpen(false);
    }
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
      title: 'Image', field: 'image',
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
      tooltip: 'edit User',
      onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (event, rowData) =>handleClickDelete(rowData, event)
    },
  ]


  function onLoadAddSubCategory() {
    setOpen(true);
  }

  function onloadImageUpload(a) {
    console.log(a)
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
        <Dialog classes={{ paper: classes.dialogPaper }}
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
              <div className="col-sm-6">
                <label> Subcategory Name <sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  onChange={onLoadSubcategoryAdd}
                  name="name"
                  value={addSubCategoryform.name}
                />
              </div>

              <div className="col-sm-6">
                <label>Subcategory Priority<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"

                  onChange={onLoadSubcategoryAdd}
                  name="priority"
                  value={addSubCategoryform.priority}
                />
              </div>

              <div className="col-sm-6">
                <label>Subcategory Description<sup>*</sup></label>
                <textarea
                  className="mb-16 w-100"
                  rows="2"

                  name="description"
                  onChange={onLoadSubcategoryAdd}
                  value={addSubCategoryform.description}
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
            {"Add Subcategory"}
          </DialogTitle>
          <DialogContent>
            <div className="row">

            <div className="col-sm-6">
                <label> Subcategory Id<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="id"
                  readOnly
                  disabled
                  onChange={onChangeEditFields}
                  value={editformData.id}
                />
              </div>

              <div className="col-sm-6">
                <label> Subcategory Name<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="name"
                  onChange={onChangeEditFields}
                  value={editformData.name}
                />
              </div>

              <div className="col-sm-6">
                <label> Subcategory Priority <sup>*</sup></label>
                <input
                  type="text"
                  className="mb-16 w-100"
                  name="priority"

                  onChange={onChangeEditFields}
                  value={editformData.priority}
                />
              </div>
              <div className="col-sm-6">
                <label>Subcategory Description<sup>*</sup></label>
                <textarea
                  className="mb-16 w-100"
                  rows="2"

                  name="description"
                  onChange={onChangeEditFields}
                  value={editformData.description}
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
                        /><br></br>
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
