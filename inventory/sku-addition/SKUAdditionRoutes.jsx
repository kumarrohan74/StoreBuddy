import { MatxLoadable } from "matx";

const SKUAddition = MatxLoadable({
  loader: () => import("./SKUAddition")
});


const SKUAdditonRoutes = [
  {
    path: "/products/skuaddition",
    component: SKUAddition
  },
 
];

export default SKUAdditonRoutes;
