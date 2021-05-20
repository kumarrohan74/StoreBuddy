import { MatxLoadable } from "matx";

const ProductDetails = MatxLoadable({
  loader: () => import("./ProductsDetails")
});


const productsDetailsRoutes = [
  {
    path: "/products/productsDetails",
    component: ProductDetails
  },
 
];

export default productsDetailsRoutes;
