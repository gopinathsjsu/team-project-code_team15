import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function HotelCards(props) {



  return (
    <Card sx={{ width:400 }}>
    <CardMedia
      component="img"
      height="140"
      image={props.item.image}
      // style = {{variant:"bottom"}}
     
  
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
        {props.item.name}
      </Typography>

    </CardContent>
    <CardActions>
      {/* <Button size="small">Share</Button> */}
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  )
}
