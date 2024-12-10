import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import vendorRouter from "../Modules/Users(activities)/Vendor/vendor.routes"
import adminRoutes from "../Modules/Users(activities)/Admin/admin.routes"
import orderRouter from "../Modules/Orders/order.route"
import storeRoute from "../Modules/store/store.routes"
import commonRoutes from "../Modules/CommonApis/common.routes"
import buyerRoutes from "../Modules/Users(activities)/Buyer/buyer.routes"


const routes=Router()


const moduleRoutes=[
   
    {
        path:"/auth",
        route:authenticationRoutes
    },
    {
        path:"/vendor",
        route:vendorRouter
    },
    
    {
        path:"/admin",
        route:adminRoutes
    },
    
    {
        path:"/order",
        route:orderRouter
    },
    {
        path:"/store",
        route:storeRoute
    },
    {
        path:"/common",
        route:commonRoutes
    },
    {
        path:"/user",
        route:buyerRoutes
    },
    
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes