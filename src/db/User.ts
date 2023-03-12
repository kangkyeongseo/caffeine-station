import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  _id: string;
  userId: string;
  password: string;
  cafes: mongoose.Schema.Types.ObjectId;
}

interface Cafe {
  id: string;
  x: string;
  y: string;
  place_name: string;
  place_url: string;
  distance: string;
  road_address_name: string;
  address_name: string;
  phone: string;
}

const userSchema = new mongoose.Schema<User>({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  cafes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cafe" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model<User>("User", userSchema);

export default User;
