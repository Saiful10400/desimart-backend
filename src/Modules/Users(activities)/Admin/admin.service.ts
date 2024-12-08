import prisma from "../../../config/prisma.config"


// cteate category
const createCategory=async(payload:{name:string})=>{
    const result=await prisma.category.create({
        data:{
            name:payload.name,
        }
    })
    return result
}

const adminService={
createCategory
}
export default adminService