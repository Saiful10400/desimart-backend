// get users (not admin)

import { Prisma, roles } from "@prisma/client";
import prisma from "../../config/prisma.config";
import { Request } from "express";
import { TpaginationPayload } from "../Users(activities)/Admin/admin.service";

const getUsers = async (offset: number = 10, limit: number) => {
  const count = await prisma.user.count({
    where: {
      role: {
        not: roles.Admin,
      },
    },
  });

  const condition: Prisma.userFindManyArgs = {
    where: {
      role: {
        not: roles.Admin,
      },
      isDeleted: false,
    },
    orderBy: {
      userId: "asc",
    },
    take: Number(limit) || 10,
    skip: Number(offset) || 0,
    select: {
      buyer: true,
      vendor: true,
      role: true,
      email: true,
      userId: true,
      status: true,
      created:true
    },
  };
  // if ((limit || limit === 0) && (offset || offset === 0)) {
  //   condition = { ...condition, take: 2, skip: 0 };
  // }
  
  const result = await prisma.user.findMany(condition);

  return { total: count, result };
};

const getShop = async (offset: number, limit: number) => {
  const count = await prisma.shop.count();

  let condition: Prisma.shopFindManyArgs = {};
  if ((limit || limit === 0) && (offset || offset === 0)) {
    condition = { ...condition, skip: offset, take: limit };
  }
  const result = await prisma.shop.findMany(condition);

  return { total: count, result };
};

const getSingleShop = async (id: string) => {
  const result = await prisma.shop.findUniqueOrThrow({
    where: {
      shopId: id,
    },
    select: {
      coupne: true,
      logo: true,
      name: true,
      shopId: true,
      description: true,
      followersId: true,
      _count: {
        select: {
          followersId: true,
        },
      },
      status: true,

      vendor: {
        select: {
          name: true,
          email: true,
          photo: true,
        },
      },
    },
  });
  return result;
};

const getCatetory = async (payload: Partial<TpaginationPayload>) => {
  const condition: Prisma.categoryFindManyArgs = {
    orderBy: { created: "desc" },
    select:{
      _count:{select:{productId:true}},
      categoryId:true,
      logo:true,
      name:true,
      slug:true,
      created:true,
      updated:true
    }
  };

  // pagination
  if (
    (payload.limit || payload.limit === 0) &&
    (payload.offset || payload.offset === 0)
  ) {
    condition.skip = Number(payload.offset);
    condition.take = Number(payload.limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, offset, ...rest } = payload;

    if (Object.keys(rest).length === 0) {
      condition.where = {};
    }
  }

  const result = await prisma.category.findMany({ ...condition });
  const total = await prisma.category.count();
  return { result, total };
};

interface TgetProduct {
  search: string;
  offset: number;
  limit: number;
  min: number;
  max: number;
  category: string;
  flashSale: string;
  not: string;
  shopFollower: string;
  exactTotal: "true" | "false";
}

const getProducts = async (payload: Partial<TgetProduct>) => {
  let condition: Prisma.productFindManyArgs = {
    where: {
      AND: [{ shop: { status: "Active" } }],
    },
    select: {
      image: true,
      name: true,
      productId: true,
      slug:true,
      updated:true,
      categoryref: {
        select: {
          name: true,
        },
      },
      description: true,
      flashSale: true,
      inventoryCount: true,
      price: true,
    discount:true,
      brand:{
        select:{
          name:true,
          logo:true,
          brandId:true,
          slug:true,
        }
      },
      _count: {
        select: {
          review: true,
        },
      },
      created: true,
      shop: { select: { name: true, logo: true, shopId: true } },
    },
  };

  if (Object.keys(payload).length === 0) {
    condition = { select: condition.select };
  }

  // pagination
  if (
    (payload.limit || payload.limit === 0) &&
    (payload.offset || payload.offset === 0)
  ) {
    condition.skip = Number(payload.offset);
    condition.take = Number(payload.limit);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, offset, ...rest } = payload;

    if (Object.keys(rest).length === 0) {
      condition.where = { shop: { status: "Active" } };
    }
  }

  // category
  if (payload.category) {
    (condition.where as { AND: { categoryref: { name: string } }[] }).AND.push({
      categoryref: {
        name: payload.category,
      },
    });
  }

  // without this id.
  if (payload.not) {
    (condition.where as { AND: unknown[] }).AND.push({
      productId: { not: payload.not },
    });
  }

  //   // without this id.
  //   if (payload.shopFollower) {
  //     // (condition.where as {AND:unknown[]}).AND.push({productId:{not:payload.not}});

  //     const followingShopQuery=await prisma.shopUser.findMany({
  //       where:{
  //         userId:payload.shopFollower
  //       },
  //       select:{shopId:true}
  //     })

  //     if(followingShopQuery.length>0){

  // const followingShop=followingShopQuery.map(item=>item.shopId)

  // orderQuery=[{
  //   shopId: {
  //     in: followingShop,
  //   },
  // },...orderQuery]

  //   }

  // console.log(orderQuery)

  //   }

  // flash sale
  if (payload.flashSale) {
    (condition.where as { AND: { flashSale: boolean }[] }).AND.push({
      flashSale: payload.flashSale === "true" ? true : false,
    });
  }

  // search
  if (payload.search) {
    (condition.where as { AND: { OR: unknown[] }[] }).AND?.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: payload.search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // price range.
  if (
    (payload.min || payload.min === 0) &&
    (payload.max || payload.max === 0)
  ) {
    (condition.where as { AND: { AND: unknown[] }[] }).AND?.push({
      AND: [
        {
          price: {
            gte: Number(payload.min),
          },
        },
        {
          price: {
            lte: Number(payload.max),
          },
        },
      ],
    });
  }

  const result = await prisma.product.findMany({
    ...condition,
    orderBy: { created: "desc" },
  });
  let count;

  if (payload.exactTotal === "true") {
    count = await prisma.product.count({ where: { ...condition.where } });
  } else {
    count = await prisma.product.count({
      where: { shop: { status: "Active" } },
    });
  }

  return { total: count, result };
};

