
import { Checkbox } from '@mui/material'
import axios from 'axios'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import NavBar from '../NavBar'
import CheckoutCard from './CheckoutCard'
import CheckoutDialog from './CheckoutDialog'
import { SERVER_URL } from '../config';
export default class CheckOutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eminitiesTracker: {},
      selectedRooms: [],
      totalPrice: 0,
      BookSuccess:false,
      rewardsAvailable:0,
      displayRewards:false,
      c_id:""
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
      promises.push(axios.post(`${SERVER_URL}/customer/getPricing`, {
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
        selectedRooms: selectedRooms,
        c_id:searchDetails.c_id
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
      axios.post(`${SERVER_URL}/customer/getPricing`, {
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
  if(this.state.displayRewards == true){
   axios.get(`${SERVER_URL}/rewards/useRewards/${this.state.c_id}`).then(res=>{
     console.log(res)
   })
  }
  axios.post(`${SERVER_URL}/bookings`,{
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
  }).then(res=>{console.log(res)
   this.setState({
     BookSuccess:true
   })
   
  })
  .catch(err=>{console.log(err)})
 }

 displayRewards = ()=>{

   axios.get(`${SERVER_URL}/rewards/${this.state.c_id}`).then((res)=>{

   if(this.state.displayRewards == true){
     this.calculateTotalPrice()
     this.setState({
      displayRewards:!this.state.displayRewards,
     })
   }else{
    if(res.data[0].rewards >10){
      this.setState({
        displayRewards:!this.state.displayRewards,
        rewardsAvailable:res.data[0].rewards,
        totalPrice:this.state.totalPrice-res.data[0].rewards>0?this.state.totalPrice-res.data[0].rewards:0
       })
     }else{
      this.setState({
        displayRewards:!this.state.displayRewards,
        rewardsAvailable:"Not Enough Rewards",
       })
     }

   }

   })


 }



  render() {
    console.log(this.state)
    return (
      <div>
        <NavBar></NavBar>
        <div className='container-fluid' style={this.standardStyle}>
          <div className='row' style={this.standardStyle}>
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
                {/* <div>
                  <h7 style={{"marginRight":"168px"}}>Total Rewards: 300</h7>
                </div> */}
                <div style={{marginTop:"30px"}}>

                <label for = 'Rewards'>Use My Rewards</label>
                <Checkbox name='Rewards' onClick={()=>{this.displayRewards()}}></Checkbox>
                <Button onClick = {()=>{this.bookRooms()}} style={{"width":"83px","marginLeft":"78px"}}>Book</Button><br/>
                
                </div>
            
              </center>
              {this.state.displayRewards == true?<h7 style={{"marginLeft":"136px"}}>Total Rewards available: {this.state.rewardsAvailable}</h7>:""}
              

            </div>


          </div>
        </div>
        {this.state.BookSuccess == true?<CheckoutDialog popen = {true}></CheckoutDialog>:""}
      </div>

    )
  }
}
