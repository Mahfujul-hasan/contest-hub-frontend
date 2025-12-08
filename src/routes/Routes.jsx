import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import NotFound from "../components/Errors/NotFound";
import AllContests from "../Pages/AllContestsPage/AllContests/AllContests";
import Login from "../Pages/login/Login";
import Register from "../Pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    errorElement:<NotFound />,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'all-contests',
          Component:AllContests
        }

    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login,
      },
      {
        path:'register',
        Component:Register
      }
    ]
  }
]);