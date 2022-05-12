import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import { LocalGasStation } from '@material-ui/icons';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios'





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Button />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
const singleRoom = "https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg"
const DoubleRoom = "https://cdn.traveltripper.io/site-assets/512_855_12327/media/2018-02-27-080006/large_ex-double-2.jpg"
const DeluxRoom = "https://s7d2.scene7.com/is/image/ritzcarlton/Deluxe%20King-1?$XlargeViewport100pct$"



export default function HotelDialog(props) {
    const [open, setOpen] = React.useState(props.popen);
    console.log(props)
    // const CheckBoxNone
    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(false);
    const [today, setToday] = React.useState("");
    const [checkIn,setCheckIn] = React.useState("");
    const [checkOut,setCheckOut] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleParentClose = () => {
        props.closeEdit()
    };
    const onNoneChecked = (e) => {
        console.log(e.target.value)
    };
    const onCheckBoxChange = (e) => {
        console.log(e.target)
        console.log(e.target.value)
    };
    const openEdit = () => {
        setEdit(true)
    };
    const onCheckInChange = (e)=>{
        let { month, day, year } = changeDate(e.target.value);
        setCheckIn(month + "/" + day + "/" + year)
    }
    const onCheckOutChange = (e)=>{
        let { month, day, year } = changeDate(e.target.value);
        setCheckOut(month + "/" + day + "/" + year)  
    }
    useEffect(() => {
        axios.get('http://localhost:3001/bookings/1/52').then(res => {
            console.log(res.data)
            setData(res.data)
            let today = new Date()
            today.setDate(today.getDate() + 1)
            let today2 = today.toISOString().split('T')[0]
            setToday(today2)
        })
    }, 0)

    const changeDate = (e) => {
        let date = new Date(e);
        let month = date.getMonth() + 1;
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return { month, day, year };
    }

    const bookNewDates = (e) => {
         axios.get()
    }


    return (
        <div>

            <BootstrapDialog
                onClose={handleParentClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleParentClose}>
                    <center>{props.item.hotelName}</center>
                    <center><h6>{props.item.city}</h6></center>

                </BootstrapDialogTitle>
                <DialogContent dividers style={{ "height": "400px", "width": "800px" }}>
                    <Typography gutterBottom align='center' >
                        <img src={props.item.roomType == "single" ? singleRoom : props.item.roomType == "double" ? DoubleRoom : DeluxRoom} style={{ "height": "300px", "width": "600px" }}></img>
                    </Typography>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-3'>
                                <center> Check In:{data[0]?.checkInDate}</center>
                            </div>
                            <div className='col-md-3'>
                                <center> Check Out:{data[0]?.checkOutDate}</center>
                            </div>
                            <div className='col-md-3'>
                                <center> Number Of Rooms: {data.length}</center>
                            </div>
                            <div className='col-md-3'>
                                <center> Total Price Paid: {props.item.totalPrice} $</center>
                            </div>

                        </div>
                        {edit == true ?
                            <div className='row' style={{ "marginTop": "40px" }}>
                                <div className="col-md-5"><center><label for="CheckIn">New Check In</label> <input type="date" name="CheckIn" min={today} ></input></center></div>
                                <div className="col-md-5"><center><label for="CheckOut">New Check Out</label> <input type="date" name="CheckOut" min={today} ></input></center></div>
                                <div className="col-md-2"><button className='btn btn-primary'>Book</button></div>
                            </div> : ""}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { openEdit() }}>
                        Edit
                    </Button>
                    <Button >
                        Cancel The Reservation
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}