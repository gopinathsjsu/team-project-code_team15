var express=require('express')
var pool = require('./../Database/db');
var router=express.Router();


router.get("/all",async(req,res)=>{
    let query=`select * from Hotels `
    let result=await pool.query(query);
    res.send(result[0]);
})
router.post("/",async (req,res)=>{
    let {hotelName,city}=req.body;
    let query=`insert into Hotels (hotelName,city) values(?,?);select LAST_INSERT_ID() as hotelId;`
    let result= await pool.query(query,[req.body.hotelName,req.body.city]);
    res.status(200).send({hotelId:result[0][1][0]?.hotelId})
})
module.exports=router