import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from '@mui/material'
import axios from 'axios'
import {SERVER_URL} from './../../config'
export default class HotelForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    intialValues={
     hotelName:"",
     city:""
   }
   sendFormDetails(values){
     console.log(values)
     //make api call to save and then close
     let url=`${SERVER_URL}/hotels`
     axios.post(url,values).then((res)=>{
       alert("Hotel added succesfully")
       this.props.close(true);
     })
   }
  //  async componentDidMount(){
  //    let url=`http://localhost:3001/hotels/all`;
  //    let hotels=await axios.get(url);
  //    this.setState({hotelList:hotels.data});
  //  }
  render() {
    return (
      <div>
          <Formik
          initialValues={this.intialValues}
          onSubmit={(values)=>this.sendFormDetails(values) }
          
          >
              <Form>
              <label className='form-label'>Hotel Name</label>
               <Field type="text" className='form-control'min="1" name="hotelName"></Field>      

               <label className='form-label'>City</label>
               <Field type="text" className='form-control'min="1" name="city"></Field>             

                  
                  <hr></hr>
                  <button autoFocus onClick={this.props.close} type="button" className="btn btn-primary">
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
