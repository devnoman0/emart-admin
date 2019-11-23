const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Require .env File
require('dotenv').config()

//Import Router
const AdminRouter = require('./routes/admin')
const CategoryRouter = require('./routes/categories/category')
const SubCategoryRouter = require('./routes/categories/sub-category')
const SubSubCategoryRouter = require('./routes/categories/sub-sub-category')
const BrandsRouter = require('./routes/brands')
const SellerRouter = require('./routes/seller')
const StaffRouter = require('./routes/staff')

//Connect Database
mongoose.set("useCreateIndex", true)
mongoose
  .connect(process.env.MONGO_CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));
const app = express()

// Use MiddleWares
app.use(bodyParser.urlencoded({extented: false}))
app.use(express.json())
app.use(cors())

// Start Calling Routes
app.use('/admin', AdminRouter)
app.use('/category', CategoryRouter)
app.use('/sub-category', SubCategoryRouter)
app.use('/sub-sub-category', SubSubCategoryRouter)
app.use('/brands', BrandsRouter)
app.use('/seller', SellerRouter)
app.use('/staff', StaffRouter)

//Server Started Listening
app.listen(process.env.STARTING_PORT, () => console.log(`Express Server Running on port ${process.env.STARTING_PORT}`))