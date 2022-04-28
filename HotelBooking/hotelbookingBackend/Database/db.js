const mysql = require("mysql2")

const conn = mysql.createConnection(
    {host:"Booking202.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
     database:"Booking",
     password:"April2020",
     port:3306

}
)

conn.connect((err)=>{
    if (err)
    {
        return console.log(err)
    }
    console.log("Connected")
 
})

module.exports = conn.promise()