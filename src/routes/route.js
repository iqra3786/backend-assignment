const express= require('express')
const router= express.Router()
const customerController= require('../controllers/customerController')
const cardController= require('../controllers/cardController')
const {middleware}= require("../middleware/auth.js")

//...................................... CUSTOMER API ...............................................................//

router.post('/CreatenewCustomer', customerController.createCustomer)
router.get('/fetchCustomerDetails', customerController.getCustomers)
router.delete('/deleteCustomerDetail',middleware, customerController.deleteCustomer)

//........................................CARD API .................................................................//

router.post('/CreateNewCard', cardController.createCard)
router.get('/fetchCard', cardController.getCards)

//..................................... PATH NOT FOUND ............................................................//

router.all('/*', function(req, res){
    return res.status(404).send({status:false, message:"invalid path/path not found"})
})
module.exports=router

