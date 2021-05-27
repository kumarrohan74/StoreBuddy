import MaterialTable from "material-table";
import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useHistory } from "react-router-dom";


let editingSKU = {};
const SKUEdit = (productid) => {
    const { useState } = React;
    const [isLoading, setIsLoading] = React.useState(false);
    const [skuData, setSKUData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const history = useHistory();
    React.useEffect(() => {
      editingSKU = location.state;
      if ((location.state != null || location.state != undefined) && (editingSKU != null || editingSKU != undefined)) {
          setOpen(true);
      }
      const query = {
        "productid" : productid.name
      };
      const sendrequest = async () => {
        const response_category = await fetch(`http://localhost:5000/getsku?${encodeURIComponent(query.productid)}`);
            const responseData_category = await response_category.json();
            console.log(responseData_category);
            setSKUData(responseData_category);
      }
      sendrequest();
      /*axios.get("http://localhost:5000/getsku",{ params: { productId: productid.name} } ).then((response) => {
            console.log(response.data);
            //getProd(response.data.product_id);
            setSKUData(response.data);
            console.log(skuData);
          }).catch(() => {
             console.log("Something went wrong. Plase try again later");
         });*/
      
  },[Location])
    const [columns, setColumns] = useState([
      { title: 'Pack Size', field: 'package_size'},
      { title: 'Product Mrp', field: 'product_mrp', initialEditValue: 'initial edit value' },
      { title: 'SKU Code', field: 'sku_code' },
      { title: 'Strike Price', field: 'strike_price'},
      { title: 'SKU Bar-code', field: 'sku_barcode'},
      { title: 'SKU MF(qty/kg)', field: 'sku_mf'},
      { title: 'Price (qty/kg)', field: 'price_per_kg_per_litre'},
    ]);
  
    const data = skuData;
    const product_id_ = skuData;
    console.log(skuData);
    console.log(product_id_);
  
    return (
      <MaterialTable
        title="Edit SKU"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
         
            new Promise((resolve, reject) => {
              console.log(product_id_[0].product_id);
              newData["product_id"] = product_id_[0].product_id;
              setTimeout(() => {
                
                console.log(newData);
               // setData([...data, newData]); 
               const headers = {
                "Access-Control-Allow-Origin": "*",
              }
              
             axios.post("http://localhost:5000/addskuinline", newData ,{headers}).then(() => {
               console.log("sent");
             }).catch(() => {
                console.log("Something went wrong. Plase try again later");
            });
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
          
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                console.log(newData);
                //dataUpdate[index] = newData;
                //console.log("rohan update");
                //console.log(dataUpdate);
                const headers = {
                  "Access-Control-Allow-Origin": "*",
                }
                 axios.post("http://localhost:5000/editsku", newData ,{headers}).then(() => {
                  console.log("sent");
                }).catch(() => {
                   console.log("Something went wrong. Plase try again later");
               });
               // setData([...dataUpdate]);
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                console.log("rohan delete");
                console.log(oldData);
                oldData["isDelete"] = true;
                const headers = {
                  "Access-Control-Allow-Origin": "*",
                }
                 axios.post("http://localhost:5000/deletesku", oldData ,{headers}).then(() => {
                  console.log("sent");
                }).catch(() => {
                   console.log("Something went wrong. Plase try again later");
               });
               // setData([...dataDelete]);
               
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