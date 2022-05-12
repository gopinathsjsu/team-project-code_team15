// import React, { Component } from 'react';
import React, { useState, setState } from 'react';
import '../App.css';
import NavBar from '../NavBar';
// import './Register.css';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
function HotelRegistration() {

  // const standardStyle = { 
  //   margin: "0px", padding: "0px" 
  // };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [redirect,setRedirect] = useState(false)

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
    if(validate()){
      axios.post('http://localhost:3001/users/customer/registration', {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
        phoneNumber: 8877225511
      }).then((res) => {
         console.log(res)
         setRedirect(true)
      }).catch(err=>{
        console.log(err)
      })

    }

  }
  const validate =()=>{
    if(!firstName){
      alert("Enter Firstname")
      return false
    }
    else if(!lastName){
      alert("Enter LastName")
      return false
    }
    else if(!email){
      alert("Enter Email")
      return false
  }
  else if(!password){
    alert("Enter password")
    return false
  }
  else if(!confirmPassword){
    alert("Enter password again to confirm")
    return false
  }
  else if(password != confirmPassword){
    alert("Different values entered in password and confirm password fields")
    return false
  }
  return true
}

  const standardStyle = { margin: "0px", padding: "0px" }
  console.log(firstName, lastName, email, password, confirmPassword);
  return (
    <div>
      <NavBar myBookingDisplay = {false}></NavBar>
      <div className='container-fluid' style={standardStyle}>
        <div className='row' style={standardStyle}>
          <div className='col-md-2' style={standardStyle}>

          </div>
          <div className='col-md-8' style={standardStyle}>
            <form class="border border-light p-5" style={{ "marginTop": "80px" }}>

              <center><p class="h4 mb-4 " onClick={()=>{this.handleSubmit()}}>Register</p></center>

              <input type="text" name="firstName" id="firstName" class="form-control mb-4" placeholder="First Name" onChange={(e)=>{handleInputChange(e)}}/>

              <input type="text" id="lastName" class="form-control mb-4" placeholder="Last Name" onChange={(e)=>{handleInputChange(e)}} />
              {/* <input type="text" id="lastName" class="form-control mb-4" placeholder="Last Name" /> */}
              <input type="email" id='email' class="form-control mb-4" placeholder='Email' onChange={(e)=>{handleInputChange(e)}}></input>
              <input type="password" id='password'  class="form-control mb-4" placeholder='Password' onChange={(e)=>{handleInputChange(e)}}></input>
              <input type="password" id='confirmPassword'  class="form-control mb-4" placeholder='Confirm Password' onChange={(e)=>{handleInputChange(e)}}></input>
              <div class="d-flex justify-content-between">
    
              </div>
              <center>
                <button class="btn btn-info btn-block my-4" type="button" onClick={()=>{handleSubmit()}}>Register</button>
              </center>
              <div class="text-center">

              </div>
            </form>
          </div>
          <div className='col-md-2' style={standardStyle}>

          </div>
        </div>
      </div>
      {redirect == true?<Redirect to={{pathname:"/"}}></Redirect>:""}
    </div>
  )
}
export default HotelRegistration;