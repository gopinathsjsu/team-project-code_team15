import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
export default class LandingPage extends Component {
  render() {
    return (
      <div>
          <NavBar></NavBar>
          <div className='container-fluid' style={{"backgroundImage":`url(../pic.jpeg)`}} >
                 <Link to = {{pathname:"/Login"}} >Login</Link>
                 <Link to={{pathname:"/Register"}}>Register</Link>
          </div>

      </div>
    )
  }
}
