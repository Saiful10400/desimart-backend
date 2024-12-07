import { Router } from "express";
import paymentController from "./Payment.controller";



const router=Router()

router.post("/status/:id",paymentController.paymentStatus)
router.get("/:id",paymentController.payWithBookingId)


const paymentRoute=router
export default paymentRoute