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
import axios from 'axios';
import {
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import DialogContentText from "@material-ui/core/DialogContentText";
import { useEffect } from "react";
import { useLocation,useHistory} from "react-router-dom";
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
let addingCategory = {};
const ProdcutSubCategory = () => {

  const classes = useStyles();
  
  const [editDailogOpen, setEditDailogOpen] = React.useState(false);

  const [alertDailog, setAlertDailog] = React.useState(false);
  const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [inputs, setInputs] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [subCategoryData, setSubCategoryData] = React.useState([]);

    
    useEffect(() => {
      addingCategory = location.state;
      if ((location.state != null || location.state != undefined) && (addingCategory != null || addingCategory != undefined)) {
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
      };
      sendRequest();

  });
  function handleClose() {
    setOpen(false);
    setEditDailogOpen(false);
    setAlertDailog(false);
  }

  const [imgUrl, setImageUrl] = React.useState({
    imageUrl: ''
  });

  const [editformData, setEditformData] = React.useState({
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

  function handleOnSubmit()
    {
        const data = {inputs};
       
        
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

  function onChangeEditFields(event) {
    setEditformData({
      ...editformData,
      [event.target.name]: event.target.value,
    })
  }

  function handleClickEditDailogOpen(data) {
    setEditformData({
      name: data.name,
      priority: data.priority,
      status: data.status,
      description: data.description
    })

    if (data.status === 1) {
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
      || imgUrl.imageUrl === "" || editformData.description === undefined) {
      setEditDailogOpen(true);
      setAlertDailog(true);
    } else {
      setEditDailogOpen(false);
    }
    console.log(editformData);
    console.log(selectedValue);
    console.log(imgUrl);
  };

  function alertHandleClose() {
    setAlertDailog(false);
  }

  function handleFormSubmit() {
    if (imgUrl.imageUrl === "" || addSubCategoryform.name === "" || addSubCategoryform.priority === ""
      || addSubCategoryform.description === "") {
      setOpen(true)
      setAlertDailog(true);
    } else {
      setOpen(false)

      setAddSubCategoryform({
        name: "",
        priority: "",
        description: "",
      })

      setImageUrl({
        imageUrl: ''
      })
    }
  }

  const data = subCategoryData;

  const columns = [
    {
      title: 'Id', field: 'id',
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
      onClick: (event, rowData) => alert("You saved " + rowData.name)
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
                  name="subCategoryName"
                  id="subcategory_name"
                  value={inputs.subCategoryName || ''}
                  onChange={e => setInputs({ ...inputs, subCategoryName: e.target.value })}
                />
              </div>

              <div className="col-sm-6">
                <label>Subcategory Priority<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="scpriority"
                  id="subcategory_priority"
                  value={inputs.subCategoryPriority || ''}
                  onChange={e => setInputs({ ...inputs, subCategoryPriority: e.target.value })}
                />
              </div>

              <div className="col-sm-6">
                <label>Subcategory Description<sup>*</sup></label>
                <textarea
                  className="mb-16 w-100"
                  rows="2"
                  name="subcategorydescription"
                  id="subcategory_description"
                  value={inputs.subCategoryDescription || ''}
                  onChange={e => setInputs({ ...inputs, subCategoryDescription: e.target.value })}
                />
              </div>

              <div className="col-sm-6">
                {(() => {
                  if (imgUrl.imageUrl.length > 0) {
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
                        <input
                          accept="image/*"
                          multiple
                          type="file"
                          name="imageUrl"
                          value={imgUrl.imageUrl}
                          onChange={onChangeimgUrl}
                        /><br></br>
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
              <Button onClick={handleOnSubmit} variant="contained" color="primary" autoFocus>
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
                <label> Subcategory Name<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="name"
                  required={true}
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

              <div className="col-sm-12">
                {(() => {
                  if (imgUrl.imageUrl.length > 0) {
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
                        <input
                          accept="image/*"
                          multiple
                          type="file"
                          name="imageUrl"
                          value={imgUrl.imageUrl}
                          onChange={onChangeimgUrl}
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
