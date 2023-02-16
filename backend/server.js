const express = require("express");
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoute = require("./routes/userRoutes")
const pizzaRoute = require("./routes/pizzaRoutes")
const orderRoute = require("./routes/orderRoutes")

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use("/api/users",userRoute)
app.use("/api/pizzas",pizzaRoute)
app.use("/api/orders",orderRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})