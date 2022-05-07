var express = require('express');
var router = express.Router();
var pool = require('./../Database/db')
router.post("/getPricing",async(req,res)=>{
    let {custId,hotelId,roomIds,checkIn,checkOut,breakfast,fitnessRoom,swimmingPool,parking,allMeals}=req.body;
    let finalPrice=[];
    
    for(let i=0;i<roomIds.length;i++){
        let getBasePriceQuery= `select basePrice from Rooms where roomID=? `;
        let basePrice=await pool.query(getBasePriceQuery,[hotelId[i]]);
        basePrice=basePrice[0]
        console.log(basePrice.)
        let price=0;
        price+=getPricingBasedOnCheckInDates(basePrice,checkIn,checkOut);
        finalPrice.push({roomId:roomIds[1],price:price})
        // price+=getPricingBasedOnHolidaySeason(basePrice,checkIn,checkOut);
        // price+=getPricingBasedOnCustomerLoyalty(basePrice,custId);
    }
    res.send(finalPrice)
});
 function isWeekend(date1, date2) {
    var d1 = new Date(date1),
        d2 = new Date(date2), 
        isWeekend = false;

    while (d1 < d2) {
        var day = d1.getDay();
        isWeekend = (day === 6) || (day === 0); 
        if (isWeekend) { return true; } // return immediately if weekend found
        d1.setDate(d1.getDate() + 1);
    }
    return false;
}
function getPricingBasedOnCheckInDates(basePrice,checkIn,checkOut) {
    let increment=0;
    if(isWeekend(checkIn,checkOut)){
        increment=basePrice*0.30;
    }else{
        increment=basePrice*15;
    }
}
module.exports=router
