import { Router } from "express";
import vendorController from "./vendor.controller";

const router=Router()

// create shop.
router.post("/create-shop",vendorController.createStore)

// modidify shop/  delete/update.
router.post("/manage-shop/:id",vendorController.updateStore)


// add product.
router.post("/create-product",vendorController.createProduct)

// update product/manage
router.post("/manage-product/:id",vendorController.updateProduct)

// create coupne
router.post("/create-coupne",vendorController.createCoupne)

// manage coupne
router.post("/manage-coupne/:id",vendorController.updateCoupne)
 



  

const vendorRouter=router
export default vendorRouter