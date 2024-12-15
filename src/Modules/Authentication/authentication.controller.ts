import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import AuthenticationService from "./authentication.service";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import { TRequest } from "../../MiddleWare/auth";
import appError from "../../Errors/appError";

//1. create a user.
const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthenticationService.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "User signup successfully",
  });
});

// 2. login a user.
const login = catchAsync(async (req: Request, res: Response) => {
  if (!req.body) {
    throw new appError(401, "invalid email or password!");
  }
  const result = await AuthenticationService.login(req.body);

  const { data, accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    success: true,
    token: accessToken,
  });
});

//3. login a user.
// const getCurrentUser = catchAsync(async (req: Request, res: Response) => {

//   const result = await AuthenticationService.getCurrentUser(req.userId);

//   sendResponse(res, {
//     data:result,
//     statusCode: httpStatus.OK,
//     message: "Current logged in user id retrieved successfully",
//     success: true,

//   });
// });

// 4.chage pass.
const chagePassword = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthenticationService.changePassword(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "password chaged successfully",
    success: true,
  });
});

// 5.rest pass.
const restPassword = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthenticationService.resetPassword(req.body);

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "reset email sended successfully",
    success: true,
  });
});
// 5.rest new pass.  Part-2
const resetNewPassword = catchAsync(async (req: TRequest, res: Response) => {
  if (req.user?.email) new appError(httpStatus.BAD_REQUEST, "No email found");
  const data = await AuthenticationService.resetNewPassword({
    newPassword: req.body.newPassword,
    email: req?.user?.email,
  });

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "password updated successfully",
    success: true,
  });
});


// 6. get logged in user.
const getloggedInUser=catchAsync(async (req: TRequest, res: Response) => {

  if(!req.user?.email){
    throw new appError(401,"No email found")
  }
  const data=await AuthenticationService.getLoggedInuser(req.user?.email as string)

  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "loggedin user fetched successfully",
    success: true,
  });
});

//  exporting the modules.
const authenticationController = {
  signup,
  getloggedInUser,
  login,
  chagePassword,
  restPassword,
  resetNewPassword,
  // getCurrentUser
};

export default authenticationController;
