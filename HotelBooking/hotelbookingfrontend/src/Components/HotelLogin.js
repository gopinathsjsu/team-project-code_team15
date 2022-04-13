import React, { Component } from 'react'
import NavBar from '../NavBar'

export default class HotelLogin extends Component {

  standardStyle = { margin: "0px", padding: "0px" }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className='container-fluid' style={this.standardStyle}>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
            <form class="border border-light p-5" style={{"marginTop":"80px"}}>

<p class="h4 mb-4 ">Sign in</p>

<input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail"/>

<input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"/>

<div class="d-flex justify-content-between">
    <div>
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember"/>
            <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
        </div>
    </div>
    <div>
        <a href="">Forgot password?</a>
    </div>
</div>

<button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

<div class="text-center">
    <p>Not a member?
        <a href="">Register</a>
    </p>


</div>
</form>
            </div>
            <div className='col-md-2'></div>
          </div>
        </div>
        {/* <h5>        
          HotelLogin
        </h5>     */}
      </div>
    )
  }
}
