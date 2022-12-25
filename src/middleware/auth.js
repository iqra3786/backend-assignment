const customerModel= require('../models/customermodel')

// ................................................MIDDLEWAREPART........................................................


const middleware = async function(req,res,next){
try{
if(!Object.keys(req.query).includes("customerID")){
    return res.status(400).send({status:false, message:"provide your UUID customerID"})
}
const customer = await customerModel.findOne({customerID:req.query.customerID})
if(!customer){
    return res.status(400).send({status:false, message:"we can not delete this customer because this customer is not registered with us"})
}
req.customer= customer
next()
}
catch(err){
return res.sendStatus(500)
}}


module.exports.middleware= middleware