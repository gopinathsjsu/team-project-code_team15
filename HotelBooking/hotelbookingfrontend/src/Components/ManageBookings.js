import React, { Component } from 'react'
import NavBar from '../NavBar';
import BookingsList from './BookingsList';
import axios from 'axios'
export default class ManageBookings extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         list:[]
      }
    }
    componentDidMount(){
        // let data=[1,2,3];
        // this.setState({list:data})
        console.log("jey")
        axios.get('http://localhost:3001/bookings/1/all').then((res)=>{
            // console.log(res)
            this.setState({
              list:res.data
            })
        })
    }
  standardStyle = { padding: "0px", margin: "0px" }
  render() {
    return (
      <div>
    <NavBar></NavBar>
         <div className='container-fluid' style={{...this.standardStyle,marginTop:"100px"}}>
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
