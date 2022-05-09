import { Card, CardContent, CardMedia,CardActions } from '@mui/material'
import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



export default class HotelRoomCards extends Component {
  render() {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={this.props.data.roomNo}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {this.props.data.roomType=="single"?"Single Room":""}
               {this.props.data.roomType=="double"?"Double Room":""}
               {this.props.data.roomType=="suite"?"Suite Room":""}
              </Typography>
              <br></br>
                {"Base Price:"} {this.props.data.basePrice}
                <br></br>
                {"Room Capacity"}{this.props.data.roomCapacity}
            </React.Fragment>
          }
        />
      </ListItem>
      
    </List>
    )
  }
}
