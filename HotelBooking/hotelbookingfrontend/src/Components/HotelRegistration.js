// import React, { Component } from 'react';
import React, { useState, setState } from 'react';
import '../App.css';
import NavBar from '../NavBar';
// import './Register.css';

function HotelRegistration() {

  // const standardStyle = { 
  //   margin: "0px", padding: "0px" 
  // };

  const [firstName, setFirstName] = "";
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }

  }

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
  }
  const standardStyle = { margin: "0px", padding: "0px" }

  return (
    <div>
      <NavBar></NavBar>
      <div className='container-fluid' style={standardStyle}>
        <div className='row' style={standardStyle}>
          <div className='col-md-2' style={standardStyle}>

          </div>
          <div className='col-md-8' style={standardStyle}>
            <form class="border border-light p-5" style={{ "marginTop": "80px" }}>

              <center><p class="h4 mb-4 ">Register</p></center>

              <input type="text" name="firstName" id="firstName" class="form-control mb-4" placeholder="First Name" />

              <input type="text" id="lastName" class="form-control mb-4" placeholder="Last Name" />
              {/* <input type="text" id="lastName" class="form-control mb-4" placeholder="Last Name" /> */}
              <input type="email" id='email' class="form-control mb-4" placeholder='Email'></input>
              <input type="password" class="form-control mb-4" placeholder='Password'></input>
              <input type="password" class="form-control mb-4" placeholder='Confirm Password'></input>
              <div class="d-flex justify-content-between">
                <div>
                  {/* <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
                    <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                  </div> */}
                </div>
                <div>
                  {/* <a href="">Forgot password?</a> */}
                </div>
              </div>
              <center>
                <button class="btn btn-info btn-block my-4" type="submit">Register</button>
              </center>


              <div class="text-center">

              </div>
            </form>
          </div>
          <div className='col-md-2' style={standardStyle}>

          </div>
        </div>
      </div>
    </div>
  )
}
export default HotelRegistration;