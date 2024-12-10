import { Router } from "express";
import buyerController from "./buyer.controller";

const router = Router();

// add recent route
router.post("/add-recent", buyerController.addRecentProduct);
router.get("/get-recent", buyerController.getRecent);

const buyerRoutes = router;
export default buyerRoutes;
