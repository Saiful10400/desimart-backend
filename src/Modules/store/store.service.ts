import { shopUser } from "@prisma/client"
import prisma from "../../config/prisma.config"
import { Request } from "express"

const manageFollow=async(payload:shopUser)=>{
     

// find follow
const isExist=await prisma.shopUser.findFirst({
    where:payload
})

if(isExist){
    const result=await prisma.shopUser.delete({
        where:{
            userId_shopId:payload
        }
    })
    return{
        unfollow:true,
        message:"unfollowed",
        result
    }
}

const result=await prisma.shopUser.create({
    data:payload
})

return{
    follow:true,
    message:"followed",
    result
}

}

const checkCoupon=async(payload:Request)=>{
    const result=prisma.coupne.findFirst({
        where:{
            shopId:payload.params.id,
            code:payload.body.code
        }
    })

    return result
}



const storeService={
    manageFollow,
    checkCoupon
}


export default storeService