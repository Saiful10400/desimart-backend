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

// update store
const updateStore = catchAsync(async (req: Request, res: Response) => {
  const data = await vendorService.updateStore(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "Store modified successfully",
    success: true,
  });
});

// create product.
const createProduct = catchAsync(async (req: Request, res: Response) => {
const payload={...req.body}
payload.inventoryCount = Number(payload.inventoryCount);
payload.price = Number(payload.price);
payload.discount = Number(payload.discount);
payload.flashSale=payload.flashSale=="true"?true:false
payload.carouselImages=payload?.carouselImages?.split("'")[0]?.split(",")
  const data = await vendorService.createProduct(payload);
 

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "product created successfully",
    success: true,
  });
});

 



// update product.
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const data = await vendorService.updateProduct(req);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "product modified successfully",
    success: true,
  });
});

// coupne.
const createCoupne = catchAsync(async (req: Request, res: Response) => {
  const data = await vendorService.createCoupne(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "coupne created successfully",
    success: true,
  });
});

const updateCoupne = catchAsync(async (req: Request, res: Response) => {
  let data;
  if (req.query.delete === "true") {
    data = await vendorService.deleteCoupne(req.params.id as string);
  } else {
    data = await vendorService.updateCoupne(req);
  }

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "coupne modified successfully",
    success: true,
  });
});

const getCoupnewithShop = catchAsync(async (req: Request, res: Response) => {
  
  const data= await vendorService.getAllCoupne(req.params.id)

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "coupne getted successfully",
    success: true,
  });
});

const vendorController = {
  createProduct,
  createStore,
  updateProduct,
  updateStore,
  createCoupne,
  updateCoupne,
  getCoupnewithShop
};

export default vendorController;
