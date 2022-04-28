import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams, Navigate, Routes
} from "react-router-dom";
import HotelLogin from './Components/HotelLogin'
import HomePage from './Components/HomePage'


function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} >

          </Route>
          <Route exact path="/Login" element={<HotelLogin></HotelLogin>}>
          </Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
