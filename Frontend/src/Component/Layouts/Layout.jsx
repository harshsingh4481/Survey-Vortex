import React from 'react'
import Header from './Header/Header'
import {Outlet} from "react-router"
import Footer from './Footer/Footer'

function Layout() {
  return (
    <>
    <Header/>
      <div>
      <Outlet/>
      </div>
   
    <Footer/>
    </>
  )
}

export default Layout 