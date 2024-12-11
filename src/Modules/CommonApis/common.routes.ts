import { Router } from "express";
import commonController from "./common.controller";
import multerUpload from "../../MiddleWare/multerUpload";
import liveUrlSetter from "../../MiddleWare/LiveUrlSetter";


const router=Router()



router.get("/user",commonController.getUser)
router.get("/store",commonController.getStore)
router.get("/category",commonController.getCategory)
router.get("/products",commonController.getProducts)


// multer file upload.
router.post("/upload",multerUpload.upload.single("file"),liveUrlSetter("profileImageUrl"),commonController.upload)



const commonRoutes=router
export default commonRoutes 