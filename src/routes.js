import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Confirm from "./components/Confirm/Confirm";

const routes = [
  {
    route: "/signup",
    component: <Signup />,
    protected: false,
    key: "signup",
  },
  {
    route: "/cart",
    component: <Cart />,
    protected: true,
    key: "cart",
  },
  {
    route: "/login",
    component: <Login />,
    protected: false,
    key: "login",
  },
  {
    route: "/dashboard",
    component: <Dashboard />,
    protected: true,
    key: "dashboard",
  },
  {
    route: "/confirm",
    component: <Confirm />,
    protected: false,
    key: "confirm",
  },
];

export default routes;
