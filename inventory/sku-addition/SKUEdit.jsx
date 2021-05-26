import MaterialTable from "material-table";
import React, { useState } from "react";
import axios from 'axios';

const SKUEdit = () => {
    const { useState } = React;
    const [isLoading, setIsLoading] = React.useState(false);
    const [skuData, setSKUData] = React.useState([]);
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
       const sendRequest = async () => {
          const response = await fetch("http://localhost:5000/getsku");
          const responseData = await response.json();
          if(JSON.stringify(responseData) !=JSON.stringify(skuData))
          {
              setSKUData(responseData);
              setIsLoading(true);
          }
          console.log("response data");
          console.log(responseData);
      };
      sendRequest();
  })
    const columns = [
      { title: 'Pack Size', field: 'package_size', editable:false},
      { title: 'Product Mrp', field: 'product_mrp', initialEditValue: 'initial edit value' },
      { title: 'SKU Code', field: 'sku_code' },
      { title: 'Strike Price', field: 'strike_price'},
      { title: 'SKU Bar-code', field: 'sku_bar_code'},
      { title: 'SKU MF(qty/kg)', field: 'sku_mf'},
      { title: 'Price (qty/kg)', field: 'price_per_kg_per_litre'},
    ]
  
    const data_ = skuData;
  
    return (
      <MaterialTable
        title="Edit SKU"
        columns={columns}
        data={data_}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}

        options={{
            actionsColumnIndex: -1,
        }}
        
      />
    )
  }

  export default SKUEdit;