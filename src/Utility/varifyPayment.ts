const varifyPayment=async(tnxId:string)=>{

   const url=`https://sandbox.aamarpay.com/api/v1/trxcheck/request.php?request_id=${tnxId}&store_id=${process.env.STORE_ID}&signature_key=${process.env.SIGNATURE_KEY}&type=json`

   const response=await fetch(url)
   return response.json()

}



export default varifyPayment