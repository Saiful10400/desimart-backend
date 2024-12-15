import { Router } from "express";
import storeController from "./store.controller";

const router=Router()



router.post("/manage-follow",storeController.createFollow)
router.post("/check-coupon/:id",storeController.checkCoupon)






const storeRoute=router
export default storeRoute