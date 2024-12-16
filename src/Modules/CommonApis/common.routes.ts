import { Router } from "express";
import commonController from "./common.controller";
 


const router=Router()



router.get("/user",commonController.getUser)
router.get("/store",commonController.getStore)
router.get("/category",commonController.getCategory)
router.get("/products",commonController.getProducts)
router.get("/store-products/:id",commonController.getStoreAllProducts)

 


// following shop.
router.post("/product-following",commonController.followingProduct)

// get category product.




const commonRoutes=router
export default commonRoutes 