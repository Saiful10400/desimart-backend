import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import fs from "fs";
cloudinary.config({
  cloud_name: config.clowd_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const liveUrlSetter = (fildName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return next();
      }

      const upload = await cloudinary.uploader.upload(req.file.path);
      if (upload.secure_url) {
        req.body[fildName] = upload.secure_url;
        // delete the file.
        fs.unlink(req.file.path, (unlinkError) => {
          if (unlinkError) {
            next(unlinkError);
          }
        });
        next();
      }
    } catch (err) {
      next(err);
    }
  };
};

export default liveUrlSetter;
