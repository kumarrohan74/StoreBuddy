import React from "react";
import { Breadcrumb } from "matx";
import MaterialTable from 'material-table';
import Config from '../../config';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Button,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
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
let addingBrand = {};
const ProdcutBrand = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editDailogOpen, setEditDailogOpen] = React.useState(false);

  const [alertDailog, setAlertDailog] = React.useState(false);

  function handleClose() {
    setOpen(false);
    setEditDailogOpen(false);
    setAlertDailog(false);
  }

  const [selectedValue, setSelectedValue] = React.useState('1');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [editformData, setEditformData] = React.useState({
    id: '',
    name: '',
    priority: '',
    description: '',
  })

  const [addformData, setAddformData] = React.useState({
    name: '',
    priority: '',
    description: '',
  })

  const location = useLocation();
  const history = useHistory();
  const [brandData, setBrandData] = React.useState([]);
  React.useEffect(() => {
    addingBrand = location.state;
        if ((location.state != null || location.state != undefined) && (addingBrand != null || addingBrand != undefined)) {
            setOpen(true);
        }
    const sendRequest = async () => {
        const response = await fetch(`${Config.baseURL}/v1/getbrand`);
        const responseData = await response.json();
        if(JSON.stringify(responseData) != JSON.stringify(brandData))
        {
            setBrandData(responseData);
        }
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


  function handleClickDelete(event,data)
    {
        event.isDelete = true;
        const formdata = {editformData};
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
        axios.post(`${Config.baseURL}/v1/deletebrand`, event ,{headers}).then(() => {
          console.log("sent");
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });

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

  function handleClickEditDailogOpen(data) {
    setEditformData({
      id:data.brand_id,
      name: data.brand_name,
      priority: data.brand_priority,
      status: data.status,
      description: data.brand_description,
      brandImage: data.category_image,
      isDelete: data.isDelete
    })
    setEditDailogOpen(true);
  }

  function onLoadEditSubmit() {
    if (editformData.name === "" || editformData.priority === "" || imageValue.length === 0) {
      setEditDailogOpen(true);
      setAlertDailog(true);
    } else {
      imageValue = [];
      let editformvalue = {
        value: editformData,
        status: selectedValue
      }
        const data = {editformData};
        var fd = new FormData();
        fd.append("name",editformData.name);
        fd.append("description", editformData.description);
        fd.append("priority", editformData.priority);
        fd.append("brandImage", editformData.brandImage);
        fd.append("id", editformData.id);
        const headers = {
          "Access-Control-Allow-Origin": "*",
        }
      axios.post(`${Config.baseURL}/v1/editbrand`, fd ,{headers}).then(() => {
        console.log("sent");
      }).catch(() => {
          console.log("Something went wrong. Plase try again later");
      });
        console.log(editformvalue);
        setEditDailogOpen(false);
      }
  };

  function alertHandleClose() {
    setAlertDailog(false);
  }

  function handleFormSubmit() {
    if (imageValue.length === 0 || addformData.name === "" || addformData.priority === "") {
      setOpen(true)
      setAlertDailog(true);
    } else {
      const data = {addformData};
      console.log(data);
      var fd = new FormData();
      fd.append("name",addformData.name);
      fd.append("description", addformData.description);
      fd.append("priority", addformData.priority);
      fd.append("brandImage", addformData.brandImage);
      const headers = {
      "Access-Control-Allow-Origin": "*",
        }
      axios.post(`${Config.baseURL}/v1/addbrand`, fd ,{headers}).then(() => {
        console.log("sent");
      }).catch(() => {
          console.log("Something went wrong. Plase try again later");
      });
          setOpen(false)
          imageValue = [];
          setAddformData({
        name: "",
        priority: "",
        description: "",
      })
    }
  }

  function onloadImageUpload(event) {
    imageValue = event[0].file;
    console.log(event[0].file);
    setAddformData({...addformData, brandImage: event[0].file});
}

  function onloadEditImageUpload(event) {
    imageValue = event[0].file;
    setEditformData({...editformData, brandImage: event[0].file});
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
      title: 'Image', field: 'brand_image', render : rowData => <img src={`${Config.baseURL}/uploads/${rowData.brand_image}`} style={{ width: 40, borderRadius: '50%' }} />
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
      tooltip: 'edit Brand',
      onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
    },
    {
      icon: 'delete',
      tooltip: 'Delete Brand',
      onClick: (event, rowData) => handleClickDelete(rowData, event)
    },
  ]

  function onLoadAddDailogOpen() {
    setOpen(true);
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

              <div className="col-sm-8">
                <label> Brand Name <sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"
                  onChange={onLoadAddFormFieldChange}
                  name="name"
                  value={addformData.name}
                />
              </div>

              <div className="col-sm-4">
                <label>Brand Priority<sup>*</sup></label>
                <input
                  className="mb-16 w-100 form-control"
                  type="text"
                  onChange={onLoadAddFormFieldChange}
                  name="priority"
                  value={addformData.priority}
                />
              </div>

              <div className="col-sm-8">
                <label>Brand Description</label>
                <textarea
                  className="mb-16 w-100 form-control"
                  rows="2"
                  name="description"
                  onChange={onLoadAddFormFieldChange}
                  value={addformData.description}
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
            {"Edit Brand"}
          </DialogTitle>
          <DialogContent>
            <div className="row">

              <div className="col-sm-8">
                <label> Brand Id<sup>*</sup></label>
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
                <label> Brand Priority <sup>*</sup></label>
                <input
                  type="text"
                  className="mb-16 w-100 form-control"
                  name="priority"

                  onChange={onChangeEditFields}
                  value={editformData.priority}
                />
              </div>

              <div className="col-sm-8">
                <label> Brand Name<sup>*</sup></label>
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
                <label>Brand Description</label>
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
