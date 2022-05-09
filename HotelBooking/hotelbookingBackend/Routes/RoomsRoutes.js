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
module.exports=router