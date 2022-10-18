require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

//routes import
const locationRoutes = require('./routes/locationRoutes');

const app = express()

//middleware
app.use(express.json())

//routes
app.use('/api/locations', locationRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`listning to port ${process.env.PORT}`)
  })
})
.catch((error) => {
  console.log(error)
})
