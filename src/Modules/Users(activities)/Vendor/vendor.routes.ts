import { Router } from "express";
import vendorController from "./vendor.controller";
import multerUpload from "../../../MiddleWare/multerUpload";
import liveUrlSetter from "../../../MiddleWare/LiveUrlSetter";

const router=Router()

// create shop.
router.post("/create-shop",multerUpload.upload.single("logo"),liveUrlSetter("logo"),vendorController.createStore)

// modidify shop/  delete/update.
router.post("/manage-shop/:id",multerUpload.upload.single("logo"),liveUrlSetter("logo"),vendorController.updateStore)


// add product.
router.post("/create-product",multerUpload.upload.single("image"),liveUrlSetter("image"),vendorController.createProduct)




// update product/manage
router.post("/manage-product/:id",multerUpload.upload.single("photo"),liveUrlSetter("image"),vendorController.updateProduct)

// create coupne
router.post("/create-coupne",vendorController.createCoupne)

// manage coupne
router.post("/manage-coupne/:id",vendorController.updateCoupne)


router.get("/get-shopsAllCoupne/:id",vendorController.getCoupnewithShop)
 



  

const vendorRouter=router
export default vendorRouter