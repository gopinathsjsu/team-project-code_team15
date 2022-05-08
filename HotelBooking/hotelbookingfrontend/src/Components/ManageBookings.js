import React, { Component } from 'react'
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
  render() {
    return (
      <div>
          <h1>Manage Bookings</h1>
          {this.state.list.map(i=>{
              return <BookingsList ></BookingsList>
          })}
        </div>
    )
  }
}
