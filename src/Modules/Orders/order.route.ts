import { Router } from "express";
import orderController from "./order.controller";

const router=Router()


router.post("/create",orderController.createOrder)


router.get("/")






const orderRouter=router
export default orderRouter