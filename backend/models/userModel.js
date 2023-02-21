const mongoose = require("mongoose")
const Order = require("./orderModel")

const userSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     email: {
        type: String,
        required: true
     },
     password: {
        type: String,
        required: true
     },
     isAdmin: {
        type: Boolean,
        required: true,
        default: false
     }
},{
    timestamps: true
}
)

// Delete orders of the user when a user is deleted
userSchema.post('remove',async function(res, next){
   await Order.deleteMany({userid: this._id});
   next();
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
