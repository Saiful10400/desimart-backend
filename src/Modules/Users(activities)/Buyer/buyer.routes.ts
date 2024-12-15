import { Router } from "express";
import buyerController from "./buyer.controller";

const router = Router();

// add recent route
router.post("/add-recent", buyerController.addRecentProduct);
router.get("/get-recent/:id", buyerController.getRecent);



//reviews.
router.post("/post-review",buyerController.postReview);
//reviews.
router.post("/answer-review/:id",buyerController.answerReview);


router.get("/all-review/:id",buyerController.getAllReview);




const buyerRoutes = router;
export default buyerRoutes;
 