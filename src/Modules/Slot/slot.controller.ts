import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import slootsService from "./slot.service";
import appError from "../../Errors/appError";
import getDateObjFromTime from "../../Utility/getDateObjFromTime";
import httpStatus from "http-status";
import sendResponse from "../../Utility/sendResponse";
import { roomModel } from "../Room/room.model";
import slotmodel from "./slot.model";
import mongoose from "mongoose";

// 1. create some sloots.
const CreateSomeSlots = catchAsync(async (req: Request, res: Response) => {
  const startTimeMils = getDateObjFromTime(req.body?.startTime)?.getTime();
  const endTimeMils = getDateObjFromTime(req.body?.endTime)?.getTime();

  //  validating is this room is available or not.
  const isRoomAvailable = await roomModel.findOne({
    _id: new mongoose.Types.ObjectId(req.body?.room),
    isDeleted: false,
  });
  if (!isRoomAvailable) throw new appError(400, "Invalid room id.");

  // validatin is the date for this room is available or not.
  const isDateAvailable = await slotmodel.findOne({
    room: new mongoose.Types.ObjectId(req.body?.room),
    date: req.body?.date,
  });

  if (isDateAvailable)
    throw new appError(400, "This room is already booked for this schedule.");

  // validate. is end time is gretter then the start time.
  if (endTimeMils < startTimeMils)
    throw new appError(400, "Start time should be earlyer from End time.");

  const data = await slootsService.createSomeSloots(req.body);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Slots created successfully",
  });
});

//2. get all available sloots.
const getAllAvailableSlot = catchAsync(async (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    const data = await slootsService.getAllAvailableSlots();
    if (data.length === 0) {
      const Empty: string[] = [];
      return sendResponse(res, {
        data: Empty,
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "No Data Found",
      });
    }
    return sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "Available slots retrieved successfully",
    });
  } else {
    const date = req.query?.date as string;
    const id = req.query?.roomId as string;

    const data = await slootsService.getAllAvailableSlotsWithDateAndId({
      date,
      id,
    });
    if (data.length === 0)
      return sendResponse(res, {
        success: false,
        statusCode: 200,
        message: "No Data Found",
        data: [],
      });
    return sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "Available slots retrieved successfully",
    });
  }
});

//3. delete a slot
const deleteASlot = catchAsync(async (req: Request, res: Response) => {
  const data = await slootsService.deleteASlot(req.params.id);

  return sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot Deleted Successfully",
  });
});

//4. update a slot.
const updateASlot = catchAsync(async (req: Request, res: Response) => {
  const data = await slootsService.updateASlot(req.params.id, req.body);

  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "Slot updated successfully",
  });
});

// export modules.
const slootsController = {
  CreateSomeSlots,
  getAllAvailableSlot,
  deleteASlot,
  updateASlot,
};
export default slootsController;
