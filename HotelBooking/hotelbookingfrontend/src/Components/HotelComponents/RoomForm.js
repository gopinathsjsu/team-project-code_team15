import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from '@mui/material'
import axios from 'axios'
import { SERVER_URL } from '../../config'
export default class RoomForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         hotelList:[]
      }
    }
    intialValues={
      hotelId:"",
      rType:"",
      rCapacity:1,
      basePrice:0,
      roomNo:""
   }
   sendFormDetails(values){
     console.log(values)
     //make api call to save and then close
     let url=`${SERVER_URL}/rooms`
     axios.post(url,values).then((res)=>{
       alert("Room added suceesfully")
       this.props.addAndClose();
     }).catch((err)=>{
       alert("Error adding room, please try again later")
       this.props.close()
     })
     
   }
   async componentDidMount(){
     let url=`http://localhost:3001/hotels/all`;
     let hotels=await axios.get(url);
     this.setState({hotelList:hotels.data});
   }
  render() {
    return (
      <div>
          <Formik
          initialValues={this.intialValues}
          onSubmit={(values) => { this.sendFormDetails(values) }}
          validationSchema={this.validation}
          >
              <Form>
              <label className='form-label'>Hotel Name</label>
                  <Field as="select"  className='form-select' name="hotelId">
                    <option value="">--Select--</option>
                    {this.state.hotelList.map((hotel)=>{
                      return <option value={hotel.hotelId}>{hotel.hotelName}</option>
                    })}
                  </Field>

                  <label className='form-label'>Room Type</label>
                  <Field as="select"  className='form-select' name="rType">
                    <option value="">--Select--</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="suite">Suite Room</option>
                  </Field>
                  <label className='form-label'>Max No of Guests per room</label>
                  <Field type="number" className='form-control'min="1" name="rCapacity"></Field>

                  <label className='form-label'>Room No</label>
                  <Field type="text" className='form-control'min="1" name="roomNo"></Field>

                  <label className='form-label'>Base Price</label>
                  <Field type="number" className='form-control' name="basePrice"></Field>
                  <hr></hr>
                  <button autoFocus onClick={()=>this.props.close()} className="btn btn-primary" type="button">
                            Close
                        </button>
                        <button  autoFocus type="submit" className="btn btn-success">
                            Add
                        </button>
              </Form>
          </Formik>
      </div>
    )
  }
}
