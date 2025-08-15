import axios from "axios";
import config from "../config";

const getPaymentUrl = async (cost: number, orderId: string) => {
  const transectionId = `TNX-${orderId}`;
  const paymentObj = {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    cus_name: "Customer",
    cus_email: "Customer@g.com",
    cus_phone: "017400000",
    cus_add1: "Customer address(empty)",
    cus_add2: "",
    cus_city: "",
    cus_country: "",
    amount: cost,
    tran_id: transectionId,
    currency: "BDT",
    success_url: `${config.backend_url}/api/order/order-postProcess/${orderId}?transectonId=${transectionId}`,
    fail_url: `${config.backend_url}/api/order/order-postProcess/${orderId}?transectonId=${transectionId}`,
    cancel_url: `${config.frontend_url}`,
    desc: "Lend Money",
    type: "json",
  }; 
  const data = await axios.post(
    "https://sandbox.aamarpay.com/jsonpost.php",
    paymentObj
  );

  if (data.data.result) {
    return data.data.payment_url;
  }

  // if(!res.data.result){
  //   throw new appError(httpStatus.BAD_REQUEST, res.data.errors[0]);
  // }
};

export default getPaymentUrl;
