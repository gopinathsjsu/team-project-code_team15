import React, { Component } from 'react'
import NavBar from '../NavBar'
import { testdata } from './testData'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HotelCards from './HotelCards';
import HotelDialog from './HotelDialog';
import axios from 'axios'


export default class HomePage extends Component {

   
  constructor(props) {
    super(props)
  
    this.state = {
       numberOfRooms:2
    }
  }




  loadHotels = ()=>{
     
       let hotelList =testdata.groupedHotel 
       console.log(hotelList)
      return hotelList.map((item,key)=>{
         return <li style={{"marginBottom":"20px"}}><HotelCards item = {item[0]} key = {key} rooms = {item}></HotelCards></li>
      })

  }



  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className='container-fluid' style={{"margin":"0px","padding":"0px"}}>
          <div className='row d-flex justify-content-center' style={{"marginTop":"50px","marginLeft":"0px","marginRight":"0px"}}>
            <div className='col-md-1'>

            </div>
            <div className='col-md-10 d-flex justify-content-center'> 
              <center>
              <div class="input-group">
              
                <div class="form-outline">
                  <input type="search" placeholder='Location' id="form1" class="form-control" style={{"width":"300px"}}/>
                  <label class="form-label" for="form1">Search</label>
                </div>
                <div>
                <input type="date" id='C1' name='C1' style={{"height":'39px','width':'120px' ,'marginLeft':"10px","display":"block"}}></input>
                <label class="form-label" for="C1">Check In</label>
                </div>
                <div>
                <input type="date" style={{"height":'39px','marginLeft':"10px" , "display":"block"}}></input>
                <label class="form-label" for="C1">Check Out</label>
                </div>
                <div>
                  <select name='Room_Type' style={{"height":'39px','width':'120px' ,'marginLeft':"10px","display":"block"}}>
                   <option value="Single">
                     Single
                   </option>
                   <option value="double">
                   double
                  </option>
                   <option value="suite">
                   suite
                   </option>
                  </select>
                  <label class="form-label" for="Room_Type">Room Type</label>
                </div>
                <div>
                 <input type="number" name='Quantity' style={{"height":'39px','width':'100px' ,'marginLeft':"10px","display":"block"}}></input>
                 <label class="form-label" for="Room_Type">Number of Guests</label>
                </div>
                <div>
                 <input type="number" name='Rooms' style={{"height":'39px','width':'100px' ,'marginLeft':"13px","display":"block"}}></input>
                 <label class="form-label" for="Room_Type" style={{"marginLeft":"5px"}}>Number of Rooms</label>
                </div>
                <button type="button" class="btn btn-primary" style={{"height":'39px',"marginLeft":"10px","width":"100px"}}>
                  Search
                  {/* <i class="fas fa-search"></i> */}
                </button>
              </div>
              </center>

            </div>
            <div className='col-md-1'>

            </div>

          </div>
          <div className='row d-flex justify-content-center'style={{"margin":"0px","padding":"0px"}} >
            <div className='col-md-2'>

            </div>
            <div className='col-md-8 d-flex justify-content-center'>
            <ul style={{"list-style":"none"}}>
            {this.loadHotels()}
            </ul>
            </div>
            <div className='col-md-2'>

            </div>

          </div>
        </div>
        {/* <h5>HomePage</h5> */}


      </div>
    )
  }
}
