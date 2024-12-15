import { Router } from "express";
import adminController from "./admin.controller";

const router=Router()


router.post("/create-category",adminController.createCategory)

router.post("/manage-category/:id",adminController.manageCategory)

// shop.
router.post("/manage-shop/:id",adminController.manageShop)


// user/vendor manage.
router.post("/manage-user/:id",adminController.manageUser)



const adminRoutes=router
export default adminRoutes