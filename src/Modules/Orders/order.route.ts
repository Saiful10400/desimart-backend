import { Router } from "express";
import orderController from "./order.controller";

const router=Router()


router.post("/create",orderController.createOrder)


router.post("/create-payment-link",orderController.createPaymentLInk)

router.post("/order-postProcess/:id",orderController.orderPostProcess)


router.get("/get-all-order-by-id",orderController.getAllOrders)






const orderRouter=router
export default orderRouter