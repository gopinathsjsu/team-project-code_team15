import React, { Component } from 'react'
import NavBar from '../NavBar'


export default class CustProfile extends Component {


    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {




        return (<div>
            <NavBar></NavBar>
            <div className='container-fluid' style={{ "margin": "0px", "padding": "0px" }}>
                <div className="row" style={{ "margin": "0px", "padding": "0px" }}>
                    <div className='col-md-6'>

                        <div className='container-fluid' style={{ "margin": "0px", "padding": "0px" }}>
                            <div className='row'>
                                <center>
                                    <img src='https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png' style={{ "width": "300px", height: "300px", marginLeft: "20px" }} ></img>
                                    <input type="file" style={{ "marginLeft": "20px" }}>
                                    </input>
                                </center>
                            </div>
                            <div className='row'>
                                <div class="form-group">
                                    <label for="name">Email address</label>
                                    <input type="email" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" />
                                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='container-fluid' style={{ "margin": "0px", "padding": "0px" }}>
                        </div>

                    </div>
                </div>
            </div>


        </div>)


    }

}
