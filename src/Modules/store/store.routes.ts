import { Router } from "express";
import storeController from "./store.controller";

const router=Router()



router.post("/manage-follow",storeController.createFollow)
router.post("/check-coupon/:id",storeController.checkCoupon)

// get all stores.
router.get("/all-store",storeController.getAllStore)





const storeRoute=router
export default storeRoute