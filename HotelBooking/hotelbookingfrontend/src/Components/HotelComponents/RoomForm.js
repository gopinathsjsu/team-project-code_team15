import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from '@mui/material'
export default class RoomForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    intialValues={
      rType:"",
      rCapacity:1
   }
   sendFormDetails=(values)=>{
     console.log(values)
     //make api call to save and then close
     this.props.close(true);
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
                  <label className='form-label'>Room Type</label>
                  <Field as="select"  className='form-select' name="rType">
                    <option value="">--Select--</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="suite">Suite Room</option>
                  </Field>
                  <label className='form-label'>Max No of Guests per room</label>
                  <Field type="number" className='form-control'min="1" name="rCapacity"></Field>
                  <button autoFocus onClick={this.props.close} className="btn btn-primary">
                            Close
                        </button>
                        <button onClick={this.sendFormDetails} autoFocus type="submit" className="btn btn-success">
                            Add
                        </button>
              </Form>
          </Formik>
      </div>
    )
  }
}
