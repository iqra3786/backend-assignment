const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const route = require('./src/routes/route.js')

const app = express()

app.use(multer().any())

mongoose.connect('mongodb+srv://Iqra:Iqra3786@cluster0.tsgwccn.mongodb.net/backendAssignment',{
    useNewUrlParser: true
},mongoose.set('strictQuery', true))
.then(()=>console.log("mongodb is connected successfully"))
.catch((err)=>console.log(err.message))

app.use('/', route)

app.listen(3000, function(){
    console.log("Express app is running on port " + 3000)
})









