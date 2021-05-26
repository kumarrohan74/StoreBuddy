import { MatxLoadable } from "matx";

const SKUAddition = MatxLoadable({
  loader: () => import("./SKUAddition")
});
const SKUEdit = MatxLoadable({
  loader: () => import("./SKUEdit")
});


const SKUAdditonRoutes = [
  {
    path: "/products/skuaddition",
    component: SKUAddition
  },
  {
    path: "/products/skuedit",
    component: SKUEdit
  },
 
];

export default SKUAdditonRoutes;
