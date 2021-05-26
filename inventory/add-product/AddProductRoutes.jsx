import { MatxLoadable } from "matx";

const AddProduct = MatxLoadable({
  loader: () => import("./AddProduct")
});
const EditProduct = MatxLoadable({
  loader: () => import("./EditProduct")
});


const addProductsRoutes = [
  {
    path: "/products/addproduct",
    component: AddProduct
  },
  {
    path: "/products/editproduct",
    component: EditProduct
  },
 
];

export default addProductsRoutes;
