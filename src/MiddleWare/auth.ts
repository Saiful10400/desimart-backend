import { Response, Request, NextFunction } from "express";
import userRole from "../Modules/Authentication/user.constain";
import catchAsync from "../Utility/catchAsync";
import appError from "../Errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { signupModel } from "../Modules/Authentication/authentication.model";

export type TRequest = Request & { userId?: string };

type Tuser = keyof typeof userRole;
const auth = (userRole: Tuser[]) => {
  return catchAsync(
    async (req: TRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization
      

      // cheking if the token is available or not.
      if (!token)
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!");

      // cheking if the token is valid
      const decoded = jwt.verify(
        token as string, 
        config.jwtSecret as string
      ) as JwtPayload;
      if (!decoded?.id) 
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      const { id } = decoded;

      // cheking if the user is available in db.
      const user = await signupModel.isUserExixtById(id);

      if (!user)
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!");

      if (!userRole.includes(user?.role) && userRole)
        return res.send({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });

      req.userId = id;
      next();
    }
  );
};

export default auth;
