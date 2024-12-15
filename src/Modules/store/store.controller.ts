import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import { Request,Response } from "express";
import storeService from "./store.service";
import httpStatus from "http-status";

const createFollow=catchAsync(async (req: Request, res: Response) => {
    const data = await storeService.manageFollow(req.body);
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: "followed modified",
      success: true,
    });
  });

const checkCoupon=catchAsync(async (req: Request, res: Response) => {
    const data = await storeService.checkCoupon(req);
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: data?"Coupne applyed":"No coupne found",
      success: true,
    });
  });



  const storeController={
    createFollow,
    checkCoupon
  }

  export default storeController
