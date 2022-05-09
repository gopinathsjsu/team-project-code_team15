
import axios from 'axios'
import React, { Component } from 'react'
import NavBar from '../NavBar'
import CheckoutCard from './CheckoutCard'

export default class CheckOutPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eminitiesTracker: {},
      selectedRooms: [],
      totalPrice: 0
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
        eminitiesTracker[selectedRooms[i].roomID] = { breakfast: false, fitnessRoom: false, swimmingPool: false, parking: false, allMeals: false, price: res.data[0].price ,roomNo:selectedRooms[i].roomNo,roomType:selectedRooms[i].roomType }
      }))
    }
    Promise.all(promises).then(() => {
      this.setState({
        eminitiesTracker: eminitiesTracker,
        selectedRooms: selectedRooms
      })
      console.log(eminitiesTracker)
    }).then(()=>{
      this.CalculateTotalprice()
    })
  }

  onChangeEminities = (roomID, eminity) => {
    console.log(roomID, eminity)
    this.setState({
      ...this.state,
      eminitiesTracker: {
        ...this.state.eminitiesTracker,
        [roomID]: { ...this.state.eminitiesTracker[roomID], [eminity]: !this.state.eminitiesTracker[roomID][eminity] }
      }
    })
  }

  CalculateTotalprice = () => {
    //  let total
    // for(let [key,value] of Object.entries(this.state.eminitiesTracker)){
    //   // console.log(key,value)
    // }
    

  }


  standardStyle = { padding: "0px", margin: "0px" }

  generateList = () => {

    return this.state.selectedRooms.map((item, key) => {
      return <li><CheckoutCard item={item} key={key} onChangeEminities={this.onChangeEminities}></CheckoutCard></li>
    })
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
                  {/* <tr>
                    <td style={{ "paddingRight": "50px" }}>Room No 101</td>
                    <td style={{ "paddingRight": "30px" }}>Single Room</td>
                    <td>300$</td>
                  </tr>
                  <tr>
                    <td style={{ "paddingRight": "50px" }}>Room No 102</td>
                    <td style={{ "paddingRight": "30px" }}>Single Room</td>
                    <td>400$</td>
                  </tr>
                  <tr>
                    <td style={{ "paddingRight": "50px" }}></td>
                    <td style={{ "paddingRight": "50px" }}>Total Price</td>
                    <td> 700$</td>
                  </tr> */}
                </table>
              </center>

            </div>


          </div>
        </div>
      </div>

    )
  }
}
