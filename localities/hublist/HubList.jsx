import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import Config from '../../config';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import DialogContentText from "@material-ui/core/DialogContentText";

import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles(theme => ({
    radiobtn: {
        border: '1px solid silver',
        paddingLeft: '10px',
        borderRadius: '4px'
    },

    activeStyle: {
        background: '#a6e6a6',
        padding: '6px',
        width: '45%',
    },

    inactiveStyle: {
        background: '#e4ba6c',
        padding: '6px',
        width: '45%',
    }
}));

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const animatedComponents = makeAnimated();
let addHub = {}

const HubList = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);
    const [editDailogOpen, setEditDailogOpen] = React.useState(false);

    const [alertDailog, setAlertDailog] = React.useState(false);

    const [selectedValue, setSelectedValue] = React.useState('1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [citiesValue, setCitiesValue] = useState();
    const [warehouseValue, setWarehouseValue] = useState();
    const [cityData, setCityData] = React.useState([]);
    const [warehouseData, setWarehouseData] = React.useState([]);
    const [hubData, setHubData] = React.useState([]);
    const [isLoadingCity, setIsLoadingCity] = React.useState([]);
    const [isLoadingWarehouse, setIsLoadingWarehouse] = React.useState([]);
    const [editformData, setEditformData] = React.useState({
        id: '',
        name: '',
        description: '',
    })

    const [addformData, setAddformData] = React.useState({
        name: '',
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

    useEffect(() => {
        addHub = location.state;
        if ((location.state != null || location.state != undefined) && (addHub != null || addHub != undefined)) {
            setOpen(true);
        }
        const sendRequest = async () => {
            const response_city = await fetch(`${Config.baseURL}/v1/getcity`);
            const responseData_city = await response_city.json();
            setCityData(responseData_city);
            setIsLoadingCity(true);
            const response_hub= await fetch(`${Config.baseURL}/v1/gethub`);
            const responseData_hub = await response_hub.json();
            setHubData(responseData_hub);
        };
        sendRequest();

    }, [location])


    async function getWarehouseByCity(city)
    {
        axios.get(`${Config.baseURL}/v1/getwarehousebycity`,{ params: {city :city}} ).then((response) => { 
            console.log(response.data);
            setWarehouseData(response.data);
            setIsLoadingWarehouse(true);
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
            id: data.hub_id,
            name: data.hub_name,
            description: data.description,
            city: data.city,
            warehouse: data.warehouse
        });
        setSelectedValue(data.status.toString());
        onloadcityDetails(data);
        onloadWarehouseDetails(data);
        setEditDailogOpen(true);
    }

    function onLoadEditSubmit() {
        console.log(warehouseValue);
        if (editformData.name === "" || citiesValue === null || citiesValue === undefined ||
            warehouseValue === null || warehouseValue === undefined) {
            setEditDailogOpen(true);
            setAlertDailog(true);
        } else {
            let editedData = {
                addformData: editformData,
                status: selectedValue,
                selectedCities: citiesValue,
                selectedWarehouse: warehouseValue,
            }
            console.log(editedData);
            var data = editedData.addformData;
            console.log(data);
            if(editedData.selectedCities.label == null || editedData.selectedCities.label == undefined)
            {
                data['city'] = editformData.city;
            }
            else {
                data['city'] = editedData.selectedCities.label;
            }
            if(editedData.selectedWarehouse.label == null || editedData.selectedWarehouse.label == undefined)
            {
                data['warehouse'] = editformData.warehouse;
            }
            else {
                data['warehouse'] = editedData.selectedWarehouse.label;
            }
            
            
            data['status'] = editedData.status;

            const headers = {
                "Access-Control-Allow-Origin": "*",
              } 
             console.log(data);
             axios.post(`${Config.baseURL}/v1/edithub`, data ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            setEditformData({
                id: '',
                name: '',
                description: ''
            })

            reSetFields();
            backtoSamePage();
        }
    };

    function alertHandleClose() {
        setAlertDailog(false);
    }

    function handleFormSubmit() {
        if (addformData.name === "" || citiesValue === null || citiesValue === undefined ||
            warehouseValue === null || warehouseValue === undefined) {
            setOpen(true)
            setAlertDailog(true);
        } else {
            setOpen(false)

            let addedData = {
                addformData: addformData,
                status: selectedValue,
                selectedCities: citiesValue,
                selectedWarehouse: warehouseValue,
            }

            console.log(addedData);
            var data = addformData;
            console.log(data);
            data['city'] = addedData.selectedCities.label;
            data['warehouse'] = addedData.selectedWarehouse.label;
            data['status'] = addedData.status;
            const headers = {
                "Access-Control-Allow-Origin": "*",
              } 
             console.log(data);
             axios.post(`${Config.baseURL}/v1/addhub`, data ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            reSetFields();
            backtoSamePage();
            setAddformData({
                name: "",
                description: "",
            })
        }
    }

    function handleClose() {
        reSetFields();
        backtoSamePage();
    }

    function reSetFields() {
        setOpen(false);
        setEditDailogOpen(false);
        setSelectedValue('1')
        setAlertDailog(false);
        setCitiesValue(null);
        setWarehouseValue(null);
    }

    const onloadSelectCities = (value) => {

        if (value !== null) {
            redirectToRequiredPage(value);
        }
        console.log(value.label);
        getWarehouseByCity(value.label);
        setCitiesValue(value);
        
    };

    const onloadSelectWarehouse = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        setWarehouseValue(value)
    }

    function redirectToRequiredPage(value) {
        if (value.id === 0) {
            if (value.state === 0) {
                history.push({
                    pathname: '/locality/citylist',
                    state: {
                        name: 'addcity',
                        id: 0,
                        page: 'hub'
                    }
                })
            } else if (value.state === 1) {
                history.push({
                    pathname: '/locality/warehouse',
                    state: {
                        name: 'addwarehouse',
                        id: 0,
                        page: 'hub'
                    }
                })
            }
        }
    }

    function onloadcityDetails(cityDetails) {
        let data = [];
        data.push(
            {
                label: cityDetails.label,
                value: cityDetails.value,
                id: cityDetails.id,
            }
        );
        onloadSelectCities(data);
    }
    function onloadWarehouseDetails(warehouseDetails) {
        let data = [];
        data.push(
            {
                label: warehouseDetails.warehouseLabel,
                value: warehouseDetails.warehouseName,
                id: warehouseDetails.warehouseId,
            }
        );

        onloadSelectWarehouse(data);
    }

    function backtoSamePage() {
        if ((location.state != null || location.state != undefined) && (addHub != null || addHub != undefined)) {
            if (location.state.page === 'store') {
                history.push('/locality/storelist');
            } else if (location.state.page === 'locality') {
                history.push('/locality/localitylist');
            }
        }
    }

    const addNewCityButton = [
        { value: "addcity", city_name: "Add City  + ", city_id: 0, state: 0 }
    ];

    function cities() {
        return (isLoadingCity && addNewCityButton.concat(cityData).map(data => ({ label: data.city_name, id: data.city_id, state: data.state })))
    }

    const addNewWarehouseButton = [
        { value: "addwarehouse", warehouse_name: "Add Warehouse  + ", warehouse_id: 0, state: 1 },
    ];

    function warehouseList() {
        return (isLoadingWarehouse && addNewWarehouseButton.concat(warehouseData).map(data => ({ label: data.warehouse_name, id: data.warehouse_id, state: data.state })))
    }


    const data = hubData;

    const columns = [
        {
            title: 'Id', field: 'hub_id',
        },
        {
            title: 'Hub Name', field: 'hub_name',
        },
        {
            title: 'Warehouse Name', field: 'warehouse',
        },
        {
            title: 'City Name', field: 'city',
        },
        {
            title: 'Description', field: 'description',
        },
        {
            title: 'Status', field: 'status', render: rowData => <div>{rowData.status == 1 ? <div className={classes.activeStyle}>Active</div> : <div className={classes.inactiveStyle}>Inactive</div>}</div>
        },
    ]

    const actions = [
        {
            icon: 'add',
            tooltip: 'Add Hub',
            isFreeAction: true,
            onClick: (event) => onLoadAddDailogOpen()
        },
        {
            icon: 'edit',
            tooltip: 'edit Hub',
            onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        },
        {
            icon: 'delete',
            tooltip: 'Delete Hub',
            onClick: (event, rowData) =>  handleClickDelete(rowData, event)
        },
    ]

    function onLoadAddDailogOpen() {
        setOpen(true);
    }

    function handleClickDelete(event,data)
    {
        event.isDelete = true;
        const headers = {
            "Access-Control-Allow-Origin": "*",
        }
        axios.post(`${Config.baseURL}/v1/deletehub`, event ,{headers}).then(() => {
            console.log("sent");
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Hub", path: "/locality/hublist" },
                        { name: "Locality" }
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
                        {"Add Hub"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Hub Name <sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    onChange={onLoadAddFormFieldChange}
                                    name="name"
                                    value={addformData.name}
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

                            <div className="col-sm-12">
                                <label>Select City <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    value={citiesValue}
                                    onChange={onloadSelectCities}
                                    options={cities()}
                                />
                            </div>

                            <div className="col-sm-12">
                                <label>Select Warehouse <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    value={warehouseValue}
                                    onChange={onloadSelectWarehouse}
                                    options={warehouseList()}
                                />
                            </div>

                            <div className="col-sm-12">
                                <label>Hub Description</label>
                                <textarea
                                    className="mb-16 w-100 form-control"
                                    rows="2"
                                    name="description"
                                    onChange={onLoadAddFormFieldChange}
                                    value={addformData.description}
                                />
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
                        {"Edit Hub"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Hub Name<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    name="name"
                                    onChange={onChangeEditFields}
                                    value={editformData.name}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label> Hub Id<sup>*</sup></label>
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

                            <div className="col-sm-8">
                                <label>Hub Description</label>
                                <textarea
                                    className="mb-16 w-100 form-control"
                                    rows="2"
                                    name="description"
                                    onChange={onChangeEditFields}
                                    value={editformData.description}
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
                            <div className="col-sm-12">
                                <label>Select City <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={{label : editformData.city, value: editformData.city}}
                                    onChange={onloadSelectCities}
                                    options={cities()}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>Select Warehouse <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={{label : editformData.warehouse, value: editformData.warehouse}}
                                    onChange={onloadSelectWarehouse}
                                    options={warehouseList()}
                                />
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
            <MaterialTable title="Hub List"
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

export default HubList;
