import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
export default class LandingPage extends Component {
  render() {
    return (
      <div>
          <NavBar myBookingDisplay = {false}></NavBar>
          <div className='container-fluid' >

               <center style={{"marginTop":"200px"}}>
                <h3>Welcome To Avalon.com</h3>
                 <Link to = {{pathname:"/Login"}} style={{"cursor":"pointer",textDecoration:"none","marginRight":"10px"}} >Login</Link>
                 <Link to={{pathname:"/Register"}} style={{"cursor":"pointer",textDecoration:"none"}}>Register</Link>
                 </center>
          </div>

      </div>
    )
  }
}
