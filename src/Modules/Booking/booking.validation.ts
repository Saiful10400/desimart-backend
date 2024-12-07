import { z } from "zod";



// regular expressions.
const objectIdRegex = /^[a-f\d]{24}$/i;

const createSingleBooking=z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    slots:z.array(z.string().regex(objectIdRegex,{message:"Invalid MongoDB objectId."})),
    room:z.string().regex(objectIdRegex,{message:"Invalid MongoDB objectId."}),
    user:z.string().regex(objectIdRegex,{message:"Invalid MongoDB objectId."})
})

const updateASingleBooking=z.object({
    isConfirmed:z.enum(["confirmed","unconfirmed"])
})



const bookingValidation={createSingleBooking,updateASingleBooking}
export default bookingValidation