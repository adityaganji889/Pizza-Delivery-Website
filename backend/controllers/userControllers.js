const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async(req,res) => {
    try{
        // check if user already exists
        let user = await User.findOne({email : req.body.email})
        if(user){
         return res.send({
             success: false,
             message: "User already exists",
         })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashedPassword;
        const newUser = new User(req.body)
        await newUser.save();
        res.send({
         message: "User created successfully",
         data: null,
         success: true,
        })
     }
     catch(error){
         res.send({
             message: error.message,
             success: false,
         })
     }
}

const login = async(req,res) => {
    try{
        //check if user exists
        let user = await User.findOne({email : req.body.email})
        if(!user){
          return res.send({
              message: "User does not exist",
              success: false,
          })
        }
        //check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
          return res.send({
              success: false,
              message: "Invalid password",
          })
        }
        
        // if(!user.isVerified){
        //   return res.send({
        //     success: false,
        //     message: "user is not verified yet or has been suspended",
        //   })
        // }
        //generate token
        const token = jwt.sign({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.send({
          message: "User logged in successfully",
          success: true,
          data: token,
        }) 
      }
      catch(error){
        res.send({
          message: error.message,
          success: false,
        })
      }
}

const getUserInfo = async(req,res)=>{
  try{
    const user = await User.findById(req.body.userid);
    user.password = "";
    res.send({
      message: "user info fetched successfully",
      data: user,
      success: true,
    })
  }
  catch(error){
    res.send({
      message: error.message,
      success: false,
    })
  }
}

const getAllUsers = async(req,res) => {
  try{
      const user = await User.findById(req.body.userid)
      if(user.isAdmin){
        const users = await User.find()
        if(users){
         res.status(200).send({
          message: "Users fetched successfully",
          success: true,
          data: users
         })
        }
        else{
         res.status(200).send({
          message: "No users to display",
          success: false
        })
        }
      }
      else{
        res.send({
          message: "Cannot display all users",
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

const updateUserAdminStatus = async(req,res) => {
  try{
    const user = await User.findById(req.body.userid)
     if(user.isAdmin){
      const user = await User.findById(req.params.id)
      if(user._id!==req.body.userid){
        user.isAdmin = !user.isAdmin
        await user.save()
        res.send({
        message: "User Admin Status updated Successfully",
        success: true
        })
      }
      else{
       res.send({
        message: "Trying to update admin status of yourself, cannot be done",
        success: false
       })
      }
     }
     else{
      res.send({
        message: "Cannot Update User Admin Status",
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

const deleteUser = async(req,res) => {
  try{
     const user = await User.findById(req.body.userid)
     if(user.isAdmin){
      const user = await User.findById(req.params.id)
      if(user._id!==req.body.userid){
        await user.delete()
        res.send({
        message: "User deleted Successfully",
        success: true
        })
      }
      else{
       res.send({
        message: "You cannot delete yourself while logged in",
        success: false
       })
      }
     }
     else{
      res.send({
        message: "Cannot Delete User",
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

module.exports = {register, login, getUserInfo, getAllUsers, updateUserAdminStatus, deleteUser}
