import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb } from "matx";
import MaterialTable from 'material-table';

class ProdcutCategory extends Component {

  data = [
    {
      name: 'Abc',
      image: 'abc.png',
      id: 123,
      priority: 10,
      description: 'abc'
    },
    {
      name: 'Pqr',
      image: 'pqr.png',
      id: 456,
      priority: 15,
      description: 'Pqr'
    },
    {
      name: 'Xyz',
      image: 'xyz.png',
      id: 789,
      priority: 20,
      description: 'Xyz'
    }
  ]

  columns = [
    {
      title: 'Id', field: 'id',
    },
    {
      title: 'Name', field: 'name',
    },
    {
      title: 'Image', field: 'image',
    },
    {
      title: 'Description', field: 'description',
    },
  ]

  actions = [
    {
      icon: 'add',
      tooltip: 'Add Subcategory',
      isFreeAction: true,
      onClick: (event) => alert("You want to add a new row")
    },
    {
      icon: 'edit',
      tooltip: 'edit User',
      onClick: (event, rowData) => alert("You saved " + rowData.name)
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (event, rowData) => alert("You saved " + rowData.name)
    },
  
  ]

  render() {
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Subcategory", path: "/produscts" },
              { name: "Inventory" }
            ]}
          />
        </div><hr></hr>
        <MaterialTable title="Sub Category List"
          data={this.data}
          columns={this.columns}
          actions={this.actions}
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
    );
  }
}

export default ProdcutCategory;
