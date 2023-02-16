const router = require("express").Router()
const {getAllPizzas, addPizza, getPizzaById, editPizza, deletePizza} = require("../controllers/pizzaControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/getAllPizzas",authMiddleware,getAllPizzas)
router.post("/addPizza",authMiddleware,addPizza)
router.get("/getPizzaById/:id",authMiddleware,getPizzaById)
router.put("/editPizza",authMiddleware,editPizza)
router.delete("/deletePizza/:id",authMiddleware,deletePizza)

module.exports = router;