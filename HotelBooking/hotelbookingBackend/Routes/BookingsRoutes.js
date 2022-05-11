var express = require('express');
var pool = require('./../Database/db');
const { addRewards, deleteRewards,updateRewards } = require('./Rewards-service');
var router=express.Router();
/**
 * To get all the bookings for a customer with a customer id
 */
router.get("/:custId/all",async (req, res)=>{
    let query=`select * from ReservationsMaster as t1 left join Hotels as t2 on t1.hotelId=t2.hotelId where customerid=?;`
    let result=await pool.query(query,[req.params.custId]);
    res.send(result[0]);
}
)
/**
 * To get booking details with customer id and booking id inputs
 */
router.get("/:custId/:bookingId",async (req,res)=>{
    let query=`select * from Reservations as t1 left join Rooms as t2 on t1.roomId=t2.roomId where reservationId =?; `
    let result=await pool.query(query,[req.params.bookingId]);
    res.send(result[0])
})
/**
 * To Make a new reservation or booking for a customer
 */
router.post("/",async(req,res)=>{
    let {custId,hotelId,basePrice,amenitiesPrice,totalPrice,noOfRooms,noOfGuests,reservationDate,rooms,checkIn,checkOut,roomType}=req.body;
    const conn=(await pool.getConnection());

    try{
    let checkInDate=new Date(checkIn);
    let checkOutDate=new Date(checkOut)
    const noOfDays=Math.ceil((checkOutDate-checkInDate) / (1000 * 60 * 60 * 24)); 
    conn.beginTransaction();
    let result=await conn.query(`Insert into ReservationsMaster (customerId,hotelId,basePrice,amenitiesPrice,totalPrice,noOfRooms,noOfGuests,reservationDate,roomType,noOfDays)
    values(?,?,?,?,?,?,?,?,?,?);
    select LAST_INSERT_ID() as reservationId`,[custId,hotelId,basePrice,amenitiesPrice,totalPrice,noOfRooms,noOfGuests,reservationDate,roomType,noOfDays]);
    let reservationId=result[0][1][0].reservationId;
    for(let i=0;i<rooms.length;i++){
        await conn.query(`insert into Reservations(reservationId,roomId,checkInDate,checkOutDate,price,breakfast,fitnessRoom,swimmingPool,parking,allMeals)
        values(?,?,?,?,?,?,?,?,?,?);`,[reservationId,rooms[i].roomId,checkIn,checkOut,rooms[i].price,rooms[i].breakfast,rooms[i].fitnessRoom,rooms[i].swimmingPool,rooms[i].parking,rooms[i].allMeals]);
    }
    // Add to rewards
    
    await addRewards(custId,roomType,noOfRooms,noOfDays,conn);
    res.send({reservationId})
    await conn.commit()
    }catch(err){
        console.log(err)
        res.send(err)
        conn.rollback()
    }finally{
        conn.release();
    }
})
/**
 * To make changes to exisisting booking of a customer with cust id and booking id input
 */
