import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb } from "matx";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import makeAnimated from 'react-select/animated';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class ProdcutCategory extends Component {

  rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
  ];

  render() {
    return (
      <div>
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "AddProduct", path: "/produscts" },
              { name: "Inventory" }
            ]}
          />
        </div><hr></hr>
        <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
          <AgGridReact
            rowData={this.rowData}>
            <AgGridColumn field="make"></AgGridColumn>
            <AgGridColumn field="model"></AgGridColumn>
            <AgGridColumn field="price"></AgGridColumn>
          </AgGridReact>
        </div>
     </div>
    );
  }
}

export default ProdcutCategory;
