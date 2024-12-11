
import dotenv from "dotenv"
import path from "path"

dotenv.config({path:path.join(process.cwd(),".env")})



export default{
    frontend_url:process.env.FRONT_END_URL,
    port:process.env.PORT,
    jwtSecret:process.env.JWT_SECRET,
    accessTokenLife:process.env.access_token_life,
    sender_email:process.env.SENDER_EMAIL,
    sender_email_password:process.env.SENDER_EMAIL_Password,
    clowd_name:process.env.CLOWD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
   
}