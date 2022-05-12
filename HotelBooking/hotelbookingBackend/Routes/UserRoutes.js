var express = require('express');
var pool = require('./../Database/db');
var router=express.Router();
const bcrypt = require('bcryptjs');
/**
 * Define the no of salt rounds for hashing
 */
 const saltRounds = 5;

router.post('/customer/registration',async (req,res)=>{
    let {fname,lname,email,password,phoneNumber}=req.body;
    try{
        let addNewCustomer=`insert into Customer (customerFname,customerLname,email,password,phoneNumber) values(?,?,?,?,?);`
        let hashPass = await bcrypt.hash(password, saltRounds);
        console.log(hashPass);
        let result=await pool.query(addNewCustomer+`select LAST_INSERT_ID() as id;`,[fname,lname,email,hashPass,phoneNumber]);
        result=Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result[0][1][0].id)
        res.status(200).send({
            msg:"Customer created",
            id:result[0][1][0].id});
    }catch(err){
        console.log(err);
        res.status(500).send({msg:`User already exists with given email ${email}`});
    }
    
})

router.post('/customer/login',async(req,res)=>{
    let {email,pass}=req.body;
    let isAuthenticated=false;
    try{
        let getLogin=`select email,customerId,password from Customer where email=?`
        let result=await pool.query(getLogin,[email]);
        let hashpass=result[0][0]?.password
        let custId=result[0][0]?.customerId
        if(hashpass){
            isAuthenticated=await bcrypt.compare(pass,hashpass);
            isAuthenticated?res.status(200) : res.status(403);
            res.send({ isAuthenticated ,custId})
        }else{
            res.status(403).json({ isAuthenticated })
        }
    }catch(err){
        res.status(500).send(err);
    }
})

router.post("/admin/registration", async(req,res)=>{
    let {fname,lname,email,password,phoneNumber}=req.body;
    try{
        let addNewAdmin=`insert into Admin (fname,lname,email,password) values(?,?,?,?);`
        let hashPass = await bcrypt.hash(password, saltRounds);
        console.log(hashPass);
        let result=await pool.query(addNewAdmin+`select LAST_INSERT_ID() as id;`,[fname,lname,email,hashPass]);
        result=Object.values(JSON.parse(JSON.stringify(result)));
        console.log(result[0][1][0].id)
        res.status(200).send({
            msg:"Admin created",
            id:result[0][1][0].id});
    }catch(err){
        console.log(err);
        res.status(500).send({msg:`Admin already exists with given email ${email}`});
    }
})

router.post('/admin/login',async(req,res)=>{
    let {email,pass}=req.body;
    let isAuthenticated=false;
    try{
        let getLogin=`select email,adminId,password from Admin where email=?`
        let result=await pool.query(getLogin,[email]);
        let hashpass=await result[0][0]?.password
        console.log(pass)
        let adminId=result[0][0]?.adminId
        if(hashpass){
            console.log("inside")
            isAuthenticated=await bcrypt.compare(pass,hashpass);
            isAuthenticated?res.status(200) : res.status(403);
            res.send({ isAuthenticated ,adminId})
        }else{
            res.status(403).json({ isAuthenticated })
        }
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;