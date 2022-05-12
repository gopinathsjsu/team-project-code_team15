var express = require('express');
var pool = require('./../Database/db');
var router=express.Router();
const _=require("lodash")

router.get("/all",async(req,res)=>{
    let query=`select * from Rooms as t1 join Hotels as t2 on t1.hotelId=t2.hotelId;`
    let result=await pool.query(query);
    result=_.groupBy(result[0],"hotelId")
    res.send({hotelIds:result})
})
router.post("/",async(req,res)=>{
    let {basePrice,hotelId,rCapacity,rType,roomNo}=req.body;
    let query=`insert into Rooms(hotelId,roomNo,basePrice,roomType,roomCapacity) values(?,?,?,?,?);select LAST_INSERT_ID() as roomId`;
    let result=await pool.query(query,[hotelId,roomNo,basePrice,rType,rCapacity]);
    res.status(200).send({roomId:result[0][1][0]?.roomId})
})
module.exports=router