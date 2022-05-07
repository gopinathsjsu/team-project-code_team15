var express = require('express');
var router = express.Router();
var pool = require('./../Database/db')
router.post("/getPricing",async(req,res)=>{
    let {custId,hotelId,roomId,checkIn,checkOut,breakfast,fitnessRoom,swimmingPool,parking,allMeals}=req.body;
    let finalPrice=[];
    
    // for(let i=0;i<roomIds.length;i++){
        let getBasePriceQuery= `select basePrice from Rooms where roomID=? and hotelId=? `;
        let result=await pool.query(getBasePriceQuery,[roomId,hotelId]);
        let basePrice=await result[0][0]?.basePrice
        console.log(basePrice)
        checkIn=new Date(checkIn);
        checkOut=new Date(checkOut);
        const diffDays = Math.ceil((checkOut-checkIn) / (1000 * 60 * 60 * 24)); 
        basePrice=basePrice * (diffDays)
        let price=basePrice;
        price+=getPricingBasedOnCheckInDates(basePrice,checkIn,checkOut);
        // price+=getPricingBasedOnHolidaySeason(basePrice,checkIn,checkOut);
        // price+=getPricingBasedOnCustomerLoyalty(basePrice,custId);
        finalPrice.push({roomId:roomId,price:price})
    // }
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
        increment=basePrice*0.15;
    }
    return increment
}
function getPricingBasedOnHolidaySeason(basePrice,checkIn,checkOut){
    let increment=0;

}
module.exports=router
