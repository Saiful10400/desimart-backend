import { z } from "zod";

// regular expressions.
const objectIdRegex = /^[a-f\d]{24}$/i;


const create= z.object({
    room: z.string().regex(objectIdRegex,{message:"Invalid MongoDB objectId."}),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format, should be HH:MM",
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Invalid time format, should be HH:MM",
    }) 
});

const update = z.object({
    room: z.string().regex(objectIdRegex, { message: "Invalid MongoDB objectId." }).optional(),
    date: z.string()
        .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" })
        .optional(),
    startTime: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format, should be HH:MM" })
        .optional(),
    endTime: z.string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format, should be HH:MM" })
        .optional()
});



const slotValidationSchema={create,update}

export default slotValidationSchema