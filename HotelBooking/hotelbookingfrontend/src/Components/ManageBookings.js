import React, { Component } from 'react'
import NavBar from '../NavBar';
import BookingsList from './BookingsList';
import axios from 'axios'
import { ThemeProvider } from 'react-bootstrap';
export default class ManageBookings extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         list:[],
         rewards:0
      }
    }
    componentDidMount(){
        // let data=[1,2,3];
        // this.setState({list:data})
        console.log("jey")
        let c_id = sessionStorage.getItem("c_id")
        axios.get(`http://localhost:3001/bookings/${c_id}/all`).then((res)=>{
            console.log(res)
            this.setState({
              list:res.data
            })
        })
        axios.get(`http://localhost:3001/rewards/${c_id}`).then(res=>{
          this.setState({
            rewards:res.data[0].rewards
          })
        })
    }
  standardStyle = { padding: "0px", margin: "0px" }
  render() {
    return (
      <div>
    <NavBar></NavBar>
         <div><center>
           <h5 style={{"marginTop":"30px"}}>My Bookings</h5><br/>
           <h6 style={{"marginRight":"580px","marginTop":"10px"}}>Total Rewards :{this.state.rewards}</h6>
           </center>
         </div>
         <div className='container-fluid' style={{...this.standardStyle,marginTop:"30px"}}>
         {/* <center> */}
         {this.state.list.map((item,key)=>{
              return<div className='row' style={this.standardStyle}>
                <div className = 'col-md-3' style={this.standardStyle}>

                </div>
                
                <div className='col-md-6' style={this.standardStyle}>
                <center>
                <BookingsList key = {key} item = {item}></BookingsList>
                </center>
                </div>
                <div className='col-md-3' style={this.standardStyle}>

                </div>
                
           
              </div> 
              
          })}
          {/* </center>   */}
      
         </div>
      
        </div>
    )
  }
}
