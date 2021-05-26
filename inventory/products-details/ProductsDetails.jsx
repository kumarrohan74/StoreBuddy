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

  function handleClickOpen() {
    // setAddProduct(true)
    history.push("/products/addproduct");
  }

  const [productData, setProductData] = React.useState([]);

  React.useEffect(() => {
    console.log("check");
    const sendRequest = async () => {
        const response = await fetch("http://localhost:5000/getproduct");
        const responseData = await response.json();
        if(JSON.stringify(responseData) != JSON.stringify(productData))
        {
            setProductData(responseData);
        }
       
    };
    sendRequest();
});

  const productList = productData;
  console.log(productList);
  return (
    <Card elevation={3} className="pt-20 mb-24">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Product", path: "/#" },
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

                <TableCell className="px-0" colSpan={1}>
                SKU Size
              </TableCell>
                <TableCell className="px-0" colSpan={1}>
                Category
              </TableCell>
                <TableCell className="px-0" colSpan={1}>
                Sub-Category
              </TableCell>
                <TableCell className="px-0" colSpan={1}>
                Brand
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={index}>

                  <TableCell className="px-0 capitalize" align="left" colSpan={2}>
                   {product.name}
                                </TableCell>
                  <TableCell className="px-0 capitalize" colSpan={1} align="center">
                    <div className="flex flex-middle">
                      <img
                        className="circular-image-small"
                        src={product.imgUrl}
                        alt="user"
                      />
                      <p className="m-0 ml-8">{product.name}</p>
                    </div>
                  </TableCell>

                  <TableCell className="px-0" align="left" colSpan={1}>
                    {product.available ? (
                      product.available < 20 ? (
                        <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                          {product.available} available
                        </small>
                      ) : (
                        <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                          in stock
                        </small>
                      )
                    ) : (
                      <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                        out of stock
                      </small>
                    )}
                  </TableCell>
                  <TableCell className="px-0" colSpan={1}>
                    100
                                </TableCell>
                  <TableCell className="px-0" colSpan={1}>
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
