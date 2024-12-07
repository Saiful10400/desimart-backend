import mongoose from "mongoose";
import { Tbooking } from "./Booking.interface";
import MybookingModel from "./Booking.model";
import slotmodel from "../Slot/slot.model";

//1. create a new booking.
const       createOne=async(paylod:Tbooking)=>{
    const result=await MybookingModel.create(paylod)
    return result
}

//2. get a booking.
const getAbooking=async(id:string)=>{

    const result=await MybookingModel.findById(id).populate({path:"slot",populate:{path:"room"}}).populate("user")
    return result
}

// 3. get a specific user all booking.
const getAuserAllBooking=async(id:string)=>{
    const result=await MybookingModel.find({user:new mongoose.Types.ObjectId(id),isPaid:true}).populate({path:"slot",populate:{path:"room"}}).populate("user")
    return result
}
// 4. get a specific user all booking.
const getAllForAdminDashboard=async()=>{
    const result=await MybookingModel.find({isDeleted:false,isPaid:true}).populate({path:"slot",populate:{path:"room"}}).populate("user")
    return result
}
// 5. get a specific user all booking.
const deleteOne=async(id:string)=>{
    const result=await MybookingModel.findByIdAndUpdate(id,{isDeleted:true})
    return result
}
// 6. get a specific user all booking.
const confirmOne=async(id:string,action:string)=>{

    if(action==="Confirmed"){
        const status="Confirmed"


        // get the slot id.
        const booking=await MybookingModel.findById(id)
        
        // update the slot.
        const slot=await slotmodel.findByIdAndUpdate(booking?.slot,{isBooked:true})
       

        const result=await MybookingModel.findByIdAndUpdate(id,{isConfirm:true,status})
        return result
    }
    else{
        const status="Unconfirmed"
        const result=await MybookingModel.findByIdAndUpdate(id,{isConfirm:true,status})
        return result
    }
    
   
}




const myBookingService={createOne,getAbooking,getAuserAllBooking,getAllForAdminDashboard,deleteOne,confirmOne}
export default myBookingService