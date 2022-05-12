import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function CheckoutCard(props) {
  const theme = useTheme();
  console.log(props)


  const callOnChangeEminities = (e) => {
    // console.log(props.item.roomID,e.target.value)
    props.onChangeEminities(props.item.roomID, e.target.value)
  }
  const singleRoom = "https://webbox.imgix.net/images/owvecfmxulwbfvxm/c56a0c0d-8454-431a-9b3e-f420c72e82e3.jpg"
  const DoubleRoom = "https://cdn.traveltripper.io/site-assets/512_855_12327/media/2018-02-27-080006/large_ex-double-2.jpg"
  const DeluxRoom = "https://s7d2.scene7.com/is/image/ritzcarlton/Deluxe%20King-1?$XlargeViewport100pct$"


  return (
    <Card sx={{ display: 'flex', height: 290, marginTop: "20px" }}>
      <CardMedia
        component="img"
        sx={{ width: 250, height: 290 }}
        image={props.item.roomType == "single"?singleRoom:props.item.roomType =="double"?DoubleRoom:DeluxRoom}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h5>Room No {props.item.roomNo}</h5>
          <label for="options">Select additional Eminities to be added</label>
          <FormGroup name="options"  >
            <FormControlLabel onChange={(e) => { callOnChangeEminities(e) }} control={<Checkbox value="swimmingPool" />} label="Access to Swimming pool" />
            <FormControlLabel onChange={(e) => { callOnChangeEminities(e) }} control={<Checkbox value="breakfast" />} label="Daily Continental Breakfast" />
            <FormControlLabel onChange={(e) => { callOnChangeEminities(e) }} control={<Checkbox value="fitnessRoom" />} label="Access to fitness room" />
            <FormControlLabel onChange={(e) => { callOnChangeEminities(e) }} control={<Checkbox value="parking" />} label="Daily Parking" />
            <FormControlLabel onChange={(e) => { callOnChangeEminities(e) }} control={<Checkbox value="allMeals" />} label="All meals included (Breakfast, Lunch, Dinner)" />
          </FormGroup>
          {/* <Typography component="div" variant="h5">
          Live From Space
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Mac Miller
        </Typography> */}
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
          </IconButton>
          <IconButton aria-label="play/pause">
            {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
          </IconButton>
          <IconButton aria-label="next">
            {/* {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />} */}
          </IconButton>
        </Box>
      </Box>

    </Card>
  )
}
