import React, { Component } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BookingDialog from './BookingDialog'
export default class BookingsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      openEdit:false
    }
  }
  componentDidMount(props){

  }
  handleChange = (panel) => (event, isExpanded) => {
    this.setState({ expanded: (isExpanded ? panel : false) });
  };

  openEditDialog = ()=>{
    this.setState({
      openEdit:true
    })
  }
  closeEditDialog = ()=>{
    console.log("heyy")
    this.setState({
      openEdit:false
    })
  }

  render() {
    return (
      <div>
        <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}
          elevation={4} style={{ "marginTop": "10px" }} >
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '20%', flexShrink: 0 }}>
              Booking ID {this.props.item.reservationId}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }} style={{"marginLeft":"120px"}} onClick = {()=>{this.openEditDialog()}}>{this.props.item.hotelName}</Typography>
          </AccordionSummary>
          {/* <AccordionDetails>
            <div className='row'>
              <div className='col-md-4'>
              Check In 05/11/2022
              </div>
              <div className='col-md-4'>
              Check Out 05/17/2022
              </div>
            </div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button>Cancel</Button>
              <Button>Edit</Button>

            </ButtonGroup>
          </AccordionDetails> */}
        </Accordion>
        {this.state.openEdit == true?<BookingDialog popen = {true} closeEdit={this.closeEditDialog} item ={this.props.item}></BookingDialog>:""}
      </div>
    )
  }
}
