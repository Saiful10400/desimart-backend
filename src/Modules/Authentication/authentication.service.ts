import httpStatus from "http-status";
import appError from "../../Errors/appError";
import prisma from "../../config/prisma.config";
import { Tuser } from "./authentication.type";
import config from "../../config";
import jwt from "jsonwebtoken"
import sendMail from "../../Utility/sendMail";
// 1. signup.
const signup = async (payload: Tuser) => {
  console.log(payload);
  // let's check is the same user is exixt or not.
  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (isUserExist)
    throw new appError(httpStatus.CONFLICT, "This email address already used!");

  // use transection for insertion.
  const result = await prisma.$transaction(async (tnx) => {
    const createUser = await tnx.user.create({
      data: {
        email: payload.email,
        role: payload.role,
        password: payload.password,
      },
    });

    // create other secondary users.
    let profile;
    if (createUser.role === "Admin") {
      profile = await tnx.admin.create({
        data: {
          email: payload.email,
          name: payload.name,
          photo: payload.photo,
          userId: createUser.userId,
        },
      });
    }
    if (createUser.role === "User") {
      profile = await tnx.buyer.create({
        data: {
          email: payload.email,
          name: payload.name,
          photo: payload.photo,
          userId: createUser.userId,
        },
      });
    }
    if (createUser.role === "Vendor") {
      profile = await tnx.vendor.create({
        data: {
          email: payload.email,
          name: payload.name,
          photo: payload.photo,
          userId: createUser.userId,
        },
      });
    }

    return { createUser, profile };
  });
  return result;
};

// 2. login.
const login = async (payload: { email: string; password: string }) => {
  const data = await prisma.user.findFirst({
    where: {
      password: payload.password,
      email: payload.email,
    },
  });

  if (!data)
    throw new appError(httpStatus.UNAUTHORIZED, "Incorrect email or password!");

  // create jwt token.
  const jwtPayload = {
    id: data.userId,
    role: data.role,
  };
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwtSecret as string,
    {
      expiresIn: config.accessTokenLife,
    }
  );

  return { data, accessToken };
};

//2. getucrrentuser.
// const getCurrentUser = async (payload:string) => {
//   const result=await signupModel.findById(payload)
//   return result

// };

// 3. change pasword.

const changePassword=async(payload:{newPassword:string,oldPassword:string,email:string})=>{

  await prisma.user.findFirstOrThrow({
    where:{
      email:payload.email,
      password:payload.oldPassword
    }
  })
await prisma.user.updateMany({
  where:{
    password:payload.oldPassword,
    email:payload.email
  },
  data:{
    password:payload.newPassword
  }
})
 const reult= await prisma.user.findFirst({
  where:{
    password:payload.newPassword,
    email:payload.email
  }
})
return reult


}


//  4. reset password.

const resetPassword=async(payload:{email:string})=>{

  await prisma.user.findFirstOrThrow({
    where:{
      email:payload.email
    }
  })


  const token=jwt.sign(payload,(config.jwtSecret as string),{expiresIn:"5m"})
  const result=`${config.frontend_url}/reset-password?token=${token}`
  console.log(result)
  return sendMail(result,payload.email)
}

//  5. reset new password.
const resetNewPassword=async(payload:{newPassword:string,email:string|undefined})=>{
  const result=await prisma.user.updateMany({
    where:{
      email:payload.email,
    },
    data:{
      password:payload.newPassword
    }
  })
  return result
}

const AuthenticationService = {
  signup,
  login,
  changePassword,
  resetPassword,
  resetNewPassword
  // getCurrentUser
};

export default AuthenticationService;
