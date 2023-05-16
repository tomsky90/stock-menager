require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

//routes import
const locationRoutes = require('./routes/locationRoutes');
const userRoutes = require('./routes/usersRouts');
const itemsListRoutes = require('./routes/itemsListRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express()

//middleware
app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
)

//routes
app.use('/api/locations', locationRoutes)
app.use('/api/user', userRoutes)
app.use('/api/items-list', itemsListRoutes)
app.use('/api/settings', settingsRoutes)

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
