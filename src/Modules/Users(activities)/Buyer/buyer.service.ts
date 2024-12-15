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



const buyerService = {
  addRecent,
  getRecent,
  postReview
};
export default buyerService;
