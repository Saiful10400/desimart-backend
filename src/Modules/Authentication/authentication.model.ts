import { model, Schema } from "mongoose";
import { Tuser, UserModel } from "./authentication.interface";

const signupSchema = new Schema<Tuser>({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

signupSchema.post("save", function (docs, next) {
  this.password = undefined!; 
  next();
});

signupSchema.statics.isUserExixtById=async function(id:string){
return await signupModel.findById(id)
}

export const signupModel = model<Tuser,UserModel>("User", signupSchema);
