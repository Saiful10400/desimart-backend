import httpStatus from "http-status";
import sendResponse from "../../../Utility/sendResponse";
import catchAsync from "../../../Utility/catchAsync";
import { Request, Response } from "express";
import buyerService from "./buyer.service";

// const chagePassword = catchAsync(async (req: Request, res: Response) => {

//   const data = await AuthenticationService.login(req.body);

//   sendResponse(res, {
//     data,
//     statusCode: httpStatus.OK,
//     message: "password chaged successfully",
//     success: true,
//   });
// });

// add recent product.

const addRecentProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await buyerService.addRecent(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "recent Product added successfully",
    success: true,
  });
});
// get recent product.

const getRecent = catchAsync(async (req: Request, res: Response) => {
  const data = await buyerService.getRecent(req.params?.id);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "all recent fetched successfully.(limit-10)",
    success: true,
  });
});



// post review.

const postReview = catchAsync(async (req: Request, res: Response) => {
  const data = await buyerService.postReview(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "review posted",
    success: true,
  });
});



const answerReview = catchAsync(async (req: Request, res: Response) => {
  const data = await buyerService.answerReview(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "review posted",
    success: true,
  });
});



const getAllReview = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params.id)
  const data = await buyerService.getAllReview(req.params.id); 

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "review received",
    success: true,
  });
});




const buyerController = {
  addRecentProduct,
  getRecent,
  postReview,
  answerReview,
  getAllReview
};

export default buyerController;
