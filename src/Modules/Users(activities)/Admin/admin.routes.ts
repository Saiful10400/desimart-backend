import { Router } from "express";
import adminController from "./admin.controller";
import multerUpload from "../../../MiddleWare/multerUpload";
import liveUrlSetter from "../../../MiddleWare/LiveUrlSetter";

const router=Router()


router.post("/create-category",multerUpload.upload.single("logo"),liveUrlSetter("logo"),adminController.createCategory)


router.post("/manage-category/:id",adminController.manageCategory)

// shop.
router.post("/manage-shop/:id",adminController.manageShop)


// user/vendor manage.
router.post("/manage-user/:id",adminController.manageUser)

// brand.
router.post("/create-brand",multerUpload.upload.single("logo"),liveUrlSetter("logo"),adminController.createBrand)
router.get("/get-brand",adminController.getBrand)

//banner
router.post("/create-banner",multerUpload.upload.single("bannerUrl"),liveUrlSetter("bannerUrl"),adminController.createBanner)
router.get("/get-banners",adminController.getBanners)



const adminRoutes=router
export default adminRoutes