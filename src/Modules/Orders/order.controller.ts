import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import { Request,Response } from "express";
import orderService from "./order.service";
import httpStatus from "http-status";
// create order
const createOrder=catchAsync(async (req: Request, res: Response) => {
    const data = await orderService.createOrder(req);
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: "orderId genereated successfully",
      success: true,
    });
  });




  const orderController={
    createOrder
  }
  
  export default orderController