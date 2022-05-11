import React, { Component } from 'react'
import NavBar from '../NavBar';
import BookingsList from './BookingsList';

export default class ManageBookings extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         list:[]
      }
    }
    componentDidMount(){
        let data=[1,2,3];
        this.setState({list:data})
    }
  standardStyle = { padding: "0px", margin: "0px" }
  render() {
    return (
      <div>
    <NavBar></NavBar>
         <div className='container-fluid' style={{...this.standardStyle,marginTop:"100px"}}>
         {/* <center> */}
         {this.state.list.map(i=>{
              return<div className='row' style={this.standardStyle}>
                <div className = 'col-md-3' style={this.standardStyle}>

                </div>
                
                <div className='col-md-6' style={this.standardStyle}>
                <center>
                <BookingsList ></BookingsList>
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
