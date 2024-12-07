/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express";
import roomController from "./room.controller";
import jwtChecker from "../../MiddleWare/JwtChecker";
import zodValidation from "../../MiddleWare/zodValidation";
import roomValidationSchema from "./room.validation";
import auth from "../../MiddleWare/auth";
import userRole from "../Authentication/user.constain";

const router=Router()

// 1.create room.
router.post("/",zodValidation(roomValidationSchema.createSingleroom),roomController.createSingleRoom)
// 2.get  single and all room.
router.get("/:id",roomController.getRoom)
//2.1 get all rooms.
router.get("/",roomController.getAllRooms)
// 3.update single room.
router.put("/:id",auth([userRole.admin]),zodValidation(roomValidationSchema.updateSingleroom),roomController.updateSingleRoom)
// 4. delete single room.
router.delete("/:id",auth([userRole.admin]),roomController.deleteSingleRoom)

const roomRoutes=router
export default roomRoutes

