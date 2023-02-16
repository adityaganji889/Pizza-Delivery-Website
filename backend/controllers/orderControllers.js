const Order = require("../models/orderModel")
const User = require("../models/userModel")
const { v4: uuidv4 } = require("uuid")
const stripe = require("stripe")("sk_test_51MarKISJbAJP59qDH2zYePR5es20RWy8AjFetv6hhamMhKhYQMiUm6bzPVHHvb3llz2DeKtUF02ZSObGpScqsN1Y001cwGbG7H")

const placeOrder = async(req,res) => {
    try{
       const {token, subTotal, user, cartItems} = req.body
       const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
       })
       const payment = await stripe.paymentIntents.create({
        amount: subTotal*100,
        currency: "INR",
        payment_method: token.card.id,
        payment_method_types: ['card'],
        confirm: true,
        customer: customer.id,
        receipt_email: token.email
       },{
           idempotencyKey: uuidv4()
       })
       if(payment.status==='succeeded'){
        const newOrder = new Order({
            name: user.name,
            email: user.email,
            userid: user._id,
            orderItems: cartItems,
            orderAmount: subTotal,
            shippingAddress: {
                street: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                pincode: token.card.address_zip
            },
            transactionid: payment.id,
        })
        await newOrder.save()
        res.send("Order Placed Successfully")
       }
       else{
        res.send("Payment Failed")
       }
    }
    catch(error){
      res.status(400).send({
        message: "Something went wrong",
        error: error
      })
    }
}

const getMyOrders = async(req,res) => {
    try{
        const myOrders = await Order.find({userid: req.body.userid}).sort({_id:-1})
        if(myOrders){
          res.status(200).send(myOrders)
        }
        else{
          res.status(200).send({msg: "No orders to display"})
        }
     }
     catch(error){ 
         res.status(400).send({
          msg: error.message
         })
     }
}

const getAllOrders = async(req,res) => {
  try{
      const user = await User.findById(req.body.userid)
      if(user.isAdmin){
        const orders = await Order.find()
        if(orders){
         res.status(200).send({
          message: "Orders fetched successfully",
          success: true,
          data: orders
         })
        }
        else{
         res.status(200).send({
          message: "No orders to display",
          success: false
        })
        }
      }
      else{
        res.send({
          message: "Cannot display all orders",
          success: false,
        })
      }
   }
   catch(error){ 
       res.status(400).send({
        message: error.message,
        success: false
       })
   }
}

const updateOrderStatus = async(req,res) => {
  try{
    const user = await User.findById(req.body.userid)
     if(user.isAdmin){
      const order = await Order.findById(req.params.id)
      if(order){
        order.isDelivered = true
        await order.save()
        res.send({
        message: "Order status updated Successfully",
        success: true
        })
      }
      else{
       res.send({
        message: "Order Not Found",
        success: false
       })
      }
     }
     else{
      res.send({
        message: "Cannot Update Order Status",
        success: false
      })
     }
  }
  catch(error){
    res.send({
      message: error.message,
      success: false
    })
  }
}

module.exports = {placeOrder,getMyOrders,getAllOrders, updateOrderStatus}