router.put("/",async (req,res)=>{
    let {custId,reservationId,newCheckIn,newCheckOut}=req.body
    let result=await pool.query(`select checkInDate,checkOutDate from Reservations where reservationId=?;`,[reservationId]);
    let {checkInDate,checkOutDate}=result[0][0]||{};
    //Storing string dates
    let newCheckInStr=newCheckIn;
    let newCheckOutStr=newCheckOut;
    let checkInStr=checkInDate;
    let checkOutStr=checkOutDate;
    //Convert strings to dates
    newCheckIn=new Date(newCheckIn);
    newCheckOut=new Date(newCheckOut);
    checkInDate=new Date(checkInDate);
    checkOutDate=new Date(checkOutDate);
    //check if dates overlap
    let isOverlap= (checkInDate<newCheckOut) && (newCheckIn<checkOutDate);
    console.log(isOverlap);
    let intervalsToCheck=[];
    if(isOverlap){
        if((newCheckIn-checkInDate)<0 ){
            intervalsToCheck.push({
                start:newCheckIn,
                end:checkInDate
            })
        }
        if((newCheckOut-checkOutDate)>0){
            intervalsToCheck.push({
                start:checkOutDate,
                end:newCheckOut
            })
        }
    }
    if(isOverlap && intervalsToCheck.length==0){
        console.log("new checkin and checout dates can be booked for the same room by updating existing rows")
        await modifyReservationAndRewards(reservationId, newCheckOut, newCheckIn, newCheckInStr, newCheckOutStr);
        res.send({msg:"updated rewards and modified dates"})
    }
    if(isOverlap && intervalsToCheck.length>0){
        let isAvailable=true
        console.log("check the availability for these intervals for this roomId and if available make reservation by updating dates")
        for(let i=0;i<intervalsToCheck.length;i++){
            isAvailable=isAvailable && await checkAvailability(i.start,i.end)
        }
        if(isAvailable){
            await modifyReservationAndRewards(reservationId, newCheckOut, newCheckIn, newCheckInStr, newCheckOutStr);
        }else{
            //not available
        }
        
    }
    if(!isOverlap){
        console.log("check the availability for the newCheckin and checkOut and make a new reservation")
        await checkAvailability(start,end);
        await modifyReservationAndRewards(reservationId, newCheckOut, newCheckIn, newCheckInStr, newCheckOutStr);
    }
    // res.send(intervalsToCheck);

})
/**
 * To Delete or cancel a reservation of a customer
 */
router.delete("/",async (req,res)=>{
    let {custId,reservationId}=req.body;
    let result=await pool.query(`select roomType,noOfRooms,noOfDays from ReservationsMaster where customerId=? and reservationId=?;`,[custId,reservationId])
    let {roomType,noOfRooms,noOfDays}=result[0][0] || {}
    // console.log(roomType,noOfDays,noOfRooms)
    let conn=await pool.getConnection();
    let msg='Could Not find the reservation to be deleted, please correct the details';
    try{
        (await conn).beginTransaction();
        let deleteMasterQuery=`delete from ReservationsMaster where customerId=? and reservationId=?;`
        let deleteReservationQuery=`delete from Reservations where reservationId=?;`
        await conn.query(deleteMasterQuery,[custId,reservationId]);
        await conn.query(deleteReservationQuery,[reservationId]);
        await deleteRewards(custId,roomType,noOfRooms,noOfDays,conn);
        console.log(roomType)
        if(roomType!=undefined){
            msg='Successfully deleted reservation and also removed rewards associated';
        }
        await conn.commit();
        res.send({msg});
    }catch(err){
        msg=err;
        res.status(500).send({msg})
        await conn.rollback();
    }finally{
        await conn.release();
    }

})
module.exports=router


async function modifyReservationAndRewards(reservationId, newCheckOut, newCheckIn, newCheckInStr, newCheckOutStr) {
    let getDetailsFromReservationsMaster = `select * from ReservationsMaster where reservationId=?`;
    let reservationMasterDetails = await pool.query(getDetailsFromReservationsMaster, [reservationId]);
    let { totalPrice, noOfDays, amenitiesPrice, basePrice, customerId, roomType, noOfRooms } = (reservationMasterDetails[0][0]);
    // reservationMasterDetails=reservationMasterDetails[0]
    let newNoOfDays = Math.ceil((newCheckOut - newCheckIn) / (1000 * 60 * 60 * 24));
    let newBasePrice = (basePrice / noOfDays) * newNoOfDays;
    let newAmenitiesPrice = (amenitiesPrice / noOfDays) * newNoOfDays;
    let newTotalPrice = (totalPrice / noOfDays) * newNoOfDays;
    let updateReservationsMaster = `update ReservationsMaster set noOfDays =?,basePrice=?,amenitiesPrice=?,totalPrice=? where reservationId=?`;
    let updatetimings = `update Reservations set checkInDate=?,checkOutDate=? where reservationid=?`;

    await pool.query(updateReservationsMaster + ';' + updatetimings, [newNoOfDays, newBasePrice, newAmenitiesPrice, newTotalPrice, reservationId, newCheckInStr, newCheckOutStr, reservationId]);
    await updateRewards(customerId, noOfDays, newNoOfDays, roomType, noOfRooms);
}
async function  checkAvailability(start,end,reservationId){

}
