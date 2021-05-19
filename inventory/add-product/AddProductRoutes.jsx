import { MatxLoadable } from "matx";

const AddProduct = MatxLoadable({
  loader: () => import("./AddProduct")
});


const addProductsRoutes = [
  {
    path: "/products/addproduct",
    component: AddProduct
  },
 
];

export default addProductsRoutes;
