// eslint-disable-next-line no-unused-vars
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import Pages from "../page/Pages";
import AdminLayout from "../admin-view/layout";
import Checkout from "../controllers/Checkout";
import OrderConfirmationPage from "../controllers/OrderConfirmationPage";
import OrderDetailsPage from "../controllers/orderDetailsPage";
import MyOrders from "../controllers/MyOrders";
import Contact from "../page/contact";
import ShopProfile from "../page/ShopProfile";
import Manage from "../dashboard/Manage";
import AllOrders from "../dashboard/AllOrders";
import AddPost from "../dashboard/AddPost";
import ManageProduct from "../dashboard/ManageProduct";
import Dashboard from "../dashboard/dashboard";
import SettingsCard from "../page/SettingsCard";
import SettingsPage from "../page/SettingsPage";
import Caleandar from "../caleandar/adminCaleandar";
import AdminTeam from "../team/AdminTeam";
import AdminContact from "../contact/AdminContact";






const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/place-order", element: <Checkout /> },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/About",
        element: <Pages />},
{
  path: "/order",
  element: <OrderConfirmationPage />,
}
,
        {
          path: "/dashboard/orders/:id",
          element: <OrderDetailsPage/>,
        },
        {
          path: "/SettingsCard",
          element: <SettingsCard/>,
        } ,
        {
          path: "/SettingsPage",
          element: <SettingsPage/>,
        },

        {
          path: "/my-orders",
          element: <MyOrders/>,
        } ,
        {
          path: "/dashboard/profile",
          element: <ShopProfile/>,
        },
           {
          path: "/Contact",
          element: <Contact/>,
        }
            ],

      },

    
{path:"/admin/add-product", element:<Dashboard mode="add" />} ,
 {path:"/admin/edit-product/:id" ,element:<Dashboard mode="edit" /> },
    {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/admin",
    element: <AdminLayout/>,
  },
  {
    path:"/dashboard/users" ,
    element: <Manage/>
  },
  {
path: "/dashboard/calendar" ,
    element: <Caleandar/>
  }, {
path: "/dashboard/Team",
    element: <AdminTeam/>
  },{
    path:"/dashboard/ManageProduct" ,
    element: <ManageProduct/>
  },
  {
    path:"/dashboard/manage-orders"  ,
    element: <AllOrders/>
  },
{
  path:"/dashboard/:id/add-new-post" ,
  element: <AddPost/>
},
{
path: "/dashboard/Contact"
 ,
  element: <AdminContact/>
},




],

);












export default router;
