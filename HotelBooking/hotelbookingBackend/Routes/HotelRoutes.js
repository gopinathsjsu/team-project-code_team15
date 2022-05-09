var express=require('express')
var pool = require('./../Database/db');
var router=express.Router();


router.get("/all",async(req,res)=>{
    let query=`select * from Hotels `
    let result=await pool.query(query);
    res.send(result[0]);
})
module.exports=router