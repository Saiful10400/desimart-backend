import axios from "axios";
import appError from "../Errors/appError";
import httpStatus from "http-status";

const getPaymentUrl = async (user,room,bookngId) => {
  const transectionId=`TNX-${Date.now()}-${user.phone}`
  const paymentObj = {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    cus_name: user.name,
    cus_email: user.email,
    cus_phone: user.phone,
    cus_add1: user.address,
    cus_add2: "",
    cus_city: "",
    cus_country: "",
    amount: room.pricePerSlot,
    tran_id: transectionId,
    currency: "USD",
    success_url: `${process.env.BACK_END_URL}/api/pay/status/${bookngId}?transectonId=${transectionId}`,
    fail_url: `${process.env.BACK_END_URL}/api/pay/status/${bookngId}?transectonId=${transectionId}`,
    cancel_url: process.env.FRONT_END_URL,
    desc: "Lend Money",
    type: "json",
  };
const data=await axios.post("https://sandbox.aamarpay.com/jsonpost.php",paymentObj)

if(data.data.result){
  return data.data.payment_url
}


  // if(!res.data.result){
  //   throw new appError(httpStatus.BAD_REQUEST, res.data.errors[0]);
  // }

};

export default getPaymentUrl;
