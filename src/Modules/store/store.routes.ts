import { Router } from "express";
import storeController from "./store.controller";

const router=Router()



router.post("/manage-follow",storeController.createFollow)



const storeRoute=router
export default storeRoute