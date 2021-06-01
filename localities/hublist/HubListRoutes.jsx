import { MatxLoadable } from "matx";

const HubList = MatxLoadable({
  loader: () => import("./HubList")
});


const hubListRoutes = [
  {
    path: "/locality/hublist",
    component: HubList
  },
 
];

export default hubListRoutes;
