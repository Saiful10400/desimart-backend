import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import roomRoutes from "../Modules/Room/room.routes"
import slootsRoutes from "../Modules/Slot/slot.routes"
import bookingRoutes from "../Modules/Booking/booking.routes"
import MyBookingroutes from "../Modules/MyBookings/myBookings.routes"
import paymentRoute from "../Modules/Payment/payment.routes"

const routes=Router()


const moduleRoutes=[
   
    {
        path:"/auth",
        route:authenticationRoutes
    },
    {
        path:"/rooms",
        route:roomRoutes
    }
    ,
    {
        path:"/slots",
        route:slootsRoutes
    }
    ,
    {
        path:"/booking",
        route:MyBookingroutes
    }
    ,
    {
        path:"/pay",
        route:paymentRoute
    }
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes