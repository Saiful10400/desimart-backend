import mongoose, { model, Schema } from "mongoose";
import { Tbooking } from "./booking.interface";
import { roomModel } from "../Room/room.model";

const bookingSchema = new Schema({
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return !isNaN(Date.parse(v));
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid date!`,
    },
  },
  slots: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    required: true,
    ref: "slot",
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "room",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isConfirmed:{
    type:String,
    default:"unconfirmed"
  }
});

bookingSchema.virtual("totalAmount").get(function(this){
  const pricePerSlot=this.room.pricePerSlot
  const TotalSlots=this.slots.length
  return pricePerSlot*TotalSlots
})



bookingSchema.set("toObject",{virtuals:true})
// bookingSchema.set("toJSON",{virtuals:true})
// bookingSchema.
 
export const bookingModel = model<Tbooking>("booking", bookingSchema);
