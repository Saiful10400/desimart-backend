import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import roomService from "./room.service";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import appError from "../../Errors/appError";

//1. create a room.
const createSingleRoom=catchAsync(async (req:Request,res:Response)=>{
  
    const data=await roomService.createSingleRoom(req.body)
    sendResponse(res,{data,success:true,statusCode:httpStatus.OK,message:"Room added successfully"})
    
})

//2. get room.
const getRoom=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    const data=await roomService.getRoom(id)
 
    if(!data){
        const Empty:string[]=[]
      return  sendResponse(res,{data:Empty,success:false,statusCode:httpStatus.NOT_FOUND,message:"No Data Found"})
    }
    const message=id?"Room retrieved successfully":"Rooms retrieved successfully"
    sendResponse(res,{data,success:true,statusCode:httpStatus.OK,message})

})

//2.1 get all rooms.
const getAllRooms=catchAsync(async(req:Request,res:Response)=>{
    
    const data=await roomService.getAllRooms()
    if(data.length===0){
        const Empty:string[]=[]
      return  sendResponse(res,{data:Empty,success:false,statusCode:httpStatus.OK,message:"No Data Found"})
    }
    const message="Rooms retrieved successfully"
    sendResponse(res,{data,success:true,statusCode:httpStatus.OK,message})

})

//3. deleteSingleRoom.
const deleteSingleRoom=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    if(!id) throw new appError(httpStatus.BAD_REQUEST,"You have to provide a valid id")
    const data=await roomService.deleteSingleRoom(id)

    if(!data) throw new appError(httpStatus.NOT_FOUND,"Room id is not valid.")
    sendResponse(res,{data,success:true,statusCode:httpStatus.OK,message:"Room deleted successfully"})
})

//4. update single Room.
const updateSingleRoom=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params
    if(!id) throw new appError(httpStatus.BAD_REQUEST,"You have to provide a valid id")
   const data=await roomService.updateSingleRoom(id,req.body)
sendResponse(res,{data,message:"Room updated successfully",statusCode:httpStatus.OK,success:true})
})

const roomController={createSingleRoom,updateSingleRoom,getRoom,deleteSingleRoom,getAllRooms}
export default roomController