import React, { Component } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default class BookingsList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         expanded:false
      }
    }
    handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded:(isExpanded ? panel : false)});
      };
  render() {
    return (
      <div>
          <Accordion expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}
          elevation={4} style={{width:"60%"}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Booking ID
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography> */}
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Cancel</Button>
            <Button>Edit</Button>
            
        </ButtonGroup>
        </AccordionDetails>
      </Accordion>
      </div>
    )
  }
}
