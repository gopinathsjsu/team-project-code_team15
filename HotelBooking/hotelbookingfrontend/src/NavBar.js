
import React from 'react'
import { Button, Navbar,Container,Nav,NavDropdown ,Form,FormControl } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
  const [myBookingDisplay,setmyBookingDisplay] = useState(true)
   
    return (
<Navbar  expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">Avalon.com</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '110px' }}
        navbarScroll
      >

      </Nav>

      <Link className='d-flex' to={{pathName:"/Bookings"}} style={{"cursor":"pointer",textDecoration:"none"}} >{myBookingDisplay==true?"MyBookings":""}  </Link>
    
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
