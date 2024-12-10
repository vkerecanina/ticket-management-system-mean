require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

console.log(process.env.DATABASE_URL)  // check if DATABASE_URL is correct

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.listen(3000, () => console.log('Server Started'))