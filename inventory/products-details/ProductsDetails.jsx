import React from "react";
import { Breadcrumb } from "matx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@material-ui/core";

import { useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    // margin: '0px 400px 0px 0px'
    float: 'right',
    marginRight: '10px'
  },
  headerName: {
    float: 'left',
    padding: '0px 0px 0px 10px'
  },
  input: {
    display: "none"
  },
  dialogPaper: {
    // height: '400px'
  },
}));

const PrdoductDetails = () => {
  const classes = useStyles();

  const history = useHistory();
  const [isLoadingProduct, setIsLoadingProduct] = React.useState(false);
  const [productData, setProductData] = React.useState([]);
  function handleClickOpen() {
    // setAddProduct(true)
    history.push("/products/addproduct");
  }
  React.useEffect(() => {

    const sendRequest = async () => {
            const response_product= await fetch("http://localhost:5000/getproduct");
            const responseData_product = await response_product.json();
            console.log(responseData_product);
            if(JSON.stringify(responseData_product) != JSON.stringify(productData))
            {
              setProductData(responseData_product);
              setIsLoadingProduct(true);
            }
  }
  sendRequest();
});

  const productList = productData;

  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/produscts" },
            { name: "Inventory" }
          ]}
        />
      </div>
      <div>
        <Card>
          <strong className={classes.headerName}>Category List</strong>
          <Button variant="contained" className={classes.button} color="primary" onClick={handleClickOpen}>
            Add Product
                </Button>
        </Card>

        <div className="overflow-auto">
          <Table className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="px-24" colSpan={2}>
                  Product Name
                            </TableCell>

                <TableCell className="px-0" colSpan={2}>
                  Product Category
              </TableCell>
                <TableCell className="px-0" colSpan={2}>
                  Product Subcategory
              </TableCell>
                <TableCell className="px-0" colSpan={2}>
                  Priority
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                  Product Description
              </TableCell>
              <TableCell className="px-0" colSpan={2}>
                  Status
              </TableCell>
                <TableCell className="px-0" colSpan={2}>
                  Edit
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={index}>

                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                    {product.product_name}
                                </TableCell>
                  
                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                    {product.category}
                                </TableCell>
                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                    {product.sub_category}
                                </TableCell>
                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                    {product.product_priority}
                                </TableCell>
                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                    This is description
                                </TableCell>
                  <TableCell className="px-0" colSpan={2}>
                    {product.status}
                                </TableCell>
                  <TableCell className="px-0" colSpan={2}>
                    <IconButton>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>


    </Card>
  );
};

export default PrdoductDetails;
