import prisma from "../../../config/prisma.config";
import { Request } from "express";
export interface Tshop {
  logo: string;
  name: string;
  vendorId: string;
}

export interface TproductCreate{
    description:string,
    image:string,
    name:string,
    inventoryCount:number,
    price:number,
    shopId:string,
    categoryId:string
}

// create store.
const createStore = async (payload: Tshop) => {
  const result = await prisma.shop.create({
    data: {
      logo: payload.logo,
      name: payload.name,
      vendorId: payload.vendorId,
    },
  });
  return result;
};

// create product.
const createProduct=async(payload:TproductCreate)=>{
    const result=await prisma.product.create({
        data:{
            description:payload.description,
            image:payload.image,
            name:payload.name,
            price:payload.price,
            shopId:payload.shopId,
            inventoryCount:payload.inventoryCount,
            categoryId:payload.categoryId
        } 
    })

    return result

}

// update product.
const updateProduct=async(payload:Request)=>{
  
  if(payload.query.delete==="true"){
    const result=await prisma.product.delete({
      where:{
        productId:payload.params?.id
      }                                                    
    })
    return {
      delete:true,
      message:"product deleted.",
      result
    }
  }

  // lets update the procuct.
  const data:Partial<TproductCreate> =payload.body
  
  const result=await prisma.product.update({
    where:{
      productId:payload.params.id
    },
    data:data
  })

  return result

}

const vendorService = {
  createStore,
  createProduct,
  updateProduct
};
export default vendorService;
