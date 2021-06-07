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
import Config from '../../config';
import axios from 'axios';
import {
    Button,
} from "@material-ui/core";
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
        width: '40%',
    },

    inactiveStyle: {
        background: '#e4ba6c',
        padding: '6px',
        width: '40%',
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
let addwarehouse = {}

const WarehouseList = () => {
    const [isCityChanged, setIsCityChanged] = React.useState(false);
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

    const [editformData, setEditformData] = React.useState({
        id: '',
        name: '',
        description: '',
    })

    const [addformData, setAddformData] = React.useState({
        name: '',
        description: '',
    })

    const [cityData, setCityData] = React.useState([]);
    const [warehouseData, setWarehouseData] = React.useState([]);
    const [isLoadingCity, setIsLoadingCity] = React.useState([]);
    const [isLoadingWarehouse, setIsLoadingWarehouse] = React.useState([]);

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
        addwarehouse = location.state;
        if ((location.state != null || location.state != undefined) && (addwarehouse != null || addwarehouse != undefined)) {
            setOpen(true);
            setAddformData({
                name: location.state.filledData.name,
                description: location.state.filledData.description,
            })
            setSelectedValue(location.state.status);
        }
        const sendRequest = async () => {
            const response_city = await fetch(`${Config.baseURL}/v1/getcity`);
            const responseData_city = await response_city.json();
            const response_warehouse= await fetch(`${Config.baseURL}/v1/getwarehouse`);
            const responseData_warehouse = await response_warehouse.json();
            setCityData(responseData_city);
            setIsLoadingCity(true);
            setWarehouseData(responseData_warehouse);
            setIsLoadingWarehouse(true);
        };
        sendRequest();
       
    }, [location])

    function handleClose() {
        backtoSamePage();
        setOpen(false);
        setEditDailogOpen(false);
        setAlertDailog(false);
        setSelectedValue(null);
        setCitiesValue(null)
    }

    function backtoSamePage() {
        if ((location.state != null || location.state != undefined) && (addwarehouse != null || addwarehouse != undefined)) {
            if (location.state.page === 'hub') {
                history.push('/locality/hublist');
            } else if (location.state.page === 'store') {
                history.push('/locality/storelist');
            } else if(location.state.page === 'locality'){
                history.push('/locality/localitylist');
            }
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

    function handleClickEditDailogOpen(data) {
        setEditformData({
            id: data.warehouse_id,
            name: data.warehouse_name,
            description: data.description,
            status: data.status,
            cityName: data.city.cityName,
            cityId: data.city.cityId
        })
        setSelectedValue(data.status.toString())
        onloadcityDetails(data);
        setEditDailogOpen(true);
    }


    function onLoadEditSubmit() {
        if (editformData.name === "" || citiesValue === null || citiesValue === undefined || selectedValue === undefined) {
            setEditDailogOpen(true);
            setAlertDailog(true);
        } else {
            let editedData = {
                addformData: editformData,
                status: selectedValue,
                selectedCities: citiesValue
            }
            const data = editedData.addformData;
            if(isCityChanged)
            {
                data['city'] = {cityName: editedData.selectedCities.label, cityId: editedData.selectedCities.id};
            }
            else {
                data['city'] = {cityName: editformData.cityName, cityId: editformData.cityId}
            }
            data['status'] = editedData.status;
            const headers = {
                "Access-Control-Allow-Origin": "*",
              } 
             axios.post(`${Config.baseURL}/v1/editwarehouse`, data ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
           setIsCityChanged(false);
            setEditformData({
                id: '',
                name: '',
                description: ''
            })
            setCitiesValue(null)
            setSelectedValue('1')
            setEditDailogOpen(false);
            setAlertDailog(false);
            backtoSamePage();
        }
    };

    function alertHandleClose() {
        setAlertDailog(false);
    }

    function handleFormSubmit() {
        if (addformData.name === "" || citiesValue === null || citiesValue === undefined || selectedValue === undefined) {
            setOpen(true)
            setAlertDailog(true);
        } else {
            setOpen(false)

            let addedData = {
                addformData: addformData,
                status: selectedValue,
                selectedCities: citiesValue
            }
            var data = addformData;
            data['city'] = {cityName :addedData.selectedCities.label, cityId:  addedData.selectedCities.id};
            data['status'] = addedData.status;
            const headers = {
                "Access-Control-Allow-Origin": "*",
              } 
             axios.post(`${Config.baseURL}/v1/addwarehouse`, {data} ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
            setCitiesValue(null)
            setSelectedValue('1')
            setAddformData({
                name: "",
                description: "",
            })
            backtoSamePage();
        }
    }

    const onloadSelectCities = (value) => {
        if (value !== null || value !== undefined) {
            
            if (value.id === 0 && value.state === 0) {
                history.push({
                    pathname: '/locality/citylist',
                    state: {
                        name: 'addcity',
                        id: 0,
                        page: 'warehouse',
                        filledData: addformData, 
                        status: selectedValue
                    }
                })
            }
        }
        if(value.label !== undefined){
            setIsCityChanged(true);  
        }
        else {
            setIsCityChanged(false);
        }
        setCitiesValue(value);
    };

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
    const addNewCityButton = [
        { value: "addcity", city_name: "Add City  + ", city_id: 0, state: 0 }
    ];

    function cities() {
        return (isLoadingCity && addNewCityButton.concat(cityData).map(data => ({ label: data.city_name, id: data.city_id, state: data.state })))
    }
    const data = warehouseData;

    const columns = [
        {
            title: 'Id', field: 'warehouse_id',
        },
        {
            title: 'Warehouse Name', field: 'warehouse_name',
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
            tooltip: 'Add Warehouse',
            isFreeAction: true,
            onClick: (event) => onLoadAddDailogOpen()
        },
        {
            icon: 'edit',
            tooltip: 'edit Warehouse',
            onClick: (event, rowData) => handleClickEditDailogOpen(rowData, event)
        },
        {
            icon: 'delete',
            tooltip: 'Delete Warehouse',
            onClick: (event, rowData) => handleClickDelete(rowData, event)
        },
    ]

    function onLoadAddDailogOpen() {
        setOpen(true);
    }

    function handleClickDelete(event,data)
    {
        event.isDelete = true;
        const formdata = {editformData};
        const headers = {
            "Access-Control-Allow-Origin": "*",
        }
        axios.post(`${Config.baseURL}/v1/deletewarehouse`, event ,{headers}).then(() => {
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
                        { name: "Warehouse", path: "/locality/warehouse" },
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
                        {"Add Warehouse"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Warehouse Name <sup>*</sup></label>
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
                                <label>Warehouse Description</label>
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
                        {"Edit Warehouse"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-sm-8">
                                <label> Warehouse Name<sup>*</sup></label>
                                <input
                                    className="mb-16 w-100 form-control"
                                    type="text"
                                    name="name"
                                    onChange={onChangeEditFields}
                                    value={editformData.name}
                                />
                            </div>

                            <div className="col-sm-4">
                                <label> Warehouse Id<sup>*</sup></label>
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
                                <label>Warehouse Description</label>
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
            <MaterialTable title="Warehouse List"
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

export default WarehouseList;
