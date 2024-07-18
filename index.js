const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { selectionRoutes } = require('./routes.js')
require('dotenv').config()

const port = process.env.PORT

const app = express()
app.use(bodyParser.json());

selectionRoutes(app)

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => console.log('Mongo DB Connected Successfully'))
    .catch((e) => console.log('Unable to connect MongoDB', e))

app.listen(port, () => {
    console.log('Server Started on PORT:', port)
})