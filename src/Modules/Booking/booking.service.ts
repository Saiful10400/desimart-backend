import mongoose from "mongoose";
import { Tbooking } from "./booking.interface";
import { bookingModel } from "./booking.model";
import slotmodel from "../Slot/slot.model";
import { roomModel } from "../Room/room.model";

//1.create a booking.
const createABooking=async(payload:Tbooking)=>{
 
    // update slots.
    await payload.slots.forEach(async(item)=>{
        await slotmodel.findByIdAndUpdate(item,{isBooked:true})
    })
const result=await (await (await (await bookingModel.create(payload)).populate("room")).populate({path:"user",select:"-password"})).populate("slots")


const plainObj=result?.toObject()
    delete plainObj?.id
    return plainObj
// return result
}


// 2. get all bookings.
const getAllBookings=async()=>{
    const result=await bookingModel.find().populate("slots").populate({path:"user",select:"-password"}).populate("room")
    return result?.map(item=>{
        const data=item.toObject()
        delete data.id
        return data
    })
}

//3. get a user booking.
const getAUserBooking=async(id:string)=>{
    const result=(await bookingModel.find({user:new mongoose.Types.ObjectId(id)}).populate("slots").populate("room").select("-user"))
    return result?.map(item=>{
        const data=item.toObject()
        delete data.id
        return data
    })
}

//4. update a booking.
const updateABooking=async(id:string,data:object)=>{
    const result =await bookingModel.findByIdAndUpdate(id,data,{new:true})

    // get room per slot cost.
    const room=await roomModel.findById(result?.room)
   const perslot=room?.pricePerSlot
   const totalSlot=result?.slots?.length

     const newResult =result?.toObject()
     newResult.totalAmount=perslot*totalSlot
   delete newResult.id
     return newResult
}

//5. delete a booking.
const deleteABooking=async(id:string)=>{
    const result=await bookingModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{isDeleted:true},{new:true})

    
    // get room per slot cost.
    const room=await roomModel.findById(result?.room)
   const perslot=room?.pricePerSlot
   const totalSlot=result?.slots?.length

     const newResult =result?.toObject()
     newResult.totalAmount=perslot*totalSlot
   delete newResult.id
     return newResult
}

const bookingService={createABooking,getAllBookings,getAUserBooking,updateABooking,deleteABooking}
export default bookingService