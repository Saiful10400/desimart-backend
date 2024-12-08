import httpStatus from "http-status";
import sendResponse from "../../../Utility/sendResponse";
import catchAsync from "../../../Utility/catchAsync";
import { Response,Request } from "express";
import adminService from "./admin.service";


// create category.
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = await adminService.createCategory(req.body);
  


 
  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "Catetory crated successfully",
    success: true,
  });
});
// const chagePassword = catchAsync(async (req: Request, res: Response) => {
//   const data = await AuthenticationService.login(req.body);
  


 
//   sendResponse(res, {
//     data,
//     statusCode: httpStatus.OK,
//     message: "password chaged successfully",
//     success: true,
//   });
// });




const adminController={
createCategory
}

export default adminController