const Pizza = require("../models/pizzaModel")
const User = require("../models/userModel")

const getAllPizzas = async(req,res) => {
    try{
        const pizzas = await Pizza.find()
        if(pizzas){
          res.status(200).send(pizzas)
        }
        else{
          res.status(200).send({msg: "No pizzas to display"})
        }
     }
     catch(error){ 
         res.status(400).send({
          msg: error.message
         })
     }
}

const addPizza = async(req,res) => {
  try{
    const user = await User.findById(req.body.userid);
    if(user.isAdmin){
      const {pizza} = req.body
      const newPizza = new Pizza({
       name: pizza.name,
       varients: ["small","medium","large"],
       prices: [pizza.prices],
       category: pizza.category,
       image: pizza.image,
       description: pizza.description
     })
     await newPizza.save()
     res.send({
      message: "New Pizza added successfully",
      success: true,
     })
    }
    else{
      res.send({
        message: "Pizza cannot be added",
        success: false
      })
    }  
  }
  catch(error){
     res.send({
      message: error.message,
      success: false,
     })
  }
}

const getPizzaById = async(req,res) => {
  try{
    console.log(req.body)
    const user = await User.findById(req.body.userid);
    if(user.isAdmin){
      const pizza = await Pizza.findById(req.params.id)
      console.log("pizza:",pizza)
      if(pizza){
        res.send({
          message: "Pizza info fetched successfully",
          data: pizza,
          success: true
        })
      }
      else{
        res.send({
          message: "Pizza not found",
          success: false
        })
      }
    }
  }
  catch(error){
    res.send({
      message: error.message,
      success: false
    })
  }
}

const editPizza = async(req,res) => {
  try{
   const user = await User.findById(req.body.userid)
   if(user.isAdmin){
    const {pizza} = req.body
    const updatedpizza = await Pizza.findOne({_id:pizza._id})
    if(updatedpizza){
      updatedpizza.name = pizza.name
      updatedpizza.image = pizza.image
      updatedpizza.prices = [pizza.prices]
      updatedpizza.category = pizza.category
      updatedpizza.description = pizza.description
      await updatedpizza.save()
      res.send({
        message: "Pizza updated successfully",
        success: true
      })
    }
    else{
      res.send({
        message: "Pizza not found",
        success: false
      })
    }
   }
   else{
    res.send({
      message: "Cannot update pizza",
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

const deletePizza = async(req,res) => {
  try{
     const user = await User.findById(req.body.userid)
     if(user.isAdmin){
      const pizza = await Pizza.findById(req.params.id)
      if(pizza){
        await pizza.delete()
        res.send({
        message: "Pizza deleted Successfully",
        success: true
        })
      }
      else{
       res.send({
        message: "Pizza Not Found",
        success: false
       })
      }
     }
     else{
      res.send({
        message: "Cannot Delete Pizza",
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

module.exports = {getAllPizzas,addPizza,getPizzaById,editPizza,deletePizza}