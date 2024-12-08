import prisma from "../../../config/prisma.config";

export interface Tshop {
  logo: string;
  name: string;
  vendorId: string;
}

export interface TproductCreate{
    description:string,
    image:string,
    name:string,
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
            categoryId:payload.categoryId
        }
    })

    return result

}

const vendorService = {
  createStore,
  createProduct
};
export default vendorService;
