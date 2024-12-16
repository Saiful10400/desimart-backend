import { Response, Request, NextFunction } from "express";
import catchAsync from "../Utility/catchAsync";
import appError from "../Errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { roles, status } from "@prisma/client";
import prisma from "../config/prisma.config";


export type TRequest = Request & { user?: {
  userId: string,
  email:string , 
  password:string ,
  role:string ,
  status:string 
}  }; 


const auth = (userRole: roles[]) => {
  return catchAsync(
    async (req: TRequest, res: Response, next: NextFunction) => {
     
      const token = req.headers.authorization
    

      // cheking if the token is available or not.
      if (!token)
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!(no token)");

      // cheking if the token is valid
      const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload &{role:roles,email:string,status:status};

  
 
      if (!decoded?.role) 
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!(token modefied)");
      

      // cheking if the user is available in db.
      const user = await prisma.user.findFirst({
        where:{
          email:decoded.email,
          role:decoded.role,
          status:decoded.status
        }
      });
 
  

      if (!user)
        throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!(user account not found)");

      if (!userRole.includes(user?.role) && userRole)
         res.send({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });

      req.user = user
      next();
    }
  );
};

export default auth;
