import { MatxLoadable } from "matx";

const ProdcutBrand = MatxLoadable({
  loader: () => import("./Brand")
});


const productsBrandRoutes = [
  {
    path: "/products/brand",
    component: ProdcutBrand
  },
 
];

export default productsBrandRoutes;
