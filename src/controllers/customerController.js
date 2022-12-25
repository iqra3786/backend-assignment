const customerModel= require('../models/customermodel')
const crypto = require('crypto')
const { isValidName, isValidStatus, isValidDate, isValidNumber, isValidEmail } = require('../validator/validation')
const cardmodel = require('../models/cardmodel')


// ................................................................ POST API .........................................................

const createCustomer= async function(req,res){
    try{
        //.............................................. requiremets ..........................................................
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status:false, message:"please provide your customer data in request body."})
        }
        if(!req.body.firstName){
            return res.status(400).send({status:false, message:"please provide firstName! It is required."})
        }
        if(!req.body.lastName){
            return res.status(400).send({status:false, message:"please provide lastName! It is required."})
        }
        if(!req.body.mobileNumber){
            return res.status(400).send({status:false, message:"please provide mobileNumber! It is required."})
        }
        if(!req.body.emailID){
            return res.status(400).send({status:false, message:"please provide emailID! It is required."})
        }
        
        //.............................................. validation starts ..........................................................
        
        if(!isValidName(req.body.firstName)){
            return res.status(400).send({status:false, message:"please provide valid firstName!"})
        }
        if(!isValidName(req.body.lastName)){
            return res.status(400).send({status:false, message:"please provide valid lastName!"})
        }
        if(!isValidNumber(req.body.mobileNumber)){
            return res.status(400).send({status:false, message:"please provide valid 10 digit indian mobile number!"})
        }
        if(!isValidEmail(req.body.emailID)){
            return res.status(400).send({status:false, message:"please provide valid emailId!"})
        }
        if(req.body.status){
        if(!isValidStatus(req.body.status)){
            return res.status(400).send({status:false, message:"please provide valid status like active and inactive!"})
        }}
        if(req.body.DOB){
        if(!isValidDate(req.body.DOB)){
            return res.status(400).send({status:false, message:"please provide valid date like 'dd-mm-yyyy' !"})
        }}
        if(await customerModel.findOne({emailID:req.body.emailID, mobileNumber:req.body.mobileNumber})){
            return res.status(409).send({status:false, message:"customer already registered with us."})
        }
    //.............................................. validation ends ..........................................................
    //.............................................. UUID .....................................................................   
        req.body.customerID= crypto.randomBytes(16).toString('hex')
        
        return res.status(201).send({status:true, message:"Success", data: await customerModel.create(req.body)})

    }
    catch(err){
         res.sendStatus(500)
    }
}


// ................................................................ GET API .........................................................


const getCustomers= async function(req,res){
    try{
        const fetchCustomers= await customerModel.find({status:"ACTIVE"})
        if(fetchCustomers.length>0){
        return res.status(200).send({status:true, message:"Success",count:fetchCustomers.length, data:fetchCustomers})
        }
        else{
        return res.status(404).send({status:false, message:"no data found"})
        }

    }
    catch(err){
        res.sendStatus(500)
    }
}

// ................................................................ DELETE API .........................................................


const deleteCustomer= async function(req,res){
    try{
         await customerModel.deleteOne({customerID:req.customer.customerID})
         await cardmodel.deleteOne({customerID:req.customer.customerID.customerID})
         return res.sendStatus(204)
        }
    catch(err){
        res.sendStatus(500)
    }
}


module.exports={createCustomer,getCustomers,deleteCustomer}