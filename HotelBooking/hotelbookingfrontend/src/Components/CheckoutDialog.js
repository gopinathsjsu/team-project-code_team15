import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function CheckoutDialog(props) {
    const [open, setOpen] = React.useState(props.popen);
   
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

  return (
    <div>
    {/* <Button variant="outlined" onClick={handleClickOpen}>
      Slide in alert dialog
    </Button> */}
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth = {"sm"}
      fullWidth={true}
    >
      {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent>
        <DialogContentText style={{"marginTop":"30px"}} >
         <center><h4>Booking Successfull!</h4></center> 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Disagree</Button> */}
        <Link to = {{pathname:"/Bookings"}} onClick={handleClose}>Ok</Link>
      </DialogActions>
    </Dialog>
  </div>
  )

}
