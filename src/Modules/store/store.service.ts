import { shopUser } from "@prisma/client"
import prisma from "../../config/prisma.config"

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



const storeService={
    manageFollow
}


export default storeService