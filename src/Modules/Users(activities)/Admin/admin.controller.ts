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
    message: "Category crated successfully",
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
  const data = await adminService.manageuser(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "user/vendor modefied successfully",
    success: true,
  });
});

// create brand.
const createBrand = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.createBrand(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "New Brand Created Successfully",
    success: true,
  });
});

// get brand.
const getBrand = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.getBrand(req.query);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "New Brand Created Successfully",
    success: true,
  });
});

// create banner.
const createBanner = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.createBanner(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "New banner crated successfully",
    success: true,
  });
});
// create banners.
const getBanners = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.getBanners(req.query);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "New banner crated successfully",
    success: true,
  });
});


const adminController = {
  createCategory,
  manageCategory,
  manageShop,
  manageUser,
  createBrand,
  getBrand,
  createBanner,
  getBanners
};

export default adminController;
