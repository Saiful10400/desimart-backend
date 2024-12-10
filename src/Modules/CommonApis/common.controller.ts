import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import { Request, Response } from "express";
import httpStatus from "http-status";
import commonService from "./common.service";

const getUser = catchAsync(async (req: Request, res: Response) => {
  const data = await commonService.getUsers(
    Number(req.query.offset),
    Number(req.query.limit)
  );

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "user fetched",
    success: true,
  });
});

const getStore = catchAsync(async (req: Request, res: Response) => {
  let data;
  if (req.query.id) {
    data = await commonService.getSingleShop(req.query.id as string);
  } else {
    data = await commonService.getShop(
      Number(req.query.offset),
      Number(req.query.limit)
    );
  }

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "store fetched",
    success: true,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await commonService.getCatetory();

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "catetory retrieved",
    success: true,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const data = await commonService.getProducts(req.query);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "Products retrieved",
    success: true,
  });
});
 
const commonController = {
  getUser,
  getStore,
  getCategory,
  getProducts,
};

export default commonController;
