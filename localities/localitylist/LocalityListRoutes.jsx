import { MatxLoadable } from "matx";

const LocalityList = MatxLoadable({
  loader: () => import("./LocalityList")
});


const localityListRoutes = [
  {
    path: "/locality/localitylist",
    component: LocalityList
  },
 
];

export default localityListRoutes;
