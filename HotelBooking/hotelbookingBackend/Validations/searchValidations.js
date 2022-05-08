var pool = require('./../Database/db')
const _ = require("lodash"); 
class searchHandler{
    setNextObj(nextObj){}
    validate(req,res){
        console.log("validate")
    }
}
class checkIfDatesAreValid extends searchHandler{
    constructor(){
        super()
        this.nextObj= new searchHandler();
    }
    setNextObj(nextObj){
        this.nextObj=nextObj;
    }
    validate(req,res){
        let checkIn=new Date(req.body.checkin);
        let checkOut=new Date(req.body.checkout)
        const diffDays = Math.ceil((checkOut-checkIn) / (1000 * 60 * 60 * 24)); 
        let isValid= (checkIn<checkOut && (diffDays<=7) && checkIn>new Date())
        console.log(diffDays)
        if(isValid){
            this.nextObj.validate(req,res);
        }
        else {
            res.status(401).send({
                message:"invalid dates"
            })
        }
    }
}

class RoomsAndGuestNoIsValid extends searchHandler{
    constructor(){
        super()
        this.nextObj= new searchHandler();
        this.isValid=true;
    }
    setNextObj(nextObj){
        this.nextObj=nextObj;
    }
    async validate(req,res){
        let {roomType,noOfRooms,noOfGuests}=req.body;
        if((roomType==='single') && (noOfGuests>noOfRooms*2)){
            this.isValid=false;
        }else if((roomType==='double') && (noOfGuests>noOfRooms*4)){
            this.isValid=false;
        }else if((roomType==='suite')&& (noOfGuests>noOfRooms*2)){
            this.isValid=false;
        }

        if(this.isValid){
            this.nextObj.validate(req,res);
        }else{
            res.status(401).send({
                message:"invalid no of guests for rooms"
            })
        }
    }
}

 class processSearch extends searchHandler{
    constructor(){
        super()
        this.nextObj= new searchHandler();
    }
    setNextObj(nextObj){

    }
    async validate(req,res){
        console.log("processing search");
        let {location,checkin,checkout,roomType,noOfRooms,noOfGuests}= req.body
        let searchForRooms=`select t1.hotelId,t1.city,t1.hotelName,t2.roomId,t2.roomNo,t2.roomCapacity,t2.basePrice, t2.roomType from Hotels as t1 left join (select roomID,hotelId,roomNo,basePrice,roomType,roomCapacity from Rooms where roomID not in 
            (select roomId from Reservations where STR_TO_DATE(?,'%m/%d/%Y') < STR_TO_DATE(checkOutDate,'%m/%d/%Y') and STR_TO_DATE(?,'%m/%d/%Y')> STR_TO_DATE(checkInDate,'%m/%d/%Y'))) as t2 on t1.hotelId= t2.hotelId where t1.city like ? and t2.roomType=? ;
            `
        let result=await pool.query(searchForRooms,[checkin,checkout,'%'+location+'%',roomType]);
        let groupedResult=_.groupBy(result[0],(n)=> n.hotelId)
        let groupedHotel=[]
        for(const key in groupedResult){
            if(groupedResult[key].length>=noOfRooms)
                groupedHotel.push(groupedResult[key])
        }
        res.status(200).send({groupedHotel})
    }
}
module.exports={processSearch,checkIfDatesAreValid,RoomsAndGuestNoIsValid}



