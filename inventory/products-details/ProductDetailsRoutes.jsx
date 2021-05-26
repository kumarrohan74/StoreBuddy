import { MatxLoadable } from "matx";

const ProductDetails = MatxLoadable({
  loader: () => import("./ProductsDetailsNew")
});


const productsDetailsRoutes = [
  {
    path: "/products/productsDetails",
    component: ProductDetails
  }, 
];

export default productsDetailsRoutes;
