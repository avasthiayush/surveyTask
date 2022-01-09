const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const bodyParser = require("body-parser")

const userLogin = require('./routes/userLogin')
const surveyRoutes = require('./routes/survey')
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(userLogin)
app.use(surveyRoutes)

const port = 5000

app.listen(port, () => {
    console.log('Server is running on port, ', port)
})