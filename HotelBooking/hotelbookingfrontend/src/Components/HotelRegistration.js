// import React, { Component } from 'react';
import React, {useState,setState} from 'react';
import '../App.css';
import NavBar from '../NavBar';
import './Register.css';

function HotelRegistration() { 

  // const standardStyle = { 
  //   margin: "0px", padding: "0px" 
  // };

  const [firstName, setFirstName] = "";
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

  const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        console.log(firstName,lastName,email,password,confirmPassword);
    }

   
    return (
      <><div>
        <NavBar></NavBar>
      <div className='img'>
      <div className='container'>
      
      <div className="form">
      <div class="h4 mb-4"> HotelRegistration</div>
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">First Name </label>
            <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
          </div>
          <div className="lastname">
            <label className="form__label" for="lastName">Last Name </label>
            <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
          </div>
          <div className="email">
            <label className="form__label" for="email">Email </label>
            <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
          </div>
          <div className="password">
            <label className="form__label" for="password">Password </label>
            <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">Confirm Password </label>
            <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
          </div>
          <div>
          <label className="form__label" for="confirmPassword"> Log In as </label>
          <select>
              <option value="Customer">Customer</option>
              <option value="employee">Employee</option>
          </select>
          </div>
        </div>
        <div class="btn btn-info btn-block my-4">
          <button onClick={() => handleSubmit()} type="submit" class="btn">Register</button>
        </div>
        </div>
        </div>
        </div>
      </div></>
    )
  }
  export default HotelRegistration;