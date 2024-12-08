import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"


const routes=Router()


const moduleRoutes=[
   
    {
        path:"/auth",
        route:authenticationRoutes
    },
    
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes