var express = require('express');
var pool = require('./../Database/db');
var router=express.Router();
router.get("/:custId",async(req,res)=>{
    let custId=req.params.custId;
    let getRewardsForCustomer="select * from Customer where customerId=?"
    let result=await pool.query(getRewardsForCustomer,[custId]);
    res.send(result[0]);
})

router.get("/useRewards/:custId",async (req,res)=>{
    try{
        let updateRewards=`update Customer set rewards=0 where customerId=?`;
        pool.query(updateRewards,[req.params.custId]);
        res.status(200).send({msg:"Used all rewards"});
}catch(err){
    res.send(500).send(err);
}
})
module.exports=router