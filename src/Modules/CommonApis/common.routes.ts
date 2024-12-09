import { Router } from "express";
import commonController from "./common.controller";


const router=Router()



router.get("/user",commonController.getUser)
router.get("/store",commonController.getStore)
router.get("/category",commonController.getCategory)
router.get("/products",commonController.getProducts)



const commonRoutes=router
export default commonRoutes