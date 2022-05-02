var express = require('express');
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
router.post("/:custId",(req,res)=>{

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