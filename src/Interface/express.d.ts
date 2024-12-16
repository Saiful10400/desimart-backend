import { UploadApiResponse } from "cloudinary";
import "express";

declare global {
  namespace Express {
    interface Request {
        user?: {
            userId: string;
            email: string;
            password: string;
            role: string;
            status: string;
        };
      cloudinaryResult?: UploadApiResponse;
    }
  }
}