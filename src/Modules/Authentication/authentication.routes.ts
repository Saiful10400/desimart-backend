import { Router } from "express";
import authenticationController from "./authentication.controller";
import auth from "../../MiddleWare/auth";
import { roles } from "@prisma/client";
import multerUpload from "../../MiddleWare/multerUpload";
import liveUrlSetter from "../../MiddleWare/LiveUrlSetter";

const router=Router()


// signup.
router.post("/signup",multerUpload.upload.single("photo"),liveUrlSetter("photo"),authenticationController.signup)

// login
router.post("/login",authenticationController.login)


// loggedIn user
router.get("/loggedIn-user",auth([roles.User,roles.Admin,roles.Vendor]),authenticationController.getloggedInUser)

// resetPass.
router.post("/reset",authenticationController.restPassword) 

// respassword with new password enter.
router.post("/reset-new-password",auth([roles.User,roles.Admin,roles.Vendor]),authenticationController.resetNewPassword)


// update.
router.post("/update",authenticationController.chagePassword)


 


// export the module.
const authenticationRoutes=router
export default authenticationRoutes 