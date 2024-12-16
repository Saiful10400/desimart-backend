import { coupne, publishStatus } from "@prisma/client";
import prisma from "../../../config/prisma.config";
import { Request } from "express";
import appError from "../../../Errors/appError";
export interface Tshop {
  logo: string;
  name: string;
  vendorId: string;
  description: string;
}

export interface TproductCreate {
  description: string;
  image: string;
  name: string;
  inventoryCount: number;
  price: number;
  publishStatus: publishStatus;
  flashSale: string 
}



type TcreateProduct = {
  description: string;
  image: string;
  name: string;
  price: string; // assuming price is passed as a string, convert to number
  shopId: string; // assuming shopId is a string (UUID or similar)
  inventoryCount: string; // assuming inventoryCount is passed as a string, convert to number
  categoryId: string; // assuming categoryId is a string (UUID or similar)
  publishStatus: publishStatus; // assuming publishStatus is a boolean value
  flashSale: string; // "yes" or any other value
};


// create store.
const createStore = async (payload: Tshop) => {
  const result = await prisma.shop.create({
    data: {
      logo: payload.logo,
      name: payload.name,
      vendorId: payload.vendorId,
      description: payload.description,
    },
  });
  return result;
};

// update store.
const updateStore = async (payload: Request) => {
  if (payload?.query?.delete === "true") {
    const result = await prisma.$transaction(async (tnx) => {
      const deleteProduct = await tnx.product.deleteMany({
        where: {
          shopId: payload.params.id,
        },
      });
      const deleteStore = await tnx.shop.delete({
        where: {
          shopId: payload.params.id,
        },
      });
      return {
        deleteProduct,
        deleteStore,
      };
    });

    return {
      delete: true,
      message: "store deleted.",
      result,
    };
  }

  // lets update the procuct.
  let data: Partial<Tshop> = payload.body;

  if (data.logo === "undefined") {
    data = { name: data.name, description: data.description };
  }

  const result = await prisma.shop.update({
    where: {
      shopId: payload.params.id,
    },
    data: data,
  });

  return result;
};

// create product.
const createProduct = async (payload:TcreateProduct) => {
  const result = await prisma.product.create({
    data: {
      description: payload.description,
      image: payload.image,
      name: payload.name,
      price: Number(payload.price),
      shopId: payload.shopId,
      inventoryCount: Number(payload.inventoryCount),
      categoryId: payload.categoryId,
      publishStatus: payload.publishStatus,
      flashSale: payload.flashSale === "yes" ? true : false,
    },
  });

  return result;
};

// update product.
const updateProduct = async (payload: Request) => {
  if (payload?.query?.delete === "true") {
    const result = await prisma.product.update({
      where: {
        productId: payload.params?.id,
      },
      data: {
        isDeleted: true,
      },
    });
    return {
      delete: true,
      message: "product deleted.",
      result,
    };
  }
  if (payload?.query?.duplicate === "true") {
    const currentProduct = await prisma.product.findFirst({
      where: {
        productId: payload.params.id,
      },
    });

    if (!currentProduct) {
      throw new appError(401, "Your provided product doesn't exist.");
    }

    const result = await prisma.product.create({
      data: {
        description: currentProduct?.description,
        image: currentProduct?.image,
        name: currentProduct?.name,
        inventoryCount: currentProduct?.inventoryCount,
        price: currentProduct?.price,
        publishStatus: currentProduct?.publishStatus,
        shopId: currentProduct?.shopId,
        categoryId: currentProduct.categoryId,
        flashSale: currentProduct.flashSale,
      },
    });
    return {
      duplicate: true,
      message: "product duplicated.",
      result,
    };
  }

  // lets update the procuct.
  const data = payload.body;

  if (data.price) data.price = Number(data.price);
  if (data.inventoryCount) data.inventoryCount = Number(data.inventoryCount);
  if (data.flashSale) data.flashSale = data.flashSale === "yes" ? true : false 

  const result = await prisma.product.update({
    where: {
      productId: payload.params.id,
    },
    data: data,
  });

  return result;
};

// coupne
const createCoupne = async (payload: coupne) => {
  const result = await prisma.coupne.create({
    data: payload,
  });
  return result;
};

const updateCoupne = async (payload: Request) => {
  const result = await prisma.coupne.update({
    where: {
      coupneId: payload.params.id,
    },
    data: payload.body,
  });
  return { result, message: "coupne modified" };
};

const deleteCoupne = async (id: string) => {
  const result = await prisma.coupne.delete({
    where: {
      coupneId: id,
    },
  });
  return { result, message: "coupne deleted" };
};

const vendorService = {
  createStore,
  createProduct,
  updateProduct,
  updateStore,
  createCoupne,
  updateCoupne,
  deleteCoupne,
};
export default vendorService;
