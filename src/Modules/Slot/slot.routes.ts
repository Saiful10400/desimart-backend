import { Router } from "express";
import auth from "../../MiddleWare/auth";
import userRole from "../Authentication/user.constain";
import zodValidation from "../../MiddleWare/zodValidation";
import slotValidationSchema from "./slot.validation";
import slootsController from "./slot.controller";

const router=Router()

//1. create a some sloots.
router.post("/",auth([userRole.admin]),zodValidation(slotValidationSchema.create),slootsController.CreateSomeSlots)


//2.Get available sloots.
router.get("/availability",slootsController.getAllAvailableSlot)

//3.Delete a slot.
router.delete("/:id",slootsController.deleteASlot)

//4. Update a slot.
router.put("/:id",zodValidation(slotValidationSchema.update),slootsController.updateASlot)


// export modules.
const slootsRoutes=router
export default slootsRoutes