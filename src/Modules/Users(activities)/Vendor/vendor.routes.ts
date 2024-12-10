import { Router } from "express";
import vendorController from "./vendor.controller";

const router=Router()

// create shop.
router.post("/create-shop",vendorController.createStore)


// add product.
router.post("/create-product",vendorController.createProduct)

// update product/manage
router.post("/manage-product/:id",vendorController.updateProduct)






const vendorRouter=router
export default vendorRouter