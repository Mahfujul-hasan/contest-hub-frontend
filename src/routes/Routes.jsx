import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import NotFound from "../components/Errors/NotFound";
import AllContests from "../Pages/AllContestsPage/AllContests/AllContests";
import Login from "../Pages/login/Login";
import Register from "../Pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRouter from "./PrivateRouter";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import MyParticipatedContests from "../Pages/Dashboard/user/MyParticipatedContests";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/user/MyProfile";
import UpdateProfile from "../Pages/Dashboard/user/UpdateProfile";
import AddContest from "../Pages/Dashboard/contestCreator/AddContest";
import MyContests from "../Pages/Dashboard/contestCreator/MyContests";
import ContestUpdate from "../Pages/Dashboard/contestCreator/ContestUpdate";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Payment/PaymentCancelled";

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
        },
        {
          path:'contest-details/:id',
          element:<PrivateRouter><ContestDetails></ContestDetails></PrivateRouter>
        },
        {
          path:'payment-success',
          element:<PrivateRouter><PaymentSuccess></PaymentSuccess></PrivateRouter>
        },
        {
          path:'payment-cancelled',
          element:<PrivateRouter><PaymentCancelled></PaymentCancelled></PrivateRouter>
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
  },
  {
    path:'/dashboard',
    element:<PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
    children:[
      {
        index:true,
        Component:Dashboard
      },
      {
        path:'my-participated-contests',
        Component:MyParticipatedContests
      },
      {
        path:'my-profile',
        Component: MyProfile
      },
      {
        path:'update-profile',
        Component:UpdateProfile
      },
      {
        path:'add-contest',
        Component:AddContest
      },
      {
        path:'my-contests',
        Component:MyContests
      },
      {
        path:'my-contests/:id',
        Component:ContestUpdate
      }
    ]
    
    
  }
]);