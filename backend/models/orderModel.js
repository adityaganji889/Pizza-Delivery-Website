const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    orderItems: [],
    shippingAddress: {
        type: Object
    },
    orderAmount: {
        type: Number,
        required: true
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
    transactionid: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const orderModel = mongoose.model("orders",orderSchema)

module.exports = orderModel