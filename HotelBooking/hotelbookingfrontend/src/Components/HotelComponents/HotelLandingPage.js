import { Typography } from '@mui/material'
import React, { Component } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import HotelRoomsList from '../HotelComponents/HotelRoomsList'
export default class HotelLandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hotelName: ''
        }
    }
    componentDidMount() {

    }
    itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
        },
      ];
    render() {
        return (
            <div>
                <div className="container-fluid " >
                    <Typography variant="h4" align="center"> </Typography>
                    <Typography variant="span" display="flex" justifyContent="center"></Typography>

                    <div className="row">
                        {/* fixed-top one */}
                        
                        {/* offset-sm-6 two */}
                        <div className="col-sm-8 ">
                            <HotelRoomsList></HotelRoomsList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
