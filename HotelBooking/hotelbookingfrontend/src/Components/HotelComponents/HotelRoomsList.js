import { Button } from '@mui/material'
import React, { Component } from 'react'
import HotelRoomCards from './HotelRoomCards'
import { withRouter } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RoomForm from './RoomForm';

export class HotelRoomsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAddDaialogOpen: false,
            list:[]
        }
    }
    componentDidMount() {

    }
    handleAddNewRoom = () => {
        console.log("add new room")
        this.setState({ isAddDaialogOpen: true })
    }
    handleAddDailogClose = (isAdded) => {
        console.log("Closing add new room")
        if(isAdded===false)
            this.setState({ isAddDaialogOpen: false })
        else if(isAdded===true)
            // set state so that list is updated and re rendered
            this.setState({ isAddDaialogOpen: false })
    
    }
    // handleAddDailogAdd= (values) => {
    //     console.log("Adding new room with values"+values)
    //     this.setState({ isAddDaialogOpen: false })
    // }
    render() {
        return (
            <div className="container">
                HotelRoomsList
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <button className='btn-primary' onClick={this.handleAddNewRoom}>Add new Room</button>
                </div>
                <Dialog
                    fullScreen={false}
                    open={this.state.isAddDaialogOpen}
                    onClose={this.handleAddDailogClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Add New Room"}
                    </DialogTitle>
                    <DialogContent>
                        <RoomForm isEdit="false" close={this.handleAddDailogClose}></RoomForm>
                        </DialogContent>
                    {/* <DialogActions>
                        <Button autoFocus onClick={this.handleAddDailogClose}>
                            Close
                        </Button>
                        <Button onClick={this.handleAddDailogClose} autoFocus>
                            Add
                        </Button>
                    </DialogActions> */}
                </Dialog>
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