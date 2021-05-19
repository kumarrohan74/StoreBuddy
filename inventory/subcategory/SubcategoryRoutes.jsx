import { MatxLoadable } from "matx";

const ProdcutSubcategory = MatxLoadable({
  loader: () => import("./Subcategory")
});


const productsSubcategoryRoutes = [
  {
    path: "/products/subcategory",
    component: ProdcutSubcategory
  },
 
];

export default productsSubcategoryRoutes;
