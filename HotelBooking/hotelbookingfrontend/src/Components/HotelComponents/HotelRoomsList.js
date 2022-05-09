import { Button } from '@mui/material'
import React, { Component } from 'react'
import HotelRoomCards from './HotelRoomCards'
import HotelForm from './HotelForm'
import { withRouter } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RoomForm from './RoomForm';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

export class HotelRoomsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAddDaialogOpen: false,
            isAddHotelDaialogOpen:false,
            hotelList:{},
        }
    }
    async componentDidMount() {
        let result=await axios.get(`http://localhost:3001/rooms/all`);
        let hotelIds=result.data?.hotelIds;
        this.setState({hotelList:hotelIds});
        
        
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
    handleAddHotel=()=>{
        this.setState({ isAddHotelDaialogOpen: true })
    }
    handleAddHotelDailogClose = (isAdded) => {
        console.log("Closing add new room")
        if(isAdded===false)
            this.setState({ isAddHotelDaialogOpen: false })
        else if(isAdded===true)
            // set state so that list is updated and re rendered
            this.setState({ isAddHotelDaialogOpen: false })
    
    }
    fixedView={
            top: "12%",
            bottom:0,
            position:"fixed",
            overflowY:"scroll",
            overflowX:"hidden"
    }
    space={
        width: "4px",
        height: "auto",
        display: "inline-block"
      }
    render() {
        const hotels=[];
        for(const hotel in this.state.hotelList){
            console.log(this.state.hotelList[hotel][0].hotelName)
            hotels.push(
                // <li key={hotel} className="list-group-item">
                    <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                         <Typography Typography sx={{ width: '33%', flexShrink: 0 }}>
                             {this.state.hotelList[hotel][0].hotelName} 
                        </Typography>
                         <Typography sx={{ color: 'text.secondary' }}>Click to expand</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                     {this.state.hotelList[hotel].map((room)=>{
                         return <HotelRoomCards data={room}></HotelRoomCards>
                     })}
                     </AccordionDetails>
                     </Accordion>
                // </li>
            )

        }
        return (
             
            <div className="container">
                HotelRoomsList
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <button className='btn-primary' onClick={this.handleAddNewRoom}>Add new Room</button>
                    <div style={this.space}></div>
                    <button className='btn-primary' onClick={this.handleAddHotel}>Add New Hotel</button>
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
                </Dialog>

                <Dialog
                    fullScreen={false}
                    open={this.state.isAddHotelDaialogOpen}
                    onClose={this.handleAddHotel}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Add New Hotel"}
                    </DialogTitle>
                    <DialogContent>
                        
                        < HotelForm isEdit="false" close={this.handleAddHotelDailogClose}></HotelForm>
                        </DialogContent>
                </Dialog>
                <div className='row mt-2'>
                    <ul className="list-group list-group-flush " style={this.fixedView}>
                        {hotels}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(HotelRoomsList)