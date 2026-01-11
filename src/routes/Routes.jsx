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
import SeeSubmissions from "../Pages/Dashboard/contestCreator/seeSubmissions";
import UserManagement from "../Pages/Dashboard/admin/UserManagement";
import ContestManagement from "../Pages/Dashboard/admin/ContestManagement";
import MyWinningContests from "../Pages/Dashboard/user/MyWinningContests";
import CreatorRouter from "./CreatorRouter";
import AdminRouter from "./AdminRouter";
import Leaderboard from "../Pages/Dashboard/user/Leaderboard";
import Statistics from "../Pages/StatisticsPage/Statistics";
import Resources from "../Pages/Resources/Resources";
import ContactUs from "../Pages/ContactUs/ContactUs";

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
          path:'statistics',
          Component:Statistics
        },
        {
          path:'resources',
          Component:Resources
        },
        {
          path:'contact-us',
          Component:ContactUs
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
        path:'my-winnings-contests',
        Component:MyWinningContests
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
        path:'leaderboard',
        Component:Leaderboard
      },
      {
        path:'add-contest',
        element:<CreatorRouter><AddContest /></CreatorRouter>
      },
      {
        path:'my-contests',
        element:<CreatorRouter><MyContests /></CreatorRouter>
      },
      {
        path:'my-contests/:id',
        element:<CreatorRouter><ContestUpdate /></CreatorRouter>
      },
      {
        path:'my-contests/submissions/:id',
        element:<CreatorRouter><SeeSubmissions /></CreatorRouter>
      },
      {
        path:'user-management',
        element:<AdminRouter><UserManagement /></AdminRouter>
      },
      {
        path:'contest-management',
        element:<AdminRouter><ContestManagement /></AdminRouter>
      }
    ]
    
    
  }
]);