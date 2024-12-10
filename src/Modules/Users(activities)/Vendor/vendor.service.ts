import { coupne, publishStatus } from "@prisma/client";
import prisma from "../../../config/prisma.config";
import { Request } from "express";
export interface Tshop {
  logo: string;
  name: string;
  vendorId: string;
}

export interface TproductCreate {
  description: string;
  image: string;
  name: string;
  inventoryCount: number;
  price: number;
  shopId: string;
  categoryId: string;
  publishStatus:publishStatus
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

// update store.
const updateStore = async (payload: Request) => {
  if (payload?.query?.delete === "true") {
    
const result=await prisma.$transaction(async(tnx)=>{
  const deleteProduct=await tnx.product.deleteMany({
    where:{
      shopId:payload.params.id
    }
  })
  const deleteStore=await tnx.shop.delete({
    where:{
      shopId:payload.params.id
    }
  })
  return{
    deleteProduct,deleteStore
  }
})


    return {
      delete: true,
      message: "store deleted.",
      result,
    };
  }

  // lets update the procuct.
  const data: Partial<Tshop> = payload.body;

  const result = await prisma.shop.update({
    where: {
      shopId: payload.params.id,
    },
    data: data,
  });

  return result;
};

// create product.
const createProduct = async (payload: TproductCreate) => {
  const result = await prisma.product.create({
    data: {
      description: payload.description,
      image: payload.image,
      name: payload.name,
      price: payload.price,
      shopId: payload.shopId,
      inventoryCount: payload.inventoryCount,
      categoryId: payload.categoryId,
      publishStatus:payload.publishStatus
    },
  });

  return result;
};

// update product.
const updateProduct = async (payload: Request) => {
  if (payload?.query?.delete === "true") {
    const result = await prisma.product.delete({
      where: {
        productId: payload.params?.id,
      },
    });
    return {
      delete: true,
      message: "product deleted.",
      result,
    };
  }

  // lets update the procuct.
  const data: Partial<TproductCreate> = payload.body;

  const result = await prisma.product.update({
    where: {
      productId: payload.params.id,
    },
    data: data,
  });

  return result;
};


// coupne
const createCoupne=async(payload:coupne)=>{
  const result=await prisma.coupne.create({
    data:payload
  })
  return result
}

const updateCoupne=async(payload:Request)=>{

  const result=await prisma.coupne.update({
    where:{
      coupneId:payload.params.id
    },
    data:payload.body
  })
  return {result,message:"coupne modified"}
}

const deleteCoupne=async(id:string)=>{
  const result=await prisma.coupne.delete({
    where:{
      coupneId:id
    }
  })
  return {result,message:"coupne deleted"}
}

const vendorService = {
  createStore,
  createProduct,
  updateProduct,
  updateStore,
  createCoupne,
  updateCoupne,deleteCoupne,
};
export default vendorService;
