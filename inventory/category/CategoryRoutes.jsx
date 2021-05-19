import { MatxLoadable } from "matx";

const ProdcutCategory = MatxLoadable({
  loader: () => import("./Category")
});


const productsCategoryRoutes = [
  {
    path: "/products/category",
    component: ProdcutCategory
  },
 
];

export default productsCategoryRoutes;
