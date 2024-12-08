import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import vendorRouter from "../Modules/Users(activities)/Vendor/vendor.routes"
import adminRoutes from "../Modules/Users(activities)/Admin/admin.routes"


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
    
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes