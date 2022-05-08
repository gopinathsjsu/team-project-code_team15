const mysql = require("mysql2")

const conn = mysql.createPool(
    {host:"Booking202.cgufr2o7hllp.us-east-2.rds.amazonaws.com",
     database:"Booking",
     user:'admin',
     password:"April2020",
     port:3306,
     connectionLimit: 10,
     multipleStatements: true
}
)

// conn.connect((err)=>{
//     if (err)
//     {
//         return console.log(err)
//     }
//     console.log("Connected")
 
// })

module.exports = conn.promise()