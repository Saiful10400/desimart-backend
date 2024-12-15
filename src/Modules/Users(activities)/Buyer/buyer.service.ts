import { recentProducts } from "@prisma/client";
import prisma from "../../../config/prisma.config";
import { Request } from "express";
// add recent
const addRecent = async (payload: recentProducts) => {
 
  // payload.userId
  const result = await prisma.recentProducts.create({
    data: payload,
  });

  return result;
};

const getRecent = async (id: string) => {
  const result = await prisma.recentProducts.findMany({
    where: {
      userId: id,
    },
    take: 10,
    orderBy:{
      created:"desc"
    },

select:{
  product:{
    select:{
      image:true,
      name:true,
      productId:true,
      categoryref:{
        select:{
          name:true
        }
      },
      description:true,
      flashSale:true,
      inventoryCount:true,
      price:true,
      _count:{select:{
        review:true
      }},
      created:true,
      shop:{select:{name:true,logo:true,shopId:true}}
    }
  }
}




  });
  return result;
};




// post reveiw.

const postReview=async(payload:Request)=>{
  
  const result=await prisma.review.create({
    data:payload.body
  })

  return result
}


const answerReview=async(payload:Request)=>{

  const result=await prisma.review.update({
    where:{
      reviewId:payload.params.id
    },
    data:{
      vendorMessage:payload.body.message
    }
  })

  return result

}



const getAllReview=async(id)=>{
  const result=await prisma.review.findMany({
    where:{
      product:{
        shopId:id
      }
    }
  })
  return result
}

const buyerService = {
  addRecent,
  answerReview,
  getRecent,
  postReview,
  getAllReview
};
export default buyerService;
