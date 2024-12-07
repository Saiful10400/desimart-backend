import { model, Schema } from "mongoose";
import { Troom } from "./room.interface";

const roomSchema=new Schema({
    name: {
      type: String,
      required: true
    },
    roomNo: {
      type: Number,
      required: true
    },
    floorNo: {
      type: Number,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    pricePerSlot: {
      type: Number,
      required: true
    },
    amenities: {
      type: [String],
      required: true
    },
    roomImages: {
      type: [String],
      required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  });

  // roomSchema.static.getRoomPrice=async function(id:string){
  //   return await roomModel.findById(id).pricePerSlot
  // }

  export const roomModel=model<Troom>("room",roomSchema)