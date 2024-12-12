import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../../Pages/UserLogin/Login";
import Home from "../../Pages/Home/Home";
import Blog from "../../Pages/Blog/Blog";
import Contact from "../../Pages/Contact/Contact";
import Services from "../../Pages/Services/Services";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import Layout from "../Layouts/Layout";
import ForgotPasswordForm from "../../Pages/UserLogin/ForgotPasswordForm";
import SignUpForm from "../../Pages/UserLogin/SignUpForm";
import VerifyOtp from "../../Pages/UserLogin/VerifyOtp";
import Admin from "../../Pages/Admin/Admin";
import Candidates from "../../Pages/AdminPages/Candidates/Candidates";
import Polls from "../../Pages/AdminPages/Polls/Polls";
import Voters from "../../Pages/AdminPages/Voters/Voters";
import AdminLogin from "../../Pages/AdminLogin/AdminLogin";
import UserProfile from "../../Pages/User/Profile";
const router = createBrowserRouter([
  {
    // parent route component
    element: <Layout />,
    // child route components
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // other pages....

      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      //......................................admin routes

      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/admin/candidates",
        element: <Candidates />,
      },
      {
        path: "/admin/voters",
        element: <Voters />,
      },

      {
        path: "/admin/polls",
        element: <Polls />,
      },

      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },

      //.................................services
      {
        path: "/services",
        element: <Services />,
      },
      //..................................................user routes
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPasswordForm />,
      },
      {
        path: "/verifyotp",
        element: <VerifyOtp />,
      },

      //............................error page
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
