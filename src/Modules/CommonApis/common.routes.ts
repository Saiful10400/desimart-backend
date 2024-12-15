import { Router } from "express";
import commonController from "./common.controller";
import multerUpload from "../../MiddleWare/multerUpload";
import liveUrlSetter from "../../MiddleWare/LiveUrlSetter";


const router=Router()



router.get("/user",commonController.getUser)
router.get("/store",commonController.getStore)
router.get("/category",commonController.getCategory)
router.get("/products",commonController.getProducts)
router.get("/store-products/:id",commonController.getStoreAllProducts)


// multer file upload.
router.post("/upload",multerUpload.upload.single("file"),liveUrlSetter("profileImageUrl"),commonController.upload)


// following shop.
router.post("/product-following",commonController.followingProduct)



const commonRoutes=router
export default commonRoutes 