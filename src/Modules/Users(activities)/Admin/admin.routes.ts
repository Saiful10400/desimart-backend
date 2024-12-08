import { Router } from "express";
import adminController from "./admin.controller";

const router=Router()


router.post("/create-category",adminController.createCategory)





const adminRoutes=router
export default adminRoutes