import React from 'react'
import './Blog.css';
import registration from '../../assets/Images/registration.png';
import login from '../../assets/Images/login.png';
import vote from '../../assets/Images/vote.png'

function Blog() {
 
  return (
    <div><div id="blog" className="container-fluid text-center bg-grey">
      <br />
      <br />
    <h2>VOTE HERE</h2>
    <br />
    <h4>HOW TO VOTE</h4>
    <br /><br /><br />
    <div className="row text-center slideanim ">
      <div className="col-sm-4">
        <div className="thumbnail">
          <a href="/signup"><img src={registration} alt="register" width={400} height={400} /></a>
          <p>
            <strong>STEP 1</strong>
          </p>
          <p ><h2>REGISTER</h2></p>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="thumbnail">
      <a href="/login">  <img src={login} alt="register" width={400} height={400} /></a>
          <p>
            <strong>STEP 2</strong>
          </p>
          <p><h2>LOGIN</h2></p>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="thumbnail">
       <a href="/login"> <img src={vote} alt="register" width={400} height={400} /></a>
          <p>
            <strong>STEP 3</strong>
          </p>
          <p><h2>VOTE</h2></p>
        </div>
      </div>
    </div>
    <br />
  </div>
  </div>
  )
}

export default Blog