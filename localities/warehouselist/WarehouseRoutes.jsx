import { MatxLoadable } from "matx";

const WarehouseList = MatxLoadable({
  loader: () => import("./WarehouseList")
});


const warehouseListRoutes = [
  {
    path: "/locality/warehouse",
    component: WarehouseList
  },
 
];

export default warehouseListRoutes;
