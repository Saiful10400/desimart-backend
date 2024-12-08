import httpStatus from "http-status";
import sendResponse from "../../../Utility/sendResponse";
import catchAsync from "../../../Utility/catchAsync";
import { Request, Response } from "express";
import vendorService from "./vendor.service";

// create store
const createStore = catchAsync(async (req: Request, res: Response) => {
  const data = await vendorService.createStore(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "Store created successfully",
    success: true,
  });
});

// create product.
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await vendorService.createProduct(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "product created successfully",
    success: true,
  });
});


const vendorController = {
  createProduct,
  createStore
};

export default vendorController;
