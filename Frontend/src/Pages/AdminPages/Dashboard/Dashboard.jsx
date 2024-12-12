import React, { useContext, useState } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Context from '../../../Component/Context/Context'
import ChangeAdminPassword from '../ChangeAdminPassword';

function Dashboard() {
  
  const {adminLoggedin,setAdminLoggedin}=useContext(Context)
  const {adminData,setAdminData}=useContext(Context)
  

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div><>
      {/* Sidebar */}
      <nav
        id="sidebarMenu"
        // className="collapse d-lg-block sidebar collapse bg-white"
        // className=""
      >
        <div className="">
          <div className="list-group list-group-flush mx-0 mt-0">
            <Link
              to="/admin"
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3" />
              <span>Admin dashboard</span>
            </Link>
            <Link
              to="/admin/candidates"
              className="list-group-item list-group-item-action py-2 ripple active"
            >
              <i className="fas fa-chart-area fa-fw me-3" />
              <span>Candidates</span>
            </Link>
            <Link
              to="/admin/voters"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <i className="fas fa-lock fa-fw me-3" />
              <span>Voters</span>
            </Link>
            <Link
              to="/admin/polls"
              className="list-group-item list-group-item-action py-2 ripple active"
            >
              <i className="fas fa-chart-area fa-fw me-3" />
              <span>Polls</span>
            </Link>
            
            <Link to='/admin'>
            <i className="fas fa-chart-area fa-fw me-3 "/>
            <span><button  onClick={()=>{setAdminLoggedin(false),setAdminData([])}} className='list-group-item list-group-item-action py-2  px-4 ripple active'>logout</button></span>
            </Link>
            
          <Link to='admin'></Link>  <i className="fas fa-chart-area fa-fw me-3 "/>
            <span> <button className='list-group-item list-group-item-action py-2 ripple' onClick={handleShowModal}>
        Change Password
      </button>
      <Link/>
      <ChangeAdminPassword adminEmail={adminData} show={showModal} handleClose={handleCloseModal} /></span>
           
            
          </div>
        </div>
      </nav>
     
    
  </>
  </div>
  )
}

export default Dashboard