import httpStatus from "http-status";
import sendResponse from "../../../Utility/sendResponse";
import catchAsync from "../../../Utility/catchAsync";
import { Response, Request } from "express";
import adminService from "./admin.service";

// create category.
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.createCategory(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "Caegory crated successfully",
    success: true,
  });
});

// manate catetory.
const manageCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.manageCategory(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "catagory modefied successfully",
    success: true,
  });
});

// shop
const manageShop = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.manageShop(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "shop modefied successfully",
    success: true,
  });
});



// user/vendro manage.
const manageUser=catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.manageShop(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "user/vendor modefied successfully",
    success: true,
  });
});



const adminController = {
  createCategory,
  manageCategory,
  manageShop,
  manageUser
};

export default adminController;
