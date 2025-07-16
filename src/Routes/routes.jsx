import {
  createBrowserRouter,
 
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Shared/Menu/Menu";
import Order from "../Pages/Home/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../layout/Dashboard/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../layout/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../layout/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../layout/Dashboard/UpdateItem/UpdateItem";
import Payment from "../layout/Dashboard/Payment/Payment";
import PaymentHistory from "../layout/Dashboard/Payment/PaymentHistory/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
            {
      path:'/',
      element: <Home></Home>
    }
    ,{
      path:'/menu',
      element:<Menu></Menu>
    },
    {
      path:'/order/:category',
      element:<Order></Order>
    },
    {
path:'/login',
element:<Login></Login>
    },
    {
      path:'/signup',
      element:<SignUp></SignUp>
    },
    {
      path:'secret',
      element:<PrivateRoute><Secret></Secret></PrivateRoute>
    }
  ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      // normal User

      {
        path:'cart',
        element:<Cart></Cart>
      },
    {
path:'payment',
element:<Payment></Payment>
    },{
path:'paymentHistory',
element:<PaymentHistory></PaymentHistory>
    },
      // admin only routes
      {path:'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: 'manageItems',
        element:<AdminRoute> <ManageItems></ManageItems> </AdminRoute>
      },
      {
path:'updateItem/:id',
element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
      },
       {
        path:'users',
element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ]
  }
]);