import React from "react";
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

const ProdcutBrand = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editDailogOpen, setEditDailogOpen] = React.useState(false);

  const [alertDailog, setAlertDailog] = React.useState(false);
  const [uploadPicture, setUploadPicture] = React.useState([]);

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

  const [addformData, setAddformData] = React.useState({
    name: '',
    priority: '',
    description: '',
  })

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [brandData, setBrandData] = React.useState([]);
  React.useEffect(() => {
    const sendRequest = async () => {
        const response = await fetch("http://localhost:5000/getbrand");
        const responseData = await response.json();
        if(JSON.stringify(responseData) != JSON.stringify(brandData))
        {
            setBrandData(responseData);
        }
       
    };
    sendRequest();
});



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

  function onLoadAddFormFieldChange(event) {
    setAddformData({
      ...addformData,
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
       
        const formdata = {editformData};
        console.log("event");
        
    
    console.log(event);
    const headers = {
        "Access-Control-Allow-Origin": "*",
      }
     axios.post("http://localhost:5000/deletebrand", event ,{headers}).then(() => {
       console.log("sent");
     }).catch(() => {
        console.log("Something went wrong. Plase try again later");
    });

    }


   function handleClickEditDailogOpen(data) {
    setEditformData({
      id:data.brand_id,
      name: data.brand_name,
      priority: data.brand_priority,
      status: data.status,
      description: data.brand_description
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
      const headers = {
        "Access-Control-Allow-Origin": "*",
      }
     axios.post("http://localhost:5000/editbrand", data ,{headers}).then(() => {
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
    if ( addformData.name === "" || addformData.priority === ""
      || addformData.description === "") {
      setOpen(true)
      setAlertDailog(true);
    } else {
      const data = {addformData};
      console.log(data);
      const headers = {
      "Access-Control-Allow-Origin": "*",
    }
   axios.post("http://localhost:5000/addbrand", data ,{headers}).then(() => {
     console.log("sent");
   }).catch(() => {
      console.log("Something went wrong. Plase try again later");
  });

      setImageUrl({
        imageUrl: ''
      })
    }
    setOpen(false);
  }

  const data = brandData;

  const columns = [
    {
      title: 'Id', field: 'brand_id',
    },
    {
      title: 'Name', field: 'brand_name',
    },
    {
      title: 'Image', field: 'image',
    },
    {
      title: 'Description', field: 'brand_description',
    },
    {
      title: 'Priority', field: 'brand_priority',
    },
  ]

  const actions = [
    {
      icon: 'add',
      tooltip: 'Add Brand',
      isFreeAction: true,
      onClick: (event) => onLoadAddDailogOpen()
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

  function onLoadAddDailogOpen() {
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
            { name: "Brand", path: "/products/brand" },
            { name: "Inventory" }
          ]}
        />
      </div><hr></hr>
      <div>
        <Dialog 
          maxWidth={'md'}
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Add Brand"}
          </DialogTitle>
          <DialogContent>
            <div className="row">
              
              <div className="col-sm-6">
                <label> Brand Name <sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  onChange={onLoadAddFormFieldChange}
                  name="name"
                  value={addformData.name}
                />
              </div>

              <div className="col-sm-6">
                <label>Brand Priority<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"

                  onChange={onLoadAddFormFieldChange}
                  name="priority"
                  value={addformData.priority}
                />
              </div>

              <div className="col-sm-6">
                <label>Brand Description<sup>*</sup></label>
                <textarea
                  className="mb-16 w-100"
                  rows="2"

                  name="description"
                  onChange={onLoadAddFormFieldChange}
                  value={addformData.description}
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
            {"Edit Brand"}
          </DialogTitle>
          <DialogContent>
            <div className="row">

            <div className="col-sm-6">
                <label> Brand Id<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="id"
                  readOnly
                  onChange={onChangeEditFields}
                  value={editformData.id}
                />
              </div>

              <div className="col-sm-6">
                <label> Brand Name<sup>*</sup></label>
                <input
                  className="mb-16 w-100"
                  type="text"
                  name="name"
                  onChange={onChangeEditFields}
                  value={editformData.name}
                />
              </div>

              <div className="col-sm-6">
                <label> Brand Priority <sup>*</sup></label>
                <input
                  type="text"
                  className="mb-16 w-100"
                  name="priority"

                  onChange={onChangeEditFields}
                  value={editformData.priority}
                />
              </div>
              <div className="col-sm-6">
                <label>Brand Description<sup>*</sup></label>
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
      <MaterialTable title="Brand List"
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

export default ProdcutBrand;