const getSingleProduct = async (slug: string) => {
  const result = await prisma.product.findFirstOrThrow({
    where: {
      slug: slug,
    },
    select: {
      image: true,
      name: true,
      productId: true,
      categoryref: {
        select: {
          name: true,
        },
      },
      description: true,
      flashSale: true,
      inventoryCount: true,
      price: true,
      review: true,
      _count: {
        select: {
          review: true,
        },
      },
      created: true,
      shop: { select: { name: true, logo: true, shopId: true } },
    },
  });
  return result;
};

const getStoreAllProducts = async (payload: Request) => {
  const result = await prisma.product.findMany({
    where: {
      shopId: payload.params.id,
      isDeleted: false,
    },
    select: {
      categoryref: {
        select: { name: true },
      },
      image: true,
      description: true,
      name: true,
      price: true,
      discount:true,
      publishStatus: true,
      review: true,
      inventoryCount: true,
      categoryId: true,
      productId: true,
      shopId: true,
      flashSale: true,
      created:true,
      updated:true
    },
    skip: Number(payload.query.offset),
    take: Number(payload.query.limit),
    orderBy: {
      created: "desc",
    },
  });
  const total = await prisma.product.count({
    where: {
      shopId: payload.params.id,
      isDeleted: false,
    },
  });
  return { result, total };
};

const followingProduct = async (payload: Request) => {
  const followingShop = payload.body;

  const idarray: string[] = [];
  followingShop?.followingStore?.map((item: { shopId: string }) =>
    idarray.push(item.shopId)
  );

  const result = prisma.product.findMany({
    where: {
      shopId: {
        in: idarray,
      },
    },
    select: {
      categoryref: {
        select: { name: true },
      },
      image: true,
      description: true,
      name: true,
      price: true,
      publishStatus: true,
      review: true,
      inventoryCount: true,
      categoryId: true,
      productId: true,
      shopId: true,
      flashSale: true,
    },
  });
  return result;
};

interface tProductSearchPayload {
  searchText: string | undefined;
  brand: string | undefined;
  category: string | undefined;
  priceRange: string | undefined;
  shop: string | undefined;
  flashSale: string | undefined;
}


const searchProduct = async (offset: number, limit: number,searchPayload:Partial<tProductSearchPayload>) => {
  const count = await prisma.shop.count();
const whereCondition:Prisma.productWhereInput={}
const andCondition:Prisma.productWhereInput[]=[]

  let condition: Prisma.productFindManyArgs = {where:whereCondition };
  if ((limit || limit === 0) && (offset || offset === 0)) {
    condition = { ...condition, skip: offset, take: limit};
  }
  

  // applying condition according to search payload.

  if(searchPayload.searchText){
const condition1:Prisma.productWhereInput={description:{contains:searchPayload.searchText,mode:"insensitive"}}
const condition2:Prisma.productWhereInput={name:{contains:searchPayload.searchText,mode:"insensitive"}}
andCondition.push({OR:[condition1,condition2]})
  }  
 
  if(searchPayload.brand){
    const brands=searchPayload.brand.split(",")
    const queryConditons:Prisma.brandWhereInput[]=brands.map((text) => ({name: {
      contains: text,
      mode: 'insensitive',  
    }}))
    andCondition.push({brand:{OR:queryConditons}})
    
  }
  
  if(searchPayload.category){
    const brands=searchPayload.category.split(",")
    const queryConditons:Prisma.categoryWhereInput[]=brands.map((text) => ({name: {
      contains: text,
      mode: 'insensitive',  
    }}))
   andCondition.push({categoryref:{OR:queryConditons}})
    
  } 

  if(searchPayload.shop){
    const brands=searchPayload.shop.split(",")
    const queryConditons:Prisma.shopWhereInput[]=brands.map((text) => ({name: {
      contains: text,
      mode: 'insensitive',  
    }}))
    andCondition.push({shop:{OR:queryConditons}})
    
    
  } 

  if(searchPayload.flashSale==="true"){
     
    andCondition.push({flashSale:{equals:true}})
    
  } 

  if(searchPayload.flashSale==="false"){

 andCondition.push({flashSale:{equals:false}})

    
  } 

  if(searchPayload.flashSale==="false_true"){

    andCondition.push({OR:[{flashSale:{equals:true}},{flashSale:{equals:false}}]})
    
  } 

  if(searchPayload.priceRange){
const prices=searchPayload.priceRange.split("-")
const condition1:Prisma.productWhereInput={price:{gte:Number(prices[0]) }}
const condition2:Prisma.productWhereInput={price:{lte:Number(prices[1]) }}
andCondition.push(condition1)
andCondition.push(condition2)
 
  } 
 
  whereCondition.AND=andCondition
  console.log(searchPayload) 
console.dir(condition,{depth:"infinity"})
  const result = await prisma.product.findMany(condition);

  return { total: count, result };
};





const commonService = {
  getUsers,
  followingProduct,
  getStoreAllProducts,
  getShop,
  getSingleProduct,
  getCatetory,
  getProducts,
  getSingleShop,
  searchProduct
};
export default commonService;
