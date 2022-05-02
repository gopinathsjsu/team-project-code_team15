var express = require('express');
var app = express();
const bookingsRouter=require('./Routes/BookingsRoutes')
app.get('/', function (req, res) {
  res.send('Welcome to Hotel Reservation Backend API');
});
const mysql = require("mysql2")

const conn = mysql.createConnection(
  {
    host: "Booking202.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
    database: "Booking",
    user: "admin",
    password: "April2020",
    port: 3306

  }
)

conn.connect((err) => {
  if (err) {
    return console.log(err)
  }
  console.log("Connected")

})
app.listen(3001, function () {
  console.log('Server Listening on port 3000');
});

app.use('/bookings',bookingsRouter)