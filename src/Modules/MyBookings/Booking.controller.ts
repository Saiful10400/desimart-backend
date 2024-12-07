import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import myBookingService from "./Booking.service";
import httpStatus from "http-status";

//1. create one
const create = catchAsync(async (req: Request, res: Response) => {
  const data = await myBookingService.createOne(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
  });
});

//2. get one by id
const getOne = catchAsync(async (req: Request, res: Response) => {
  const data = await myBookingService.getAbooking(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "a bookings retrieved successfully",
  });
});

//3. get a user all booking
const userAllBooking=catchAsync(async (req: Request, res: Response) => {
  const data = await myBookingService.getAuserAllBooking(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "a user all bookings retrieved successfully",
  });
});

//4. get one by id
const getAllForAdminDashboard = catchAsync(async (req: Request, res: Response) => {
  const data = await myBookingService.getAllForAdminDashboard();
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "All booking retrieved successfully",
  });
});
//5. get one by id
const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const data = await myBookingService.deleteOne(req.params.id);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking Deleted Successfully",
  });
});
//6. confirm one by id
const confirmOne = catchAsync(async (req: Request, res: Response) => {
  const action=req.query.action
  const data = await myBookingService.confirmOne(req.params.id,action as string);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: `Booking ${action==="Confirmed"?"Approved":"Rejected"} Successfully.`,
  });
});


const mybookingcontroller = { create, getOne, userAllBooking,getAllForAdminDashboard,deleteOne,confirmOne};
export default mybookingcontroller;
