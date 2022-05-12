import React,{Component} from 'react'
import NavBar from '../NavBar'
import { Link, Redirect } from 'react-router-dom';
import { SERVER_URL } from '../config';
import axios from 'axios'
export default class adminLogin extends Component {



    constructor(props) {
      super(props)
    
      this.state = {
          Email:"",
          password:""
         
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
    
      onSubmit = ()=>{
        console.log("heyy")
        axios.post(`${SERVER_URL}/users/admin/login`,{
          email:this.state.Email,
          pass:this.state.password
        }).then(res=>{
          console.log(res)
          if(res.data.isAuthenticated == true){
            sessionStorage.setItem("adminId",res.data.adminId)
            sessionStorage.setItem("isAuthenticated",res.data.isAuthenticated)
            this.setState({
                RedirectToAdminHome:true,
            })
          }
           
        }).catch(err=>{
          alert("Invalid credentials")
          console.log(err)
        })
      }
       


    render(){
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
            {this.state.RedirectToAdminHome == true?<Redirect to={{pathname:"/landing"}}></Redirect>:""}
          </div>
          )

    }

}
