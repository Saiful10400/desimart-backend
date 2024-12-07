import getPaymentUrl from "../../Utility/getPaymentUrl"
import MybookingModel from "../MyBookings/Booking.model"
import myBookingService from "../MyBookings/Booking.service"

const paywithBookingId=async(payload)=>{
    const booking=await myBookingService.getAbooking(payload)
    const bookingUrl=await getPaymentUrl(booking?.user,booking?.slot?.room,payload) 
    return bookingUrl
}

//2. update a pyment status.
const updateAbookingPaymentStatus=async(id,tnxId)=>{
    const result=await MybookingModel.findByIdAndUpdate(id,{tnxId,isPaid:true,isFailed:false})
    return result
}

//3. update failed status.
const updateFailedStatus=async(id)=>{
    const result=await MybookingModel.findByIdAndUpdate(id,{isFailed:true})
    return result
}

const paymentservice={paywithBookingId,updateAbookingPaymentStatus,updateFailedStatus}

export default paymentservice   