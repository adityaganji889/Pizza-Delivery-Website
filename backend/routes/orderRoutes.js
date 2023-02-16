const router = require("express").Router()
const {placeOrder, getMyOrders, getAllOrders, updateOrderStatus} = require("../controllers/orderControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/placeorder",authMiddleware,placeOrder)
router.get("/getMyOrders",authMiddleware,getMyOrders)
router.get("/getAllOrders",authMiddleware,getAllOrders)
router.get("/updateOrder/:id",authMiddleware,updateOrderStatus)


module.exports=router;