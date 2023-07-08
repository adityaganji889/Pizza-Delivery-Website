const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes")
const pizzaRoute = require("./routes/pizzaRoutes")
const orderRoute = require("./routes/orderRoutes")
const path = require("path");
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const port = process.env.PORT || 5000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRoute)
app.use("/api/pizzas",pizzaRoute)
app.use("/api/orders",orderRoute)


const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname, "/frontend/build/index.html"))
});

app.use((err, req, res, next)=>{
    res.status(500).send({ message: err.message});
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})