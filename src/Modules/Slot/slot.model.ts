import mongoose, { model } from "mongoose";

const slotSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "room",
  },
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
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const slotmodel = model("slot", slotSchema);

export default slotmodel;
 