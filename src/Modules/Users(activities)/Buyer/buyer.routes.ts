import { Router } from "express";
import buyerController from "./buyer.controller";

const router = Router();

// add recent route
router.post("/add-recent", buyerController.addRecentProduct);
router.get("/get-recent/:id", buyerController.getRecent);



//reviews.
router.post("/post-review",buyerController.postReview);


const buyerRoutes = router;
export default buyerRoutes;
