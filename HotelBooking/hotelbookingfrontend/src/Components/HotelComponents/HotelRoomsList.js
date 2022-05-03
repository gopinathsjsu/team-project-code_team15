import { Button } from '@mui/material'
import React, { Component } from 'react'
import HotelRoomCards from './HotelRoomCards'
import { withRouter } from 'react-router-dom'
export class HotelRoomsList extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount() {

    }
    handleAddNewRoom=()=>{
        console.log("add new room")
    }
    render() {
        return (
            <div className="container">
                HotelRoomsList
                <div style={{display: "flex",flexDirection:"row-reverse"}}>
                    <button className='btn-primary' onClick={this.handleAddNewRoom}>Add new Room</button>
                </div>
                <div className='row mt-2'>
                    <div className='col-sm-6'>
                        <HotelRoomCards></HotelRoomCards>
                    </div>
                    <div className='col-sm-6'>
                        <HotelRoomCards></HotelRoomCards>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HotelRoomsList)