var express = require('express');
var pool = require('./../Database/db')
var router=express.Router();
/**
 * To get all the bookings for a customer with a customer id
 */
router.get("/:custId/all",(req, res)=>{
    res.status(200).send({
        "bookings":[
            {"bookingId":1},
            {"bookingId":2}
        ]
    })
}
)
/**
 * To get booking details with customer id and booking id inputs
 */
router.get("/:custId/:bookingId",(req,res)=>{

})
/**
 * To Make a new reservation or booking for a customer
 */
router.post("/",async(req,res)=>{
    let {custId,hotelId,totalPrice,noOfRooms,noOfGuests,reservationDate,rooms,checkIn,checkOut}=req.body;
    const conn=(await pool.getConnection());
    try{
    conn.beginTransaction();
    let result=await conn.query(`Insert into ReservationsMaster (customerId,hotelId,totalPrice,noOfRooms,noOfGuests,reservationDate)
    values(?,?,?,?,?,?);
    select LAST_INSERT_ID() as reservationId`,[custId,hotelId,totalPrice,noOfRooms,noOfGuests,reservationDate]);
    let reservationId=result[0][1][0].reservationId;
    // console.log(result[0][1][0])
    for(let i=0;i<rooms.length;i++){
        await conn.query(`insert into Reservations(reservationId,roomId,checkInDate,checkOutDate,price,breakfast,fitnessRoom,swimmingPool,parking,allMeals)
        values(?,?,?,?,?,?,?,?,?,?);`,[reservationId,rooms[i].roomId,checkIn,checkOut,rooms[i].price,rooms[i].breakfast,rooms[i].fitnessRoom,rooms[i].swimmingPool,rooms[i].parking,rooms[i].allMeals]);
    }
    res.send({reservationId})
    await conn.commit()
    }catch(err){
        console.log(err)
        res.send(err)
    }finally{
        conn.release();
    }
})
/**
 * To make changes to exisisting booking of a customer with cust id and booking id input
 */
router.put("/:custId/:bookingId",(req,res)=>{

})
/**
 * To Delete or cancel a reservation of a customer
 */
router.delete("/:custId/:bookingId",(req,res)=>{

})
module.exports=router