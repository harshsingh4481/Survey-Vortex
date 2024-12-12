import React, { useContext, useEffect, useState } from "react";
import "./Admin.css";
import AdminLogin from "../../Pages/AdminLogin/AdminLogin";
import Context from "../../Component/Context/Context";
import Polls from "../AdminPages/Polls/Polls";
import { useNavigate } from "react-router-dom";
function Admin() {
  const navigate=useNavigate();
  const { adminLoggedin,setAdminLoggedin } = useContext(Context);
  const { adminData } = useContext(Context);
useEffect(()=>  {if(!adminLoggedin||!adminData){
    navigate('/adminlogin')
  }},[adminLoggedin])


  return (
    <>
      <Polls/>
    </>
  );
}

export default Admin;
