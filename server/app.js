const express = require('express')
const placeRouter = require('./routes/places-routes')
const userRouter = require('./routes/users-routes')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')
const mongoose = require("mongoose")
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use("/api/places", placeRouter)

app.use("/api/users", userRouter)

app.use((req, res, next) => {
    throw new HttpError("Could not find this route", 404)
})

app.use((error, req, res, next) => {
    if(req.headerSent) {
        next(error)
    }
    res.status(error.code || 404)
    res.json({message: error.message || 'An Unkown Error Occurred!'})
})

mongoose.connect(`mongodb+srv://ak669212:sxmTtF79qEjUOF2l@cluster0.lqsee3s.mongodb.net/project1?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("Connecte to DB!")
    app.listen(3000);
})
.catch(err => console.log(err))
