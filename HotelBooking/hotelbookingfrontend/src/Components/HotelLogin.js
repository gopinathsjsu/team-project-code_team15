import axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../NavBar'
import { SERVER_URL } from '../config';
export default class HotelLogin extends Component {

  standardStyle = { margin: "0px", padding: "0px" }
  
  constructor(props) {
    super(props)
  
    this.state = {
      Email:"",
      password:"",
      RedirectToHome:false,
      custID:""
    }
  }

  onChangeEmail = (e)=>{
    console.log(e.target.value)
     this.setState({
       Email:e.target.value
     })
  }
  onChangePassword = (e)=>{
    console.log(e.target.value)
    this.setState({
      password:e.target.value
    })
  }

  componentDidMount(){

  }

  onSubmit = ()=>{
    console.log("heyy")
    axios.post(`${SERVER_URL}/users/customer/login`,{
      email:this.state.Email,
      pass:this.state.password
    }).then(res=>{
      console.log(res)
      if(res.data.isAuthenticated == true){


        window.sessionStorage.setItem("c_id",res.data.custId)
        sessionStorage.setItem("c_name",res.data.fname)
        this.setState({
          custID:res.data.custId
        })
        this.setState({
          RedirectToHome:true,
        })

        // alert("Invalid details")
      }
       
    }).catch(err=>{
      alert("Invalid credentials")
      console.log(err)
    })
  }

  render() {
    console.log(this.props.location)
    console.log(this.state)
    return (
      <div>
        <NavBar myBookingDisplay = {false}></NavBar>
        {/* <div className='img'> */}
        <div className='container-fluid' style={this.standardStyle}>
          <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
              <form className="border border-light p-5" style={{ "marginTop": "80px" }}>

                <p className="h4 mb-4 ">Sign in</p>

                <input type="email" name="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" onChange={(e)=>{this.onChangeEmail(e)}} />

                <input type="password" name = "password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" onChange={(e)=>{this.onChangePassword(e)}} />

                <div className="d-flex justify-content-between">
        
                </div>

                <button className="btn btn-info btn-block my-4" type="button" onClick={()=>{this.onSubmit()}} >Sign in</button>

                <div className="text-center">
                  <p>Not a member?
                    <a href="/Register">Register</a>
                  </p>


                </div>
              </form>
            </div>
            <div className='col-md-2'></div>
          </div>
        </div>
        {/* </div> */}
        {/* <h5>        
          HotelLogin
        </h5>     */}
        {this.state.RedirectToHome == true?<Redirect to={{pathname:"/Home", state : {c_id:this.state.custID}}}></Redirect>:""}
      </div>
    )
  }
}
