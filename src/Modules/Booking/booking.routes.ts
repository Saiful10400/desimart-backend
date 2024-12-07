import { Router } from "express";
import zodValidation from "../../MiddleWare/zodValidation";
import bookingValidation from "./booking.validation";
import bookingController from "./booking.controller";
import userRole from "../Authentication/user.constain";
import auth from "../../MiddleWare/auth";

const router=Router()


//1.create a booking.
router.post("/",auth([userRole.admin,userRole.user]),zodValidation(bookingValidation.createSingleBooking),bookingController.createSingleBooking)

//2. get all bookings
router.get("/",auth([userRole.admin]),bookingController.getAllBookings)

//3. update a booking
router.put("/:id",auth([userRole.admin]),zodValidation(bookingValidation.updateASingleBooking),bookingController.updateABooking)

//4. delete a booking
router.delete("/:id",auth([userRole.admin]),bookingController.deleteABooking)


const bookingRoutes=router
export default bookingRoutes