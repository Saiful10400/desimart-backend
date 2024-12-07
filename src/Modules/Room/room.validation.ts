import { z } from "zod";

const createSingleroom=z.object({
    name: z.string().min(1, { message: 'Name must not be empty' }),
    roomNo: z.number().int().min(1, { message: 'Room number must be a positive integer' }),
    floorNo: z.number().int().min(1, { message: 'Floor number must be a positive integer' }),
    capacity: z.number().int().min(1, { message: 'Capacity must be a positive integer' }),
    pricePerSlot: z.number().int().min(1, { message: 'Price per slot must be a positive integer' }),
    amenities: z.array(z.string()).min(1, { message: 'Amenities list must not be empty' }),
    roomImages: z.array(z.string()).min(1, { message: 'room images list must not be empty' })
})

const updateSingleroom=z.object({
    name: z.string().min(1, { message: 'Name must not be empty' }).optional(),
    roomNo: z.number().int().min(1, { message: 'Room number must be a positive integer' }).optional(),
    floorNo: z.number().int().min(1, { message: 'Floor number must be a positive integer' }).optional(),
    capacity: z.number().int().min(1, { message: 'Capacity must be a positive integer' }).optional(),
    pricePerSlot: z.number().int().min(1, { message: 'Price per slot must be a positive integer' }).optional(),
    amenities: z.array(z.string()).min(1, { message: 'Amenities list must not be empty' }).optional(),
    roomImages: z.array(z.string()).min(1, { message: 'rom image list must not be empty' }).optional(),
})




const roomValidationSchema={createSingleroom,updateSingleroom}
export default roomValidationSchema