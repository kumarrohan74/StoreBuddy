import { MatxLoadable } from "matx";

const StoreList = MatxLoadable({
  loader: () => import("./StoreList")
});


const storeListRoutes = [
  {
    path: "/locality/storelist",
    component: StoreList
  },
 
];

export default storeListRoutes;
