import { Model } from "mongoose"

export interface Tuser{
    name: string,
    img:string,
    email: string,
    password:string,
    phone:string,
    role: "user" | "admin",
    address:string
}

export interface UserModel extends Model<Tuser>{
    isUserExixtById(id:string):Promise<Tuser>
}

export interface TuserLogin{
    email:string,
    password:string
}