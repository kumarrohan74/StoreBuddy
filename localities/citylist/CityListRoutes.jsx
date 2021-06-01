import { MatxLoadable } from "matx";

const CityList = MatxLoadable({
  loader: () => import("./CityList")
});


const cityListRoutes = [
  {
    path: "/locality/citylist",
    component: CityList
  },
 
];

export default cityListRoutes;
