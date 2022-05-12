
import React from 'react'
import { Button, Navbar,Container,Nav,NavDropdown ,Form,FormControl } from 'react-bootstrap'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
export default function NavBar(props) {
  const [myBookingDisplay,setmyBookingDisplay] = useState(props?.myBookingDisplay==false?props?.myBookingDisplay:true)
  
  const [redirectToHome,setRedirectToHome] = useState(false)
    
  const onClickLogout=()=>{
     sessionStorage.clear()

   }
   const onRedirect = ()=>{
     console.log("heyy",redirectToHome)
     if(sessionStorage.getItem("c_id")!=null ){
      setRedirectToHome(true)
     }
     else{
      setRedirectToHome(false)
     }
     console.log("heyy1",redirectToHome)
   
   }
   
    return (
<Navbar className='color-nav' style={{"backgroundColor":"aliceblue"}} expand="lg">
  <Container fluid>
    <Navbar.Brand onClick={()=>{onRedirect()}}>Avalon.com</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '110px' }}
        navbarScroll
      >

      </Nav>
       {myBookingDisplay==true?<><Link  to = {{pathname:"/Bookings"}}  style={{"cursor":"pointer",textDecoration:"none", "marginRight":"10px"}} >{myBookingDisplay==true?"MyBookings":""}  </Link>
       <Link to={{pathname:"/"}} style={{"cursor":"pointer",textDecoration:"none"}} onClick = {()=>{onClickLogout()}}>Logout</Link></>:""}   
      {redirectToHome ==true? <Redirect to={{pathname:"/Home" }}></Redirect>:""}
  
      
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
