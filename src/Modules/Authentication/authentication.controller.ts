import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import AuthenticationService from "./authentication.service";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";

//1. create a user.
const signup = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthenticationService.signup(req.body);
  // const { data, accessToken } = result;
 
  // send token into cooken.
  // res.cookie("accessToken", accessToken, {
  //   secure: true,
  //   httpOnly: true,
  //   sameSite: "none",
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "User registered successfully",
    // token:accessToken
  });
});

//2. login a user.
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthenticationService.login(req.body);
  // const token = req.headers.authorization;
const{data,accessToken}=result

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
    token:accessToken
  });
});

//3. login a user.
const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  
  const result = await AuthenticationService.getCurrentUser(req.userId);
 
  sendResponse(res, {
    data:result,
    statusCode: httpStatus.OK,
    message: "Current logged in user id retrieved successfully",
    success: true,
    
  });
});
 
//  exporting the modules.
const authenticationController = {
  signup,
  login,
  getCurrentUser
};

export default authenticationController;
