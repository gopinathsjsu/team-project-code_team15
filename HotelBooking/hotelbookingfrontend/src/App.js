import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HotelLogin from './Components/HotelLogin'
import HomePage from './Components/HomePage'
import HotelRegistration from './Components/HotelRegistration'

function App() {
  return (

    <div className="App">
      <Router>
          <Switch>
          <Route exact path="/" ><HomePage></HomePage></Route>
          <Route exact path="/Login" ><HotelLogin></HotelLogin></Route>
          <Route path="/Register" element={<HotelRegistration />} ></Route>
          <Route exact path="/Bookings" ><ManageBookings></ManageBookings></Route> 
          <Route exact path="/landing" ><HotelLandingPage></HotelLandingPage></Route>
          </Switch>
      </Router>
    </div>

  );
}

export default App;
