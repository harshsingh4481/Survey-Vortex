import React from 'react'
import Context from './Context'
import { useState } from 'react'

function DataProvider({children}) { 
  const [pollingData,setPollingData]=useState(null);
    const [adminData,setAdminData]=useState(localStorage.getItem('admindata')) ;
  const[adminLoggedin,setAdminLoggedin]=useState(localStorage.getItem('adminlogin'))
  // const [maxCount,setMaxCount]=useState(0);


  const [useremail, setuseremail] = useState(null)
 
  const[userLoggedin,setUserLoggedin]=useState(localStorage.getItem('login'));
 
  return (
    <div>
        <Context.Provider 
        value={{adminLoggedin,pollingData,setPollingData,setAdminLoggedin,useremail,setuseremail, adminData,setAdminData,userLoggedin,setUserLoggedin}}
        >
            {children}
        </Context.Provider>
       
       
    </div>
  )
}

export default DataProvider