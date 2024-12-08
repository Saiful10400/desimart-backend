import httpStatus from "http-status";
import sendResponse from "../../../Utility/sendResponse";



const chagePassword = catchAsync(async (req: Request, res: Response) => {
  const data = await AuthenticationService.login(req.body);
  


 
  sendResponse(res, {
    data,
    statusCode: httpStatus.OK,
    message: "password chaged successfully",
    success: true,
  });
});




const buyerController={

}

export default buyerController