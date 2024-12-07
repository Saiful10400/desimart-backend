import { NextFunction, Request, Response } from "express"
import catchAsync from "../Utility/catchAsync"
import appError from "../Errors/appError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { signupModel } from "../Modules/Authentication/authentication.model"

const jwtChecker=(validRoles:string[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization

        // 1. checking if the token is available.
        if(!token) throw new appError(httpStatus.UNAUTHORIZED,"You are an unauthorized user!")

         // let's check the token.  

         const decodedToken=jwt.verify(token,config.jwtSecret as string) as JwtPayload
         const {id,role,iat}=decodedToken
         // * checking is this user validity in db.
         const user= await signupModel.findById(id)
         
         if(!user) throw new appError(httpStatus.NOT_FOUND,"This user is not found!")
        
         if(!validRoles.includes(role)) throw new appError(httpStatus.UNAUTHORIZED,"You are not authorized user!")

// next()





    })
}

export default jwtChecker