import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import paymentservice from "./payment.service";
import myBookingService from "../MyBookings/Booking.service";
import httpStatus from "http-status";
import path from "path";
import fs from "fs";
import varifyPayment from "../../Utility/varifyPayment";

//1. generate payment url.
const payWithBookingId = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;

  // checking is thsi payed or not.

  const paymentStatus = await myBookingService.getAbooking(bookingId);

  if (paymentStatus?.isPaid) {
    const data = {};
    return sendResponse(res, {
      data,
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "You already paid for this booking.",
    });
  }

  const data = await paymentservice.paywithBookingId(bookingId);
  sendResponse(res, {
    data,
    success: true,
    statusCode: httpStatus.OK,
    message: "payment url generated.",
  });
});


//2. payment after redirection process.
const paymentStatus = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const tnxId = req.query.transectonId;
  const paymentStatus = await varifyPayment(tnxId as string);
  console.log(tnxId, bookingId, paymentStatus);

  // update payment status info into db.
  if (paymentStatus.pay_status === "Successful") {
    const updatePaymentToDb = await paymentservice.updateAbookingPaymentStatus(
      bookingId,
      tnxId
    );
  } else{
    const updateFailedStatus=await paymentservice.updateFailedStatus(bookingId)
  }

  const absolutePath = path.join(__dirname, "../../../public/index.html");
  let file = fs.readFileSync(absolutePath, "utf-8");
  file = file.replace("{{message}}", bookingId);
  res.send(file);
});



const paymentController = { payWithBookingId, paymentStatus };
export default paymentController;
