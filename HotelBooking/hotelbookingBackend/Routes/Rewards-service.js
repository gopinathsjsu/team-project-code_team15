var pool = require('./../Database/db')
const SINGLE=10
const DOUBLE=15
const SUITE=25
/**
 * Add rewards to be used when making new reservation
 */
async function addRewards(custId,roomType,noOfRooms,noOfDays,conn=pool){
    let currentReward = calculateRewards(roomType, noOfDays, noOfRooms);
    let getRewards="select rewards from Customer where customerId=?"
    let rewards=await conn.query(getRewards,[custId]);
    rewards=rewards[0][0].rewards!=null?rewards[0][0].rewards:0;
    rewards+=currentReward
    let updateRewards="update Customer set rewards=? where customerId=?";
    await pool.query(updateRewards,[rewards,custId]);

}
function calculateRewards(roomType, noOfDays, noOfRooms) {
    let currentReward = 0;
    if (roomType == "single") {
        currentReward = SINGLE * noOfDays * noOfRooms;
    } else if (roomType == "double") {
        currentReward = DOUBLE * noOfDays * noOfRooms;
    } else if (roomType == "suite") {
        currentReward = SUITE * noOfDays * noOfRooms;
    }
    return currentReward;
}

/**
 * To be used when reservation is modified
 */
 async function updateRewards(custId,noOfDays,newNoOfDays,roomType,noOfRooms,conn=pool){
    let oldReward = calculateRewards(roomType, noOfDays, noOfRooms);
    let newReward =calculateRewards(roomType,newNoOfDays,noOfRooms);
    let getRewards="select rewards from Customer where customerId=?"
    let rewards=await conn.query(getRewards,[custId]);
    rewards=rewards[0][0].rewards!=null?rewards[0][0].rewards:0;
    rewards=rewards+(newReward-oldReward)
    let updateRewards="update Customer set rewards=? where customerId=?";
    await pool.query(updateRewards,[rewards,custId]);
}
/**
 * To be used when reservation has been deleted
 */
 async function  deleteRewards(custId,roomType,noOfRooms,noOfDays,conn=pool){
    let currentReward = calculateRewards(roomType, noOfDays, noOfRooms);
    let getRewards="select rewards from Customer where customerId=?"
    let rewards=await conn.query(getRewards,[custId]);
    rewards=rewards[0][0].rewards!=null?rewards[0][0].rewards:0;
    rewards-=currentReward
    let updateRewards="update Customer set rewards=? where customerId=?";
    await pool.query(updateRewards,[rewards,custId]);
}
/**
 * To be called when rewards is being used at checkout 
 */
function useRewards(){

}
/**
 * To be called to get the rewards of the customer
 */function getRewards(){

 }
 /**
  * To get rewards of all customer
  */
 function getAllCustRewards(){

 }
 module.exports.addRewards=addRewards;
 module.exports.deleteRewards=deleteRewards;
 module.exports.updateRewards=updateRewards;