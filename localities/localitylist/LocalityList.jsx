import React, { useState } from "react";
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

let addLocality = {};
const LocalityList = () => {

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [editDailogOpen, setEditDailogOpen] = React.useState(false);
    const [cityData, setCityData] = React.useState([]);
    const [alertDailog, setAlertDailog] = React.useState(false);
    const [isLoadingCity, setIsLoadingCity] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState('1');
    const [warehouseData, setWarehouseData] = React.useState([]);
    const [hubData, setHubData] = React.useState([]);
    const [isLoadingHub, setIsLoadingHub] = React.useState([]);
    const [storeData, setStoreData] = React.useState([]);
    const [localityData, setLocalityData] = React.useState([]);
    const [citiesValue, setCitiesValue] = useState();
    const [warehouseValue, setWarehouseValue] = useState();
    const [hubValue, setHubValue] = useState();
    const [storeValue, setStoreValue] = useState();
    const [isLoadingWarehouse, setIsLoadingWarehouse] = React.useState([]);
    const [isLoadingStore, setIsLoadingStore] = React.useState([]);
    const [editformData, setEditformData] = React.useState({
        id: '',
        name: '',
        description: '',
    })

    const [addformData, setAddformData] = React.useState({
        name: '',
        description: '',
    })

    React.useEffect(() => {
        addLocality = location.state;
        if ((location.state != null || location.state != undefined) && (addLocality != null || addLocality != undefined)) {
            setOpen(true);
        }
        const sendRequest = async () => {
            const response_city = await fetch(`${Config.baseURL}/v1/getcity`);
            const responseData_city = await response_city.json();
            setCityData(responseData_city);
            setIsLoadingCity(true);
            const response_locality = await fetch(`${Config.baseURL}/v1/getlocality`);
            const responseData_locality = await response_locality.json();
            setLocalityData(responseData_locality);
        };
        sendRequest();

    }, [location])

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

    function handleClose() {
        setDefaultFields()
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

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
            id: data.locality_id,
            name: data.locality_name,
            description: data.description,
            cityName: data.city.cityName,
            cityId: data.city.cityId,
            warehouseName: data.warehouse.warehouseName,
            warehouseId: data.warehouse.warehouseId,
            hubName: data.hub.hubName,
            hubId: data.hub.hubId,
            storeName:data.store.storeName,
            storeId: data.store.storeId
        })
        setSelectedValue(data.status.toString())
        onloadcityDetails(data);
        onloadWarehouseDetails(data);
        onloadHubDetails(data);
        onloadStoreDetails(data);
        setEditDailogOpen(true);
    }

    function onLoadEditSubmit() {
        if (editformData.name === "" || citiesValue === null || citiesValue === undefined ||
            warehouseValue === null || warehouseValue === undefined || hubValue === null ||
            hubValue === undefined || storeValue === null ||
            storeValue === undefined) {
            setEditDailogOpen(true);
            setAlertDailog(true);
        } else {
            let editedData = {
                addformData: editformData,
                status: selectedValue,
                selectedCities: citiesValue,
                selectedWarehouse: warehouseValue,
                selectedhub: hubValue,
                selectedStore: storeValue
            }
            var data = editedData.addformData;
            if(editedData.selectedCities.label == null || editedData.selectedCities.label == undefined)
            {
                data['city'] = {cityName: editformData.cityName, cityId: editformData.cityId}

            }
            else {
                data['city'] = {cityName: editedData.selectedCities.label, cityId: editedData.selectedCities.id};
            }

            if(editedData.selectedWarehouse.label == null || editedData.selectedWarehouse.label == undefined)
            {
                data['warehouse'] = {warehouseName: editformData.warehouseName, warehouseId: editformData.warehouseId}

            }
            else {
                data['warehouse'] = {warehouseName: editedData.selectedWarehouse.label, warehouseId: editedData.selectedWarehouse.id};
            }
            if(editedData.selectedhub.label == null || editedData.selectedhub.label == undefined)
            {
                data['hub'] = {hubName: editformData.hubName, hubId: editformData.hubId}

            }
            else {
                data['hub'] = {hubName: editedData.selectedhub.label, hubId: editedData.selectedhub.id};
            }
            if(editedData.selectedStore.label == null || editedData.selectedStore.label == undefined)
            {
                data['store'] = {storeName: editformData.storeName, storeId: editformData.storeId}

            }
            else {
                data['store'] = {storeName: editedData.selectedStore.label, storeId: editedData.selectedStore.id};
            }
            data['status'] = editedData.status;
            const headers = {
                "Access-Control-Allow-Origin": "*",
            }
            axios.post(`${Config.baseURL}/v1/editlocality`, data, { headers }).then((res) => {
                console.log(res);
            }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            setEditformData({
                id: '',
                name: '',
                description: ''
            })
            setDefaultFields()
        }
    };

    function alertHandleClose() {
        setAlertDailog(false);
    }

    function handleFormSubmit() {
        if (addformData.name === "" || citiesValue === null || citiesValue === undefined ||
            warehouseValue === null || warehouseValue === undefined || hubValue === null ||
            hubValue === undefined || storeValue === null ||
            storeValue === undefined) {
            setOpen(true)
            setAlertDailog(true);
        } else {
            let addedData = {
                addformData: addformData,
                status: selectedValue,
                selectedCities: citiesValue,
                selectedWarehouse: warehouseValue,
                selectedhub: hubValue,
                selectedStore: storeValue
            }
            var data = addformData;
            data['city'] = {cityName :addedData.selectedCities.label, cityId:  addedData.selectedCities.id};
            data['warehouse'] = {warehouseName :addedData.selectedWarehouse.label, warehouseId:  addedData.selectedWarehouse.id};
            data['hub'] = {hubName :addedData.selectedhub.label, hubId:  addedData.selectedhub.id};
            data['store'] = {storeName :addedData.selectedStore.label, storeId:  addedData.selectedStore.id};
            data['status'] = addedData.status;

            history.push({
                pathname: '/map',
            })

            localStorage.setItem("localityDetails", JSON.stringify(data));

            setDefaultFields()
            setAddformData({
                name: "",
                description: "",
            })
        }
    }

    async function getWarehouseByCity(cityId)
    {
        axios.get(`${Config.baseURL}/v1/getwarehousebycity`,{ params: {cityId :cityId}} ).then((response) => { 
            setWarehouseData(response.data);
            setIsLoadingWarehouse(true);
          }).catch(() => {
             console.log("Something went wrong. Plase try again later");
         });
    }

    function getHubByWarehouseCity(warehouseId,cityId)
    {
        
        axios.get(`${Config.baseURL}/v1/gethubbywarehousecity`,{ params: {warehouseId: warehouseId, cityId :cityId}}).then((response) => { 
            setHubData(response.data);
            setIsLoadingHub(true);
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
    }

    function getStoreByWarehouseCityHub(warehouseId, cityId, hubId) {
        axios.get(`${Config.baseURL}/v1/getstorebywarehousecityhub`,{ params: {warehouseId: warehouseId, cityId :cityId, hubId: hubId}}).then((response) => { 
            setStoreData(response.data);
            setIsLoadingStore(true);
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
    }


    function setDefaultFields() {
        setOpen(false);
        setEditDailogOpen(false);
        setAlertDailog(false);
        setSelectedValue('1');
        setCitiesValue(null);
        setWarehouseValue(null);
        setHubValue(null);
        setStoreValue(null);
    }

    const onloadSelectCities = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        getWarehouseByCity(value.id);
        setCitiesValue(value);
    };

    const onloadSelectWarehouse = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        if(value.id && citiesValue.id)
        {
            getHubByWarehouseCity(value.id, citiesValue.id);
        }
        setWarehouseValue(value)
    }

    const onloadSelecthub = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        if(value.id && citiesValue.id && warehouseValue.id)
        {
            getStoreByWarehouseCityHub(warehouseValue.id, citiesValue.id, value.id);
        }
        setHubValue(value);
    }

    const onloadSelectStore = (value) => {
        if (value !== null) {
            redirectToRequiredPage(value);
        }
        setStoreValue(value);
    }

    function redirectToRequiredPage(selectedData) {
        if (selectedData.id === 0) {
            if (selectedData.state === 0) {
                history.push({
                    pathname: '/locality/citylist',
                    state: {
                        name: 'addcity',
                        id: 0,
                        page: 'locality'
                    }
                })
            } else if (selectedData.state === 1) {
                history.push({
                    pathname: '/locality/warehouse',
                    state: {
                        name: 'addwarehouse',
                        id: 0,
                        page: 'locality'
                    }
                })
            } else if (selectedData.state === 2) {
                history.push({
                    pathname: '/locality/hublist',
                    state: {
                        name: 'addhub',
                        id: 0,
                        page: 'locality'
                    }
                })
            } else if (selectedData.state === 3) {
                history.push({
                    pathname: '/locality/storelist',
                    state: {
                        name: 'addlocality',
                        id: 0,
                        page: 'locality'
                    }
                })
            }
        }
    }

    function onloadcityDetails(cityDetails) {
        let data = [];
        data.push(
            {
                label: cityDetails.cityLabel,
                value: cityDetails.cityName,
                id: cityDetails.cityId,
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

    function onloadHubDetails(hubDetails) {
        let data = [];
        data.push(
            {
                label: hubDetails.hubLabel,
                value: hubDetails.hubName,
                id: hubDetails.hubId,
            }
        );

        onloadSelecthub(data);
    }

    function onloadStoreDetails(storeDetails) {
        let data = [];
        data.push(
            {
                label: storeDetails.storeLabel,
                value: storeDetails.storeName,
                id: storeDetails.storeId,
            }
        );

        onloadSelectStore(data);
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

    const addNewHubButton = [
        { value: "addhub", hub_name: "Add Hub  + ", hub_id: 0, state: 2 },
    ];

    function hubList() {
        return (isLoadingHub && addNewHubButton.concat(hubData).map(data => ({ label: data.hub_name, id: data.hub_id, state: data.state })))
    }

    const addNewStoreButton = [
        { value: "addstore", store_name: "Add Store  + ", store_id: 0, state: 3 },
    ];

    function storeList() {
        return (isLoadingStore && addNewStoreButton.concat(storeData).map(data => ({ label: data.store_name, id: data.store_id, state: data.state })))
    }


    const data = localityData;

    const columns = [
        {
            title: 'Id', field: 'locality_id',
        },
        {
            title: 'Locality Name', field: 'locality_name',
        },
        {
            title: 'Store Name', field: 'store.storeName',
        },
        {
            title: 'Hub Name', field: 'hub.hubName',
        },
        {
            title: 'Warehouse Name', field: 'warehouse.warehouseName',
        },
        {
            title: 'City Name', field: 'city.cityName',
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
            tooltip: 'Add Locality',
            isFreeAction: true,
            onClick: (event) => onLoadAddDailogOpen()
        },
        {
            icon: 'edit',
            tooltip: 'edit Locality',
            onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        },
        {
            icon: 'delete',
            tooltip: 'Delete Locality',
            onClick: (event, rowData) => handleClickDelete(rowData, event)
        },
    ]

    function handleClickDelete(event, data) {
        event.isDelete = true;
        const headers = {
            "Access-Control-Allow-Origin": "*",
        }
        axios.post(`${Config.baseURL}/v1/deletelocality`, event, { headers }).then(() => {
            console.log("sent");
        }).catch(() => {
            console.log("Something went wrong. Plase try again later");
        });
    }

    function onLoadAddDailogOpen() {
        setOpen(true);
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Locality", path: "/locality/localitylist" },
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
                        {"Add Locality"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Locality Name <sup>*</sup></label>
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
                                <label>Locality Description</label>
                                <textarea
                                    className="mb-16 w-100 form-control"
                                    rows="2"
                                    name="description"
                                    onChange={onLoadAddFormFieldChange}
                                    value={addformData.description}
                                />
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
                                <label>Select Hub <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    value={hubValue}
                                    onChange={onloadSelecthub}
                                    options={hubList()}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>Select Store <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    value={storeValue}
                                    onChange={onloadSelectStore}
                                    options={storeList()}
                                />
                            </div>
                        </div><hr></hr>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleFormSubmit} variant="contained" color="primary" autoFocus>
                                Create Polygon
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
                        {"Edit Locality"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Locality Name<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    name="name"
                                    onChange={onChangeEditFields}
                                    value={editformData.name}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label> Locality Id<sup>*</sup></label>
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
                                <label>Locality Description</label>
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
                                    defaultValue={{label : editformData.cityName, value: editformData.cityId}}
                                    onChange={onloadSelectCities}
                                    options={cities()}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>Select Warehouse <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={{label : editformData.warehouseName, value: editformData.warehouseId}}
                                    onChange={onloadSelectWarehouse}
                                    options={warehouseList()}
                                />
                            </div>

                            <div className="col-sm-12">
                                <label>Select Hub <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={{label : editformData.hubName, value: editformData.hubId}}
                                    onChange={onloadSelecthub}
                                    options={hubList()}
                                />
                            </div>
                            <div className="col-sm-12">
                                <label>Select Store <sup>*</sup></label>
                                <Select
                                    name="form-field-name"
                                    defaultValue={{label : editformData.storeName, value: editformData.storeId}}
                                    onChange={onloadSelectStore}
                                    options={storeList()}
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
            <MaterialTable title="Locality List"
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

export default LocalityList;
