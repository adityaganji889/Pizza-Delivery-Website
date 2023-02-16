const router = require("express").Router()
const {register,login, getUserInfo, getAllUsers, deleteUser, updateUserAdminStatus} = require("../controllers/userControllers.js")
const authMiddleware = require("../middlewares/authMiddleware")

router.post("/register",register)
router.post("/login",login)
router.post("/get-user-info",authMiddleware,getUserInfo)
router.get("/getAllUsers",authMiddleware,getAllUsers)
router.get("/updateUserAdminStatus/:id",authMiddleware,updateUserAdminStatus)
router.delete("/deleteUser/:id",authMiddleware,deleteUser)

module.exports = router;