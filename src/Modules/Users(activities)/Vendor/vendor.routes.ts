import { Router } from "express";
import vendorController from "./vendor.controller";

const router=Router()

// create shop.
router.post("/create-shop",vendorController.createProduct)


// add product.
router.post("/create-product")

// update product/manage
router.post("/manage-product/:id")






const vendorRouter=router
export default vendorRouter