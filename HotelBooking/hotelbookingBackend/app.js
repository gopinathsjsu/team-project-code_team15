var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
const bookingsRouter=require('./Routes/BookingsRoutes')
const search=require("./Routes/Search")
const customerRouter= require("./Routes/CustomerRoutes")
const roomsRouter=require("./Routes/RoomsRoutes")
const hotelsRouter=require("./Routes/HotelRoutes")
const rewardsRouter=require("./Routes/RewardsRoutes")
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send('Welcome to Hotel Reservation Backend API');
});
// const mysql = require("mysql2")

// const conn = mysql.createConnection(
//   {
//     host: "Booking202.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
//     database: "Booking",
//     user: "admin",
//     password: "April2020",
//     port: 3306

//   }
// )

// conn.connect((err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log("Connected")

// })
var port=normalizePort(process.env.PORT || '3001');
app.listen(process.env.PORT, function () {
  console.log('Server Listening on port '+port);
});
app.use("/customer",customerRouter)
app.use('/bookings',bookingsRouter)
app.use('/search',search)
app.use('/rooms',roomsRouter)
app.use('/hotels',hotelsRouter);
app.use("/rewards",rewardsRouter)

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}