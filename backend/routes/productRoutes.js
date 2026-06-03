const express = require("express");
const router = express.Router();

const {addProduct, getProducts,deleteProduct, getDashboardStats, updateProduct, getProductById} = require("../controllers/productController");
const protect = require('../middlewares/authMiddleware');

router.post("/",protect,addProduct);
router.get("/",protect,getProducts);
router.get("/dashboard/stats",protect,getDashboardStats)
router.get("/:id",protect,getProductById)
router.put("/:id",protect,updateProduct)
router.delete("/:id",protect,deleteProduct)


module.exports = router;