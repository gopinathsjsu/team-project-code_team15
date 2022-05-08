import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HotelDialog from './HotelDialog';

export default function HotelCards(props) {


    const [open,setOpen] = React.useState(false)
   
   console.log(props)
   
   const singleRoom = "https://askqbookindiastorage.blob.core.windows.net/hotelsaandresorts-19177/dc83bb31-9a7b-4ee1-98f4-878909a5d054-preview.jpg"
   const DoubleRoom = "https://cdn.traveltripper.io/site-assets/512_855_12327/media/2018-02-27-080006/large_ex-double-2.jpg"
   const DeluxRoom = "https://s7d2.scene7.com/is/image/ritzcarlton/Deluxe%20King-1?$XlargeViewport100pct$"
   
   const onViewRoomClick =()=>{
      setOpen(true)
   }
   const onCloseRoom = ()=>{
     setOpen(false)
   }
  return (
    <Card sx={{ width:400 }}>
    <CardMedia
      component="img"
      height="140"
      image={props.item.roomType == "single"?singleRoom:props.item.roomType =="double"?DoubleRoom:DeluxRoom}
      // style = {{variant:"bottom"}}
     
  
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
       <center> {props.item.hotelName}</center>
      </Typography>

    </CardContent>
    <CardActions>
      {/* <Button size="small">Share</Button> */}
      <Button size="small" onClick={()=>onViewRoomClick()}>View Room</Button>
    </CardActions>
    {open == true?<HotelDialog popen={open} closeDialog = {onCloseRoom} item = {props.item} rooms = {props.rooms}  ></HotelDialog>:""}
  </Card>
  )
}
