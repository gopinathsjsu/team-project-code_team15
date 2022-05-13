import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

export default function HotelNavbar() {


   
  const logout = ()=>{
         
    sessionStorage.clear()
    
 
  }


  return (
    <Box sx={{ flexGrow: 1 }} style={{"height":"48px"}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Avalon Hotels
          </Typography>
          <Typography variant="p" component="div" >
            ADMIN
          </Typography>
          <Link style={{"cursor":"pointer",textDecoration:"none","color":"white"}} to={{pathname:"/"}} onClick = {()=>{logout()}} >Logout</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
