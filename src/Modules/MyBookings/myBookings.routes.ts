import { Router } from "express";
import auth from "../../MiddleWare/auth";
import userRole from "../Authentication/user.constain";
import zodValidation from "../../MiddleWare/zodValidation";
import bookingValidation from "./Booking.validation";
import mybookingcontroller from "./Booking.controller";

const router = Router();

//1. create a user all Bookings
router.post(
  "/",
  auth([userRole.admin, userRole.user]),
  zodValidation(bookingValidation.create),
  mybookingcontroller.create
);

//2. get a user booking
router.get("/:id", mybookingcontroller.getOne);

//3. get a user all booking
router.get("/users-all/:id", mybookingcontroller.userAllBooking);

//4. get all booking for admin dashboard.
router.get("/", mybookingcontroller.getAllForAdminDashboard);

//5. delete One
router.delete("/:id", mybookingcontroller.deleteOne);

//6. confirm One
router.put("/:id", mybookingcontroller.confirmOne);

const MyBookingroutes = router;

export default MyBookingroutes;
