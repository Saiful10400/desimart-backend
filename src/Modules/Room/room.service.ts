import { Troom } from "./room.interface";
import { roomModel } from "./room.model";

//1. create a room
const createSingleRoom=async(payload:Troom)=>{
    const result=await roomModel.create(payload)
    return result
}

// 2. get single room.
const getRoom=async(id:string)=>{
        const result=await roomModel.findById(id)
        return result
}

//2.1 gt all rooms.
const getAllRooms=async()=>{
    const result=await roomModel.find({isDeleted:false})
    return result
}

// 3. delete a room

const deleteSingleRoom=async(id:string)=>{
    const result=await roomModel.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return result
}

//4. update single room.
const updateSingleRoom=async(id:string,payload:Partial<Troom>)=>{
    const result=await roomModel.findByIdAndUpdate(id,payload,{new:true})
    return result
  
}


// export modules.
const roomService={createSingleRoom,getRoom,deleteSingleRoom,updateSingleRoom,getAllRooms}
export default roomService