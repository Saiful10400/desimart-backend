import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import { Request,Response } from "express";
import orderService from "./order.service";
import httpStatus from "http-status";
import varifyPayment from "../../Utility/varifyPayment";
import path from "path";
import fs from "fs";
// create order
const createOrder=catchAsync(async (req: Request, res: Response) => {
    const data = await orderService.createOrder(req);
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: "orderId genereated successfully",
      success: true,
    });
  });



const createPaymentLInk=catchAsync(async (req: Request, res: Response) => {
    const data = await orderService.createPaymentLInk(req);
 
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: "Linke created",
      success: true,
    });
  });


const orderPostProcess=catchAsync(async (req: Request, res: Response) => {
   
    const orderId = req.params.id;
    const tnxId = req.query.transectonId;
    const paymentStatus = await varifyPayment(tnxId as string);


    if (paymentStatus.pay_status === "Successful") {
     await orderService.updatePaymentStatus({success:true, transectionId:tnxId,orderId})
    } else{
      await orderService.updatePaymentStatus({success:false, transectionId:tnxId,orderId})
    }

    const absolutePath = path.join(__dirname, "../../../public/index.html");
    let file = fs.readFileSync(absolutePath, "utf-8");
    file = file.replace("{{message}}", `${orderId}?success=${paymentStatus.pay_status === "Successful"?true:false}`);
    res.send(file);
 
  
    
  });


  const getAllOrders=catchAsync(async (req: Request, res: Response) => {
    const data = await orderService.getallorders(req);
 
  
    sendResponse(res, {
      data,
      statusCode: httpStatus.OK,
      message: "Orders fetched.",
      success: true,
    });
  });


  const orderController={
    createOrder,
    createPaymentLInk,
    orderPostProcess,
    getAllOrders
  }
  
  export default orderController