import { z } from 'zod';

// MongoDB ObjectId pattern (24-character hex string)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const create = z.object({
  user: z.string().regex(objectIdPattern, "Invalid MongoDB Object ID for user"),  // Validates MongoDB Object ID format
  slot: z.string().regex(objectIdPattern, "Invalid MongoDB Object ID for slot"),  // Validates MongoDB Object ID format
  isDeleted: z.boolean().default(false),  // Defaults to false if not provided
  isConfirm: z.boolean().default(false)   // Defaults to false if not provided
});

const bookingValidation={create}
export default bookingValidation
