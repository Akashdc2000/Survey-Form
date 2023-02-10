const express = require('express')
const cors=require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const users = require('./routes/users')
const responses = require('./routes/responses')
const forms = require('./routes/forms')

const app = express()
app.use(cors());
app.use(express.json())

//Routers
app.use('/users', users); 
app.use('/responses', responses)
app.use('/survey',forms)

mongoose.connect('mongodb://localhost:27017/survey_database')
    .then(() => {
        app.listen(process.env.local_port, () => {
            console.log(`Server Running at localhost:${process.env.local_port}`)
        })
    }).catch((error) => {
        console.log(error)
    }) 