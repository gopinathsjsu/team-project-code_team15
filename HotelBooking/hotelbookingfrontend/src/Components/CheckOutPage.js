
import { Checkbox } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import NavBar from '../NavBar'
import CheckoutCard from './CheckoutCard'

export default class CheckOutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eminitiesTracker: {},
      selectedRooms: [],
      totalPrice: 0,

    }
  }
  componentDidMount(props) {
    console.log(this.props.location)
    let searchDetails = JSON.parse(window.sessionStorage.getItem("searchData"))
    console.log(searchDetails)
    let selectedRooms = this.props.location.state.rooms.slice(0, searchDetails.numberOfRooms)
    console.log(selectedRooms)
    let promises = []
    let eminitiesTracker = {}
    for (let i = 0; i < selectedRooms.length; i++) {
      promises.push(axios.post('http://localhost:3001/customer/getPricing', {
        custID: searchDetails.c_id,
        hotelId: this.props.location.state.item.hotelId,
        roomId: selectedRooms[i].roomID,
        checkIn: searchDetails.checkin,
        checkOut: searchDetails.checkout,
        breakfast: false,
        fitnessRoom: false,
        swimmingPool: false,
        parking: false,
        allMeals: false
      }).then((res) => {
        console.log(res)
        eminitiesTracker[selectedRooms[i].roomID] = { breakfast: false, fitnessRoom: false, swimmingPool: false, parking: false, allMeals: false, price: res.data.totalPrice, roomNo: selectedRooms[i].roomNo, roomType: selectedRooms[i].roomType,roomId:selectedRooms[i].roomID }
      }))
    }
    Promise.all(promises).then(() => {
      this.setState({
        eminitiesTracker: eminitiesTracker,
        selectedRooms: selectedRooms
      })
      console.log(eminitiesTracker)
    }).then(() => {
      this.calculateTotalPrice()
    })
  }

  onChangeEminities = (roomID, eminity) => {
    console.log(roomID, eminity)
    let searchDetails = JSON.parse(window.sessionStorage.getItem("searchData"))

    this.setState({
      ...this.state,
      eminitiesTracker: {
        ...this.state.eminitiesTracker,
        [roomID]: { ...this.state.eminitiesTracker[roomID], [eminity]: !this.state.eminitiesTracker[roomID][eminity] }
      }
    }, () => {
      axios.post('http://localhost:3001/customer/getPricing', {
        custID: searchDetails.c_id,
        hotelId: this.props.location.state.item.hotelId,
        roomId: roomID,
        checkIn: searchDetails.checkin,
        checkOut: searchDetails.checkout,
        ...this.state.eminitiesTracker[roomID]
      }).then(res => {
        console.log(res)
        this.setState({
          eminitiesTracker: { ...this.state.eminitiesTracker, [roomID]: { ...this.state.eminitiesTracker[roomID], price: res.data.totalPrice } }
        })
        this.calculateTotalPrice()
      })
    })




  }
  calculateTotalPrice = () => {
    let totalPrice = 0
    for (let [key, value] of Object.entries(this.state.eminitiesTracker)) {
      totalPrice += this.state.eminitiesTracker[key].price
    }
    this.setState({
      totalPrice: totalPrice
    })

  }

  DisplayFinalPriceList = () => {

    return Object.keys(this.state.eminitiesTracker).map((item, key) => {

      return <tr>
        <td style={{ "paddingRight": "50px" }}>Room No {this.state.eminitiesTracker[item].roomNo}</td>
        <td style={{ "paddingRight": "30px" }}>{this.state.eminitiesTracker[item].roomType} Room</td>
        <td>{this.state.eminitiesTracker[item].price}</td>
      </tr>

    })

  }


  standardStyle = { padding: "0px", margin: "0px" }

  generateList = () => {

    return this.state.selectedRooms.map((item, key) => {
      return <li><CheckoutCard item={item} key={key} onChangeEminities={this.onChangeEminities}></CheckoutCard></li>
    })
  }


 bookRooms = ()=>{
  let searchDetails = JSON.parse(window.sessionStorage.getItem("searchData"))
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
console.log(this.props.location.state.item.hotelId)
today = mm + '/' + dd + '/' + yyyy;
  axios.post('http://localhost:3001/bookings',{
    custId:searchDetails.c_id,
    hotelId:this.props.location.state.item.hotelId,
    basePrice:0,
    amenitiesPrice:0,
    totalPrice:this.state.totalPrice,
    rewardsUsed:0,
    noOfRooms:searchDetails.noOfRooms,
    noOfGuests:searchDetails.noOfGuests,
    reservationDate:today,
    roomType:searchDetails.roomType,
    rooms:Object.values(this.state.eminitiesTracker),
    checkIn:searchDetails.checkin,
    checkOut:searchDetails.checkout
  }).then(res=>{console.log(res)})
  .catch(err=>{console.log(err)})

 }



  render() {
    console.log(this.state)
    return (
      <div>
        <NavBar></NavBar>
        <div className='container-fluid' style={this.standardStyle}>
          <div className='row'>
            <div className='col-md-7' style={{ ...this.standardStyle, overflowY: 'scroll' }}>
              <div className='row' style={this.standardStyle} >
                <center style={{ "marginTop": "20px" }}><h5>{this.props.location.state.item.hotelName}</h5></center>
                <ul>
                  {this.generateList()}
                </ul>
              </div>
            </div>
            <div className='col-md-5' style={this.standardStyle}>
              <center>
                <table style={{ "marginTop": "100px" }}>
                  {this.DisplayFinalPriceList()}

                  <tr>
                    <td style={{ "paddingRight": "50px" }}></td>
                    <td style={{ "paddingRight": "50px" }}>Total Price</td>
                    <td>{this.state.totalPrice}</td>
                  </tr>
                </table>
                <div style={{marginTop:"30px"}}>
                <label for = 'Rewards'>Use My Rewards</label>
                <Checkbox name='Rewards'></Checkbox>
                <Button onClick = {()=>{this.bookRooms()}} style={{"width":"83px","marginLeft":"78px"}}>Book</Button>
                </div>
            
              </center>

            </div>


          </div>
        </div>
      </div>

    )
  }
}
