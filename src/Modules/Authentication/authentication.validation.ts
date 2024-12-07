import { z } from "zod";

const signup=z.object({
    name:z.string({message:"name mustbe a string."}),
    img:z.string({message:"img url mustbe a string."}),
    email:z.string().email({message:"invalid email address!"}),
    phone:z.string().regex(/^\d+$/, {message:"Phone number must contain only digits"}),
    role:z.enum(["user","admin"]), // include an error message.
    address:z.string(),
    password:z.string()
})

const login=z.object({
    email:z.string().email({message:"invalid email address."}),
    password:z.string({message:"password mustbe string."})
})






const authenticationValidationSchema={signup,login}

export default authenticationValidationSchema