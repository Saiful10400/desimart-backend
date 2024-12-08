import { Router } from "express";
import authenticationController from "./authentication.controller";
import auth from "../../MiddleWare/auth";
import { roles } from "@prisma/client";

const router=Router()


// signup.
router.post("/signup",authenticationController.signup)

// login
router.post("/login",authenticationController.login)

// resetPass.
router.post("/reset",authenticationController.restPassword) 

// respassword with new password enter.
router.post("/reset-new-password",auth([roles.User,roles.Admin,roles.Vendor]),authenticationController.resetNewPassword)


// update.
router.post("/update",authenticationController.chagePassword)


 


// export the module.
const authenticationRoutes=router
export default authenticationRoutes 