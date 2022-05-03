import { Card, CardContent, CardMedia,CardActions } from '@mui/material'
import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default class HotelRoomCards extends Component {
  render() {
    return (
      <div>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      </div>
    )
  }
}
