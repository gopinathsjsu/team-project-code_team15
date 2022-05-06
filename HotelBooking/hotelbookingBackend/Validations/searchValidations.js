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
        let isValid=new Date(req.body.checkin) < new Date(req.body.checkout)
        console.log("check in"+new Date(req.body.checkin))
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
 class processSearch extends searchHandler{
    constructor(){
        super()
        this.nextObj= new searchHandler();
    }
    setNextObj(nextObj){

    }
    validate(req,res){
        console.log("processing search");
        res.status(200).send({
            message:"done"
        })
    }
}
module.exports={processSearch,checkIfDatesAreValid}



