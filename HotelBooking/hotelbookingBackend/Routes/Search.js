var express = require('express');
const { processSearch, checkIfDatesAreValid } = require('../Validations/searchValidations');
var router=express.Router();
router.post("/",(req,res)=>{
    let valid1=new checkIfDatesAreValid();
    let valid2=new processSearch()
    valid1.setNextObj(valid2);
    console.log("body"+JSON.stringify(req.body))
    valid1.validate(req,res);
})
module.exports=router