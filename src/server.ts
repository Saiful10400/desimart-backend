
import app from "./app";
import config from "./config"

async function main(){
    try{
        
        app.listen(config.port,()=>{
            console.log(`this server is running at ${config.port} port.`)
        })
    }
    catch(err){
        console.log(err)
    }
}

main() 