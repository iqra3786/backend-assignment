const customerModel= require('../models/customermodel')
const cardModel = require('../models/cardmodel');
const { isValidStatus } = require('../validator/validation');

// ................................................................ POST API .........................................................


const createCard= async function(req,res){
    try{
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status:false, message:"please provide your customer data in request body."})
        }
       let id = "C000";

       for(let i = 0; i < 100; i++)
       {
    let strings = id.replace(/[0-9]/g, '');
    let digits = (parseInt(id.replace(/[^0-9]/g, '')) + 1).toString();
    if(digits.length < 4)
        digits = ("000"+digits).substring(-4);
    id = strings + digits;
    
    if(!await cardModel.findOne({cardNumber:id})){
    req.body.cardNumber=id
    break;
    }
    }
    if(req.body.cardType){
    if(!["REGULAR", "SPECIAL"].includes(req.body.cardType)){
        return res.status(400).send({status:false, message:"please choose a valid cardType "})
    }}
    else{
        return res.status(400).send({status:false, message:"please provide cardType SPECIAL/REGULAR "})

    }
    if(req.body.status){
        if(!isValidStatus(req.body.status))
        return res.status(400).send({status:false, message:"please choose a valid status "})

    }
    if(!req.body.customerID){
        return res.status(400).send({status:false, message:"please provide your customerID "})
    
    }
    const findCustomer=  await customerModel.findOne({_id:req.body.customerID})
    
    if(!findCustomer){
    return res.status(404).send({status:false, message:"this customer does not exist or customerID is incorrect or customer is not registered with us."})
    }
    req.body.customerName= findCustomer.firstName+" "+findCustomer.lastName
    
   
   return res.status(201).send({status:true, message:"Success", data: await cardModel.create(req.body)})

    }
    catch(err){
        console.log(err.name, err.message)
         res.sendStatus(500)
    }
}

// ................................................................ GET API .........................................................


const getCards= async function(req,res){
    try{
        const cards= await cardModel.find().populate('customerID')
        if(cards.length>0){
        return res.status(200).send({status:true, message:"Success", count:cards.length, data:cards})    
        }
        else{
        return res.status(404).send({status:false, message:"cards do not exist"})    
        }

    }
    catch(err){
        res.sendStatus(500)
    }
}



module.exports= {createCard, getCards}